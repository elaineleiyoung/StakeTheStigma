import styles from "../styles/Login.module.css";
import { db } from "../../firebase";
import { doc, setDoc, collection, addDoc } from "firebase/firestore"; 
import { Link } from "react-router-dom";
import { getAuth, signInAnonymously } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate();
    
    const addGuestUserHandler = () => {
        const auth = getAuth();
        signInAnonymously(auth)
            .then(auth => {
                console.log("Guest signed in")
                // Signed in..
                navigate("/survey");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

            });
    }
    
    return (
        <main>
            <h1 className = {styles.logo}>Stake The Stigma</h1>
            <nav>
                <button className={styles.guest} onClick = {addGuestUserHandler}>Guest User</button>
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