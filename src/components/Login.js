import styles from "./styles/Login.module.css"; 
import { Link } from "react-router-dom";
import * as React from 'react';

function Login() {
    
    return (
        <main className={styles.buttonContainer}>
            <h1 className={styles.logo}>Stake The Stigma.</h1>
            <h2 className={styles.logo2}>Destigmatizing Women's Health</h2>
            <div className={styles.buttonWrapper}>
                <button className={styles.login}>
                    <Link to={"/register"} style={{textDecoration:'none', color: '#3A448C'}}>
                        Register/Login
                    </Link>
                </button>
            </div>
        </main>
    );
}

export default Login;