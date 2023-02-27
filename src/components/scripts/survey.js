import styles from "../styles/Login.module.css";
import { db } from "../../firebase";
import { doc, setDoc, collection, addDoc, arrayUnion } from "firebase/firestore"; 
import React, { useState } from 'react';
import SurveyButton from "../UI/button";
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import DoneIcon from "@mui/icons-material/Done";
import { Link } from 'react-router-dom';


function Survey() {
  const [message, setMessage] = useState("Default message");
  const [selectedTopics, setSelectedTopics] = useState([]);

  function handleDelete() {
    setMessage("deleted");
  }

  function handleClick() {
    setMessage("clicked");
  }

  function handleTopicClick(topic) {
    if (selectedTopics.includes(topic)) {
      setSelectedTopics(selectedTopics.filter((t) => t !== topic));
    } else {
      setSelectedTopics([...selectedTopics, topic]);
    }
  }

  function handleSubmit() {
    // Send API call to Firebase with selectedTopics array
    // Example API call using fetch:
    fetch("https://your-firebase-endpoint-url.com", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topics: selectedTopics }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }

  return (
    <main>
      <h1 className={styles.logo}>Survey Page</h1>
      <div style={SurveyButton.containerStyle}>
        <Button component={Link} to="/articles" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
        <StyledChip
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
        <p>Message - {message}</p>
      </div>
    </main>
  );
}

function StyledChip(props) {
  const { clicked, ...rest } = props;
  return (
    <Chip
      {...rest}
      sx={clicked ? { backgroundColor: "#31ff00" } : { backgroundColor: "red" }}
    />
  );
}

export default Survey;
