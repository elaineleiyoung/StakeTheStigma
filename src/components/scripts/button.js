import styles from "../styles/Login.module.css";
import { getFirestore, doc, updateDoc } from "firebase/firestore";

import React, { useState } from 'react';

function SurveyButton(props) {
  const [isClicked, setIsClicked] = useState(false);
  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  const buttonStyle = {
    backgroundColor: isClicked ? 'white' : 'pink',
    color: 'white',
    padding: '8px 16px',
    border: 'none',
    borderRadius: '50px',
    cursor: 'pointer',
    margin: '4px',
  };

  return (
    <button style={buttonStyle} onClick={handleClick}>
      {props.label}
    </button>
  );
}

function SurveyForm(props) {
  const [selectedTopics, setSelectedTopics] = useState([]);


  const handleSubmit = async (event) => {
  event.preventDefault();

  // Send API call to Firebase with selectedTopics array
  const response = await fetch('https://your-firebase-endpoint-url.com', {
    method: 'POST',
    body: JSON.stringify(selectedTopics),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const data = await response.json();
  console.log(data);
};

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  };

  const topics = props.topics.map((topic) => (
    <SurveyButton key={topic} label={topic} />
  ));

  return (
    <div style={containerStyle}>
      <h1>Select Topics</h1>
      {topics}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

function App() {
  const topics = ['Menstruation', 'Sexual Health', 'STIs', 'Birth Control'];

  return <SurveyForm topics={topics} />;
}

export default App;