import styles from "../styles/Login.module.css";
import { getFirestore, doc, updateDoc } from "firebase/firestore";

import React, { useState } from 'react';

function SurveyButton(props) {
    const [isClicked, setIsClicked] = useState(false);
    const handleClick = () => {    // switching the stat of buttons by clicks
      setIsClicked(!isClicked);
      const db = getFirestore(); // initialize Firestore

const docRef = doc(db, "users", "Q4sdWGN3eBEuAVB5ffrR");

const data = {
  topics: ["menstruation"]
};

updateDoc(docRef, data)
.then(docRef => {
    console.log("A New Document Field has been added to an existing document");
})
.catch(error => {
    console.log(error);
})
    };
    const containerStyle = {
        display: 'flex',
        justifyContent: 'center', // align items horizontally to center
        alignItems: 'center', // align items vertically to center
        height: '15vh' // set container height to full viewport height
      };

    const buttonStyle = {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: isClicked ? 'red' : 'blue',
      color: 'white',
      padding: '8px 16px',
      border: 'none',
      borderRadius: '50px',
      cursor: 'pointer',
      margin: '4px',   // margin between buttons
    };
  
    return (
      <div style={containerStyle}>
      <button style={buttonStyle} onClick={handleClick}>
        {props.label}
      </button>
      </div>
    );
  }

export default SurveyButton;