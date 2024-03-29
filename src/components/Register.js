import styles from "./styles/Register.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, getUserByEmail } from "firebase/auth";
import TextField from '@mui/material/TextField';

function Register() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const signIn = e => {
        e.preventDefault();

        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
        .then(auth => {
            navigate("/");
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
             <h1>Stake The Stigma.</h1>
             </div>
            <div className={styles.right}>
                <form>
                    <div style={{"padding-top":"40px"}}>
                        <TextField size="small"
                                    id="outlined-basic" 
                                    label="Email" 
                                    variant="outlined" 
                                    required
                                    onChange = {e => {setEmail(e.target.value)}}
                                    sx={inputStyle}
                                     />
                    </div>
                    <div style={{"padding-top":"40px"}}>
                        <TextField size="small"
                                    id="outlined-basic" 
                                    label="Password" 
                                    variant="outlined" 
                                    required
                                    onChange = {e => {setPassword(e.target.value)}}
                                     />
                    </div>
                    <div className = {styles.passwordInput}>
                        <h4 className= {styles.logo3}> Password</h4>
                        <input type = "password" value = {password} onChange = {e => {setPassword(e.target.value)}} className = {styles.password} />
                    </div>

                    <button type = "submit" onClick = {signIn} className = {styles.signInBtn}>Sign In</button>
                </form>

                <p>Don't have an account? Create one here!</p>
                <button className={styles.registerButton} onClick={createAccount}>Create an account</button>
            </div>
            <div className={styles.slogan}>
                <h2>_destigmatizing women's health_</h2>
            </div>
        </div>
        </body>
        
    );
}

export default Register;