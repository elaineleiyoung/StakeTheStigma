import styles from "../styles/Login.module.css";
import { db } from "../../firebase";
import { doc, setDoc, collection, addDoc } from "firebase/firestore"; 
import { Link } from "react-router-dom";
import { auth } from "../../firebase";
import * as React from 'react';
import Button from '@mui/material/Button';

function Login() {

    const addUserHandler = () => {
        addDoc(collection(db, "guestUsers"), {
            name: "idk"
        });
        alert("Guest user added");
    }
    
    return (
        <main className={styles.buttonContainer}>
            <h1 className = {styles.logo}>Stake The Stigma</h1>
            <h2 className = {styles.logo2}>UNCENSORING CENSORED NEWS.</h2>
                <div style={{ textAlign: "left", marginBottom: "20px", marginLeft: "20px" }}>
                    <button className={styles.login} onClick = {addUserHandler} >
                        <Link to = {"/survey"} color= "inherit" style={{textDecoration:'none'}}>
                            Guest
                        </Link>
                    </button>
                    <button1 className={styles.login}>
                        <Link to = {"/register"} style={{textDecoration:'none'}}>
                            Register/Login
                        </Link>
                    </button1>
                </div>
        </main>
    );
}

export default Login; 