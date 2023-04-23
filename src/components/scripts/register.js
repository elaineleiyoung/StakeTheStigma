import styles from "../styles/Register.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, getUserByEmail } from "firebase/auth";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function Register() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const signIn = e => {
        e.preventDefault();

        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
        .then(auth => {
            navigate("/dashboard");
        })
        .catch(error => alert(error.message))
    }

    const createAccount = e => {
        e.preventDefault();
        
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
        .then((auth) => {
            if (auth) {
                navigate("/");
            }
        })
        .catch(error => alert(error.message))
    }

    return (
        <div className={styles.container}>
            <div className={styles.logo2}>
             <h1>STAKE</h1>
             <h1>THE STIGMA.</h1>
             </div>
            <div className={styles.right}>
                <form>
                    <div>
                        <h4> Email</h4>
                        <TextField size="small"id="outlined-basic" label="Email" variant="outlined" onChange = {e => {setEmail(e.target.value)}}  />
                    </div>
                    <div>
                        <h4> Password</h4>
                        <TextField size="small"id="outlined-basic" label="Password" variant="outlined" onChange = {e => {setPassword(e.target.value)}}  />
                    </div>
                    <div style={{"padding-top":"20px"}}>
                    <Button size="small"variant="outlined" onClick={signIn}>Sign In</Button>
                    </div>
                </form>

                <p>Don't have an account? Create one here!</p>
                <Button size="small"variant="outlined" onClick={createAccount}>Create your account</Button>
            </div>
            <div className={styles.slogan}>
                <h2>_UNCENSOR CENSORED NEWS_</h2>
            </div>
        </div>
        
    );
}

export default Register;