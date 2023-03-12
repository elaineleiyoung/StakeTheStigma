import styles from "../styles/Login.module.css";
import { db } from "../../firebase";
import { doc, setDoc, collection, addDoc } from "firebase/firestore"; 
import { Link, useNavigate, useLocation} from 'react-router-dom'
import { getNhsArticles } from "../../nhsApi";
import { getNewsArticles } from "../../newsApi";
import React, { useEffect, useState } from 'react';
import { getAuth } from "firebase/auth";
import { getFirestore, getDoc } from "firebase/firestore";
import Article from '../article'
import { Text} from '@chakra-ui/react'

function Dashboard() {
    const auth = getAuth();
    const firestore = getFirestore();

    const navigate = useNavigate()
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
              // Fetch data from the NHS API
              const responseJsonNhs = await getNhsArticles(topics[i]);
              const dataNhs = {
                title: topics[i],
                description: responseJsonNhs['description'],
                content: responseJsonNhs['mainEntityOfPage']
              }
              newContent.push(dataNhs);

              // Fetch data from the NewsAPI
              const responseJsonNews = await getNewsArticles(topics[i]);
              const articles = responseJsonNews.articles;
              articles.forEach(article => {
                const dataNews = {
                  //TO-DO: below is incorrect
                  title: topics[i],
                  description: article.description,
                  content: article.content
                }
                newContent.push(dataNews);
              });
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
