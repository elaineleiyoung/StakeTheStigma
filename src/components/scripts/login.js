import styles from "../styles/Login.module.css";
import { db } from "../../firebase";
import { doc, setDoc, collection, addDoc } from "firebase/firestore"; 
import { Link, useNavigate, useLocation} from 'react-router-dom'


function Login() {
    const navigate = useNavigate()
    const addGuestHandler = () => {
        addDoc(collection(db, "guestUsers"), {
            name: "idk"
        });
        alert("Guest user added");
    }
    const addUserHandler = () => {
        addDoc(collection(db, "users"), {
            name: "geneva",
            password: "123",
            topics: []
        });
        alert("Guest user added");
    }
    const test = () => {
        navigate('/dashboard', {replace: true})
    }

    return (
        <main>
            <h1 className = {styles.logo}>Stake The Stigma</h1>
            <nav>
             <button className={styles.guest} onClick = {addGuestHandler}>Guest User</button>
             <button className={styles.login} onClick={addUserHandler}>Log in</button>
             <button className={styles.contributor}>Contributor</button>
        </nav>
        </main>
    );
}

export default Login; 