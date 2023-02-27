import styles from "../styles/Login.module.css";
import { db } from "../../firebase";
import { doc, setDoc, collection, addDoc } from "firebase/firestore"; 
import { Link, useNavigate, useLocation} from 'react-router-dom'
import { getNhsArticles } from "../../api";
import React, { useEffect, useState } from 'react';
import { getAuth } from "firebase/auth";
import { getFirestore, getDoc } from "firebase/firestore";
import Article from '../article'
import { Text} from '@chakra-ui/react'

/*
Source - https://chakra-ui.com/docs/components/card/usage
Card: The parent wrapper that provides context for its children.
CardHeader: The wrapper that contains a card's header.
CardBody: The wrapper that houses the card's main content.
CardFooter: The footer that houses the card actions.
*/
function Dashboard() {
    const auth = getAuth();
    const firestore = getFirestore();

    const navigate = useNavigate() /*navigate allows us to navigate between components*/
    const [description,setDescription] = useState(null)
    const [content, setContent] = useState([])
    const [email, setEmail] = useState(null)
    const [topics, setTopics] = useState(null)
    const [fullContent, setFullContent] = useState([])
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
          if (user) {
            setEmail(user.email);
            const userDocRef = doc(firestore, "users", user.uid);
            const userDoc = await getDoc(userDocRef);
            if (userDoc.exists()) {
              setTopics(userDoc.data().topics);
            } else {
              setTopics([]);
            }
          } else {
            setEmail(null);
            setTopics(null);
          }
        });
        return unsubscribe;
      }, [auth, firestore]);
      useEffect(() => {
        const fetchData = async () => {
          const newContent = [];
          for (let i = 0; i < topics.length; i++) {
            try {
              const responseJson = await getNhsArticles(topics[i]);
              const data = {
                title: topics[i],
                description: responseJson['description'],
                content: responseJson['mainEntityOfPage']
              }
              newContent.push(data);
            } catch (error) {
              console.error(error);
            }
          }
          setFullContent(newContent);
        };
        if (topics) {
          fetchData();
        }
      }, [topics]);
      console.log(fullContent)
    /** {content.map((blob) => (
                    blob['mainEntintyofPage'][0]['text'] ? 
                    <p>{blob['mainEntintyofPage'][0]['text']}</p> : 
                    <p></p>
                    ))} */
    

    
    return (
        <main>
            <h1>Hi {email}</h1>
            <h1>Your topics are</h1>
            {topics?topics.map((topic)=><Text>{topic}</Text>):null}
            <div>
            </div>
            <div className={styles.articleContainer}>
                {fullContent && fullContent.map((topic)=>{
                    return <Article topic={topic}/>
                })}
            </div>
        </main>
    );
}

export default Dashboard; 