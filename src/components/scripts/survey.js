import styles from "../styles/Survey.module.css";
import { db } from "../../firebase";
import { doc, setDoc, collection, addDoc, arrayUnion } from "firebase/firestore"; 
import React, { useState } from 'react';
import SurveyButton from "../UI/button";
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import DoneIcon from "@mui/icons-material/Done";
import { Link } from 'react-router-dom';
import {getNewsArticles} from '../../newsApi'
import {OpenAI} from '../../openAI'
import { useEffect } from 'react'
import { getAuth } from 'firebase/auth';
import { useNavigate } from "react-router-dom";

function Survey() {
  const [urlList, setUrl] = useState([]);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const navigate = useNavigate();
  const promises = [];

  function handleTopicClick(topic) {
    if (selectedTopics.includes(topic)) {
      setSelectedTopics(selectedTopics.filter((t) => t !== topic));
    } else {
      setSelectedTopics([...selectedTopics, topic]);
    }
  }

  const handleSubmit = async (event) => {
    const auth = getAuth();
    if (auth.currentUser) {
      // add topics to user's thing
  
      // Send API call to Firebase with selectedTopics array
      // Example API call using fetch:
      event.preventDefault();
      const promises = selectedTopics.map(async (topic) => {
        try {
          const link = await getNewsArticles(topic);
          console.log(link.url[0])
          const summary = await OpenAI(link.url[0]);
          urlList.push(link.url[0]); // add url to urlList array
          //add article to firebase
          const articlesRef = collection(db, "articles");
          const newArticleRef = doc(articlesRef);
  
          // set the data for the new document
          await setDoc(newArticleRef, {
            url: link.url[0],
            summary: summary.text,
            likes: 0,
            title: topic
          });
        } catch (error) {
          console.error(`Error scraping article ${error}`);
        }
      });
  
      // Wait for all promises to resolve
      await Promise.all(promises);
  
      const userRef = doc(db, "users", auth.currentUser.uid);
      console.log(urlList)
      // Add topics array to user profile in Firestore
      setDoc(userRef, { topics: selectedTopics, links: urlList }, { merge: true })
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
    <main>
      <div>
            <h1 className = {styles.logo}>STAKE THE STIGMA.</h1>
            <h2 className={styles.logo2}>_UNCENSORING CENSORED NEWS_</h2>
     
      <p className={styles.message}>What are you interested in?</p>
      
      <div style={SurveyButton.containerStyle}>
      
        <StyledChip className= {styles.chips}
          label="Menstruation"
          onClick={() => handleTopicClick("menstruation")}
          clicked={selectedTopics.includes("menstruation")}
        />
        <StyledChip
          label="HPV Vaccination"
          onClick={() => handleTopicClick("hpv_vaccination")}
          clicked={selectedTopics.includes("hpv_vaccination")}
        />
        <StyledChip
          label="Polycystic ovary syndrome (PCOS)"
          onClick={() => handleTopicClick("pcos")}
          clicked={selectedTopics.includes("pcos")}
        />
        <StyledChip
          label="Pregnancy"
          onClick={() => handleTopicClick("pregnancy")}
          clicked={selectedTopics.includes("pregnancy")}
        />
        <StyledChip
          label="Ovarian and Cervical Cancer"
          onClick={() => handleTopicClick("Ovarian and Cervical Cancer")}
          clicked={selectedTopics.includes("Ovarian and Cervical Cancer")}
        />
        <StyledChip
          label="Postpartum Depression"
          onClick={() => handleTopicClick("postpartum depression")}
          clicked={selectedTopics.includes("postpartum depression")}
        />
        <StyledChip
          label="Breast Cancer"
          onClick={() => handleTopicClick("Breast Cancer")}
          clicked={selectedTopics.includes("Breast Cancer")}
        />
        <StyledChip
          label="Menopause"
          onClick={() => handleTopicClick("menopause")}
          clicked={selectedTopics.includes("menopause")}
        />
        
        <Button component={Link}  color="primary" onClick={handleSubmit}  
        style=

        {{ 
          display: "block", 
          width: "fit-content", 
          backgroundColor: 'black', 
          color: 'white', 
          borderRadius: "20px",
          width: "fit-content",
          padding: "6px 12px",
          margin: "0 auto",
          fontWeight: "bold",
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
        clicked ? { backgroundColor: "rgba(0, 0, 0, 0.5)", color: "white" } : { backgroundColor: "rgba(255, 255, 255, 0.2)", color: "white" },
        { margin: 1 },
        
      ]}
    />
  );
}


export default Survey;