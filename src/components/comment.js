import styles from "../../src/components/styles/Comment.module.css";
import { getAuth } from "firebase/auth";
import { useState } from 'react';

function Comment() {
    const auth = getAuth();
    const currentUser = auth.currentUser.email;
    const [comment, setComment] = useState("");
    const [responses, setResponses] = useState([]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const comments = [...responses, comment];
        setResponses(comments);
        setComment("");
        console.log(responses);
    };

    const clearResponses = () => {
        setResponses([]);
    }

    return(
        <section>
            <h1>
                Comment Section: 
            </h1>
            <div className = {styles.formWrapper}>
                <form onSubmit={handleSubmit}>
                    <textarea placeholder = "Leave a comment..." id="comment" value={comment} onChange={(e) => setComment(e.target.value)} />
                    <button type="submit">Comment</button>
                </form>
            </div>
            <div className = {styles.responses}>
                {responses?responses.map((response) => <p><span>{currentUser}</span>: {response}</p>): null}
            </div>
            <button onClick = {clearResponses}>Clear Thread</button>
        </section>
    );
}

export default Comment;