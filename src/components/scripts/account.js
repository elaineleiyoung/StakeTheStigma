import styles from "../styles/Account.module.css";
import React from 'react';

function Account() {
    return(
        <main>
            <h1 className = {styles.logo}> Stake The Stigma.</h1>
            <h2 className = {styles.slogan}> Destigmatizing Women's Health</h2>
        </main>
    );
}

export default Account;