import styles from "../styles/Register.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore"; 
/*Material UI */
import TextField from '@mui/material/TextField';
import React from 'react';

function Register() {
    // Defining our variables for our register page
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    
    // Attempt to sign in a user using firebase auth
    // If they already have a topics field, that means they have done the survey which means that 
    // they should be directly navigated to the dashboard page
    const signIn = async (e) => {
        e.preventDefault();
      
        const auth = getAuth();
        try {
          await signInWithEmailAndPassword(auth, email, password);
          const userRef = doc(db, "users", auth.currentUser.uid);
          const docSnap = await getDoc(userRef);
          console.log(docSnap.data())
          if (docSnap.exists() && docSnap.data().topics) {
            navigate("/dashboard");
          } else {
            navigate("/survey");
          }
        } catch (error) {
          alert(error.message);
        }
      };
    
    // Attempts to create an account using firebase auth 
    // Since this a first time user, they will be directly navigated to survey page
    const createAccount = e => {
        e.preventDefault();
        
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
        .then((auth) => {
            if (auth) {
                navigate("/survey");
            }
        })
        .catch(error => alert(error.message))
    }

    return (
        <div className = {styles.sheesh}>
            <h1 className = {styles.logo}> Stake The Stigma.</h1>
            <h2 className = {styles.logo2}> Destigmatizing Women's Health.</h2>
            <div className = {styles.yurd}>

            <TextField 
                id="standard-basic" 
                label="Email" 
                onChange={e => setEmail(e.target.value)} 
                required 
                variant="standard"
                margin="normal" />

            <TextField 
                id="standard-basic" 
                label="Password" 
                onChange={e => setPassword(e.target.value)} 
                required 
                variant="standard"
                margin="normal"/>

            <button type = "submit" onClick = {signIn} margin = "20px" className = {styles.signInBtn}>
                    <Link to = {"/dashboard"} style={{textDecoration:'none'}}>
                        Log In
                    </Link>
            </button>

            <hr style={{ 
                    backgroundColor: 'white', 
                    height: '1px', 
                    width: '50%', 
                    margin: '10px auto',
            }} />

            <button className = {styles.createAccBtn} onClick = {createAccount}>
                Create An Account
            </button>

            <p className = {styles.message}>
                Forgot Password?
            </p>
            
            </div>
        </div> 
    );
}

export default Register;