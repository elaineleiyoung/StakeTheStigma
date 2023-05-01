import styles from "../styles/Register.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, getUserByEmail } from "firebase/auth";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function Register() {

    const inputStyle = {
        borderRadius: '50px',
    }
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
        <body>
        <div className={styles.container}>
            <div className={styles.logo2}>
             <h1>Stake The Stigma</h1>
             </div>
             <h2 className={styles.logo3}>destigmatizing women's health</h2>
            <div className={styles.right}>
                <form>
                    <div style={{"padding-top":"40px"}}>
                        <TextField size="small"
                                    id="outlined-basic" 
                                    label="Email" 
                                    variant="outlined" 
                                    required
                                    onChange = {e => {setEmail(e.target.value)}}
                                    sx={{
                                        backgroundColor: 'rgba(255, 255, 255, 0.3)',
                                        border:'2px solid #3A448C',
                                        borderRadius: '999px',
                                        width: '400px',
                                    }}
                                     />
                    </div>
                    <div style={{"padding-top":"40px"}}>
                        <TextField size="small"
                                    // id="outlined-basic" 
                                    label="Password" 
                                    // variant="standard"
                                    type="password"
                                    required
                                    onChange = {e => {setPassword(e.target.value)}} 
                                    sx={{
                                        backgroundColor: 'rgba(255, 255, 255, 0.3)',
                                        border:'2px solid #3A448C',
                                        borderRadius: '999px',
                                        width: '400px',
                                    }}
                                    />
                                    onChange = {e => {setPassword(e.target.value)}}
                                     />
                    </div>
                    <div style={{"padding-top":"20px"}}>
                    <button className={styles.registerButton} onClick={signIn}>
                        Sign In
                    </button>
                    </div>
                </form>
                <p className={styles.registerCaption}>Don't have an account? Create one here!</p>
                <button className={styles.registerButton} onClick={createAccount}>Create an account</button>
            </div>
        </div>
        </body> 
        
    );
}

export default Register;