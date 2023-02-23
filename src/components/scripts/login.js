import styles from "../styles/Login.module.css";
import { db } from "../../firebase";
import { doc, setDoc, collection, addDoc } from "firebase/firestore"; 


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
             <button className={styles.login}>Log in</button>
             <button className={styles.contributor}>Contributor</button>
        </nav>
        </main>
    );
}

export default Login; 