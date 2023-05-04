import styles from "../styles/Survey.module.css";
import { db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore"; 
import React, { useState } from 'react';
import SurveyButton from "./button";
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { useNavigate } from "react-router-dom";

function Survey() {
  // Defining our variables that we will use for this page
  const [urlList, setUrl] = useState([]);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const navigate = useNavigate();

  // Sets an array that is updated when a user selecets/deselects a topic button
  function handleTopicClick(topic, link) {
    if (selectedTopics.includes(topic)) {
      setSelectedTopics(selectedTopics.filter((t) => t !== topic));
      setUrl(urlList.filter((t) => link !== link));
    } else {
      setSelectedTopics([...selectedTopics, topic]);
      setUrl([...urlList, link]);
    }
  }

  // On submit, we set the user's topics field in firebase to be the topics that they chose
  const handleSubmit = async (event) => {
    const auth = getAuth();
    if (auth.currentUser) {
      // add topics to user's thing
      // Send API call to Firebase with selectedTopics array
      // Example API call using fetch:
      event.preventDefault();
      const userRef = doc(db, "users", auth.currentUser.uid);
      console.log(urlList)
      // Add topics array to user profile in Firestore
      setDoc(userRef, { email: auth.currentUser.email, topics: selectedTopics, links: urlList }, { merge: true })
        .then(() => {
          navigate("/dashboard", { state: { uuid: auth.currentUser.uid} });
        })
        .catch((error) => {
          alert(error.message);
        });
    } else {
      // If the user is not authenticated, prompt them to log in
      alert("Please log in to add articles.");
      navigate("/login");
    }
  };
  
  

  return (
    <main className={styles.survey}>
      <div>
            <h1 className = {styles.logo}>STAKE THE STIGMA.</h1>
            <h2 className={styles.subtitle}>-Destigmatizing Women's Health-</h2>
     
      <p className={styles.message}>What are you interested in?</p>
      
      <div style={SurveyButton.containerStyle} className={styles.chipContainer}>
      
        <StyledChip className= {styles.chips}
          label="Menstruation"
          onClick={() => handleTopicClick("menstruation","https://www.nhs.uk/conditions/period-pain/")}
          clicked={selectedTopics.includes("menstruation")}
        />
        <StyledChip
          label="HPV Vaccination"
          onClick={() => handleTopicClick("hpv","https://www.cdc.gov/std/hpv/stdfact-hpv.htm#:~:text=What%20is%20HPV%3F,including%20genital%20warts%20and%20cancers.")}
          clicked={selectedTopics.includes("hpv")}
        />
        <StyledChip
          label="Polycystic ovary syndrome (PCOS)"
          onClick={() => handleTopicClick("pcos","https://www.nhs.uk/conditions/polycystic-ovary-syndrome-pcos/")}
          clicked={selectedTopics.includes("pcos")}
        />
        <StyledChip
          label="Pregnancy"
          onClick={() => handleTopicClick("pregnancy", "https://www.cdc.gov/pregnancy/index.html")}
          clicked={selectedTopics.includes("pregnancy")}
        />
        <StyledChip
          label="Ovarian and Cervical Cancer"
          onClick={() => handleTopicClick("ovarian_cancer","https://www.nhs.uk/conditions/ovarian-cancer/")}
          clicked={selectedTopics.includes("ovarian_cancer")}
        />
        <StyledChip
          label="Postpartum Depression"
          onClick={() => handleTopicClick("postpartum","https://www.mayoclinic.org/diseases-conditions/postpartum-depression/symptoms-causes/syc-20376617")}
          clicked={selectedTopics.includes("postpartum")}
        />
        <StyledChip
          label="Breast Cancer"
          onClick={() => handleTopicClick("breast_cancer","https://www.cdc.gov/cancer/breast/basic_info/what-is-breast-cancer.htm")}
          clicked={selectedTopics.includes("breast_cancer")}
        />
        <StyledChip
          label="Menopause"
          onClick={() => handleTopicClick("menopause","https://www.nia.nih.gov/health/what-menopause")}
          clicked={selectedTopics.includes("menopause")}
        />

        <Button component={Link}  color="primary" onClick={handleSubmit} className={styles.submit} 
        sx=
        {{ 
          display: "block", 
          width: "fit-content", 
          height: "50px",
          backgroundColor: 'white 20%',   //its just transparent now, TBF
          color: 'white', 
          borderRadius: "20px",
          padding: "6px 12px",
          fontWeight: "bold",
          fontSize: "25px",
          }}>
        Start my Dashboard
        </Button>
      </div>
      </div>
    </main>
  );
}

function StyledChip(props) {
  const { clicked, ...rest } = props;
  return (
    <Chip
      {...rest}
      sx={[
        clicked ? { backgroundColor: "#000000", color: "white" } : { backgroundColor: "#59515e", color: "white" },
        { margin: 1 },
        
      ]}
    />
  );
}


export default Survey;