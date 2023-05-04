import styles from "./styles/Survey.module.css";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore"; 
import React, { useState } from 'react';
import SurveyButton from "./Button";
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
  
  
//Reproductive health, Breast health, Sexual health, Mental health, Cardiovascular health, Bone health, Cancer, Autoimmune diseases, Skin health, Muscular Health, Nutrition and fitness]
  return (
    <main className={styles.survey}>
      <div>
            <h1 className = {styles.logo}>STAKE THE STIGMA.</h1>
            <h2 className={styles.subtitle}>-Destigmatizing Women's Health-</h2>
     
      <p className={styles.message}>What are you interested in?</p>
      
      <div style={SurveyButton.containerStyle} className={styles.chipContainer}>
      
        <StyledChip className= {styles.chips}
          label="Reproductive Health"
          onClick={() => handleTopicClick("Reproductivehealth","https://www.theskimm.com/wellness/why-is-my-period-blood-brown")}
          clicked={selectedTopics.includes("Reproductivehealth")}
        />
        <StyledChip
          label="Breast Health"
          onClick={() => handleTopicClick("Breasthealth","https://www.healthline.com/health/womens-health/why-does-my-breast-hurt-when-i-press-it")}
          clicked={selectedTopics.includes("Breasthealth")}
        />
        <StyledChip
          label="Mental Health"
          onClick={() => handleTopicClick("Mentalhealth","https://www.berkeleywellbeing.com/feeling-sad.html")}
          clicked={selectedTopics.includes("Mentalhealth")}
        />
        <StyledChip
          label="Cardiovascular Health"
          onClick={() => handleTopicClick("Cardiovascularhealth", "https://www.mayoclinic.org/diseases-conditions/heart-palpitations/symptoms-causes/syc-20373196")}
          clicked={selectedTopics.includes("Cardiovascularhealth")}
        />
        <StyledChip
          label="Bone Health"
          onClick={() => handleTopicClick("Bonehealth","https://www.healthline.com/health/bone-health/why-do-my-bones-crack-so-much")}
          clicked={selectedTopics.includes("Bonehealth")}
        />
        <StyledChip
          label="Cancer"
          onClick={() => handleTopicClick("Cancer","https://www.cancerresearchuk.org/about-cancer/causes-of-cancer/can-cancer-be-prevented-0")}
          clicked={selectedTopics.includes("Cancer")}
        />
        <StyledChip
          label="Autoimmune Diseases"
          onClick={() => handleTopicClick("Autoimmunediseases","https://www.healthline.com/health/autoimmune-disorders")}
          clicked={selectedTopics.includes("Autoimmunediseases")}
        />
        <StyledChip
          label="Skin Health"
          onClick={() => handleTopicClick("Skinhealth","https://share.upmc.com/2018/04/dry-flaky-skin-on-face/")}
          clicked={selectedTopics.includes("Skinhealth")}
        />
                <StyledChip
          label="Muscular Health"
          onClick={() => handleTopicClick("Muscularhealth","https://my.clevelandclinic.org/health/symptoms/22274-calf-muscle-pain")}
          clicked={selectedTopics.includes("Muscularhealth")}
        />
                  <StyledChip
          label="Nutrition and Fitness"
          onClick={() => handleTopicClick("Nutritionandfitness","https://www.ndtv.com/health/weight-loss-diet-essential-nutrients-you-need-for-losing-weight-quickly-2098994")}
          clicked={selectedTopics.includes("Nutritionandfitness")}
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