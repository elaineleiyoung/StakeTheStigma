import styles from "../styles/Login.module.css";
import { getFirestore, doc, updateDoc } from "firebase/firestore";

import React, { useState } from 'react';

function Click(props) {
  const [isClicked, setIsClicked] = useState(false);
  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  const clickStyle = {
    backgroundColor: isClicked ? 'white' : '#3A448C',
    color: isClicked ? '#3A448C' : 'white',
    padding: '8px 16px',
    border: 'none',
    borderRadius: '50px',
    cursor: 'pointer',
    margin: '4px',
  };

  return (
    <button style={clickStyle} onClick={handleClick}>
      {props.label}
    </button>
  );
}

export default Click;