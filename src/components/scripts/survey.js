import styles from "../styles/Login.module.css";
import { db } from "../../firebase";
import { doc, setDoc, collection, addDoc, arrayUnion } from "firebase/firestore"; 
import React, { useState } from 'react';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import DoneIcon from "@mui/icons-material/Done";
import { Link } from 'react-router-dom';
import { getAuth, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Survey() {
  const navigate = useNavigate()
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
  


// ...

function handleSubmit() {
  const auth = getAuth();
  const userRef = doc(db, "users", auth.currentUser.uid);

  // Add topics array to user profile in Firestore
  setDoc(userRef, { topics: selectedTopics }, { merge: true })
    .then(() => {
      navigate("/dashboard", { state: { uuid: auth.currentUser.uid } });
    })
    .catch((error) => {
      alert(error.message);
    });
}


  return (
    <main>
      <h1 className={styles.logo}>Survey Page</h1>
      <p>Choose your topics: {message}</p>
      <div >
        <StyledChip
          label="Menopause"
          onClick={() => handleTopicClick("menopause")}
          clicked={selectedTopics.includes("menopause")}
        />
        <StyledChip
          label="HPV"
          onClick={() => handleTopicClick("human-papilloma-virus-hpv")}
          clicked={selectedTopics.includes("human-papilloma-virus-hpv")}
        />
        <StyledChip
          label="Polycystic ovary syndrome (PCOS)"
          onClick={() => handleTopicClick("polycystic-ovary-syndrome-pcos/")}
          clicked={selectedTopics.includes("polycystic-ovary-syndrome-pcos/")}
        />
        <StyledChip
          label="Periods"
          onClick={() => handleTopicClick("periods")}
          clicked={selectedTopics.includes("periods")}
        />
      </div>
      <Button className={styles.submit} component={Link} color="primary" onClick={handleSubmit}>
          Submit
      </Button>
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