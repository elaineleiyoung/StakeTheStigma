import styles from "../styles/Login.module.css";
import { db } from "../../firebase";
import { doc, setDoc, collection, addDoc, arrayUnion } from "firebase/firestore"; 
import React, { useState } from 'react';
import SurveyButton from "../UI/button";


function Survey() {
    
    return (
        <main>
            <h1 className = {styles.logo}>Survey Page</h1>
            <div style={SurveyButton.containerStyle}>
            <SurveyButton label = "Menopause"/>
            <SurveyButton label = "Menstruation"/>
            <SurveyButton label = "HPV Vaccination"/>
            <SurveyButton label = "Polycystic ovary syndrome (PCOS)"/>
            <SurveyButton label = "Pregnancy"/>
            </div>
        </main>
    );
}
export default Survey; 
