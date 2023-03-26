import styles from "../styles/Login.module.css";
import { db } from "../../firebase";
import { doc, setDoc, collection, addDoc } from "firebase/firestore"; 
import { Link } from "react-router-dom";
import { auth } from "../../firebase";

function Login() {

    const addUserHandler = () => {
        addDoc(collection(db, "guestUsers"), {
            name: "idk"
        });
        alert("Guest user added");
    }
    
    return (
        <main>
            <div className = {styles.sheesh}>
            <h1 className = {styles.logo}>Stake The Stigma.</h1>
            <h2 className={styles.logo2}>_UNCENSORING CENSORED NEWS_</h2>
           
            <nav>
                <button className={styles.button} onClick = {addUserHandler}>Guest</button>
                <button className={styles.button}>
                    <Link to = {"/register"} style={{ textDecoration: 'none' }}>
                        Register/Login
                    </Link>
                </button>
                <button className={styles.button}>Contributor</button>
            </nav>
            </div>
        </main>
    );
}

export default Login; 