import styles from "../styles/Login.module.css";
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore"; 
import { Link } from "react-router-dom";
import * as React from 'react';

function Login() {
    // Guest user functionality (still needs to be implemented)
    const addUserHandler = () => {
        addDoc(collection(db, "guestUsers"), {
            name: "idk"
        });
        alert("Guest user added");
    }
    
    return (
        <main className={styles.buttonContainer}>
            <h1 className={styles.logo}>Stake The Stigma</h1>
            <h2 className={styles.logo2}>Destigmatizing Women's Health.</h2>
            <div className={styles.buttonWrapper}>
                <button className={styles.guestLogin} onClick={addUserHandler}>
                    <Link to={"/survey"} style={{textDecoration:'none', color: 'white'}}>
                        Guest
                    </Link>
                </button>
                <button1 className={styles.login}>
                    <Link to={"/register"} style={{textDecoration:'none', color: '#3A448C'}}>
                        Register/Login
                    </Link>
                </button1>
            </div>
        </main>
    );
}

export default Login;