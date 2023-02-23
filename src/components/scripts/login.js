import styles from "../styles/Login.module.css";
import { db } from "../../firebase";

function Login() {
    return (
        <main>
            <logo>Stake The Stigma</logo>
            <nav>
             <button className={styles.guest}>Guest User</button>
             <button className={styles.login}>Log in</button>
             <button className={styles.contributor}>Contributor</button>
        </nav>
        </main>
    );
}

export default Login; 