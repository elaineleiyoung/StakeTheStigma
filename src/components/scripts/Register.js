import styles from "../styles/Register.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

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
        <section className = {styles.layout}>
            <h1>Stake The Stigma</h1>
            <div>
                <form>
                    <div className = {styles.emailInput}>
                        <h4>Email</h4>
                        <input type = "text" value = {email} onChange = {e => {setEmail(e.target.value)}} className = {styles.email}/>
                    </div>
                    <div className = {styles.passwordInput}>
                        <h4>Password</h4>
                        <input type = "password" value = {password} onChange = {e => {setPassword(e.target.value)}} className = {styles.password} />
                    </div>

                    <button type = "submit" onClick = {signIn} className = {styles.signInBtn}>Sign In</button>
                </form>

                <p>Don't have an account? Create one here!</p>
                <button className = {styles.createAccBtn} onClick = {createAccount}>Create your account</button>
            </div>
        </section>
    );
}

export default Register;