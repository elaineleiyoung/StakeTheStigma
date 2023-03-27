import styles from "../styles/Dashboard.module.css";
import { db } from "../../firebase";
import { doc, setDoc, collection, addDoc, where,query, getDocs, limit} from "firebase/firestore"; 
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
    const [links, setLinks] = useState([])
    const [fullContent, setFullContent] = useState([])
    
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
          if (user) {
            setEmail(user.email);
            const userDocRef = doc(firestore, "users", user.uid);
            const userDoc = await getDoc(userDocRef);
            if (userDoc.exists()) {
              setTopics(userDoc.data().topics);
              setLinks(userDoc.data().links);
            } else {
              setTopics([]);
              setLinks([]);
            }
          } else {
            setEmail(null);
            setTopics(null);
            setLinks(null)
          }
        });
        return unsubscribe;
      }, [auth, firestore]);

    useEffect(() => {
      const fetchArticles = async () => {
        const newContent = [];
      
        for (const link of links) {
          console.log(link)
          try {
            const q = query(collection(db, "articles"), where("url", "==", link), limit(1));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
              console.log(doc.data())
              const article = {
                title: doc.data().title,
                description: doc.data().title,
                content: doc.data().summary,
                likes: doc.data().likes
              }
              newContent.push(article);;
            });
          } catch (error) {
            console.error(`Error fetching articles for ${link}`, error);
          }
        }
  
        setFullContent(newContent);
      };
  
      if (links.length) {
        fetchArticles();
      }
    }, [links]);
  

    return (
        <main>
            <h1 className = {styles.logo}>Stake the Stigma </h1>
            <div className = {styles.topics}>
              <h1>Hi {email}</h1>
              <h1>Your topics are</h1>
              {topics?topics.map((topic)=><Text>{topic}</Text>):null}
              <h1>Your links are</h1>
              {links?links.map((link)=><Text>{link}</Text>):null}
            </div>
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
