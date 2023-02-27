import styles from "../styles/Register.module.css";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

function Register() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const emailInputRef = useRef(null);

    const signIn = e => {
        e.preventDefault();

        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
        .then(auth => {
            navigate("/survey");
        })
        .catch(error => alert(error.message))
    }

    const createAccount = e => {
        e.preventDefault();
        
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const db = getFirestore();
          const userRef = doc(db, "users", userCredential.user.uid);
      
          // Set the topics array in the user's Firestore document
          setDoc(userRef, {
            topics: [],
            // Other user data can be added here
          }).then(() => {
            navigate("/");
          }).catch((error) => {
            alert(error.message);
          });
        })
        .catch((error) => {
          alert(error.message);
        });
      }
      

    return (
        <section className = {styles.layout}>
            <h1>Register</h1>
            <div>
                <form>
                    <div className = {styles.emailInput}>
                        <h4>Email</h4>
                        <input type = "text" value = {email} onChange = {e => {setEmail(e.target.value)}} className = {styles.email} autoFocus ref={emailInputRef}/>
                    </div>
                    <div className = {styles.passwordInput}>
                        <h4>Password</h4>
                        <input type = "password" value = {password} onChange = {e => {setPassword(e.target.value)}} className = {styles.password} />
                    </div>

                    <button type = "submit" onClick = {signIn} className = {styles.signInBtn}>Sign In</button>
                </form>

                <p>Don't have an account? Create one here!</p>
                <button className = {styles.createAccBtn} onClick = {createAccount}>Create your account</button>
            </div>
        </section>
    );
}

export default Register;