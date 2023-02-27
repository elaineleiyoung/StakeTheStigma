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
            <h1 className = {styles.logo}>Stake The Stigma</h1>
            <nav>
                <button className={styles.guest} onClick = {addUserHandler}>Guest User</button>
                <button>
                    <Link to = {"/register"} style={{ textDecoration: 'none' }}>
                        Register/Login
                    </Link>
                </button>
                <button className={styles.contributor}>Contributor</button>
            </nav>
        </main>
    );
}

export default Login; 