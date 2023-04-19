import styles from "../styles/Dashboard.module.css";
import { db } from "../../firebase";
import { doc,  collection, where, query, getDocs, limit} from "firebase/firestore"; 
import { useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react';
import { getAuth } from "firebase/auth";
import { getFirestore, getDoc } from "firebase/firestore";
import Article from '../article'
import Navbar from './Navbar'
import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment, TextField } from '@mui/material';


function Dashboard() {
    //defining our variables that will be used within the dashboard
    // auth, firestore are just to initialize our Firebase for pulling user data and database functions
    const auth = getAuth();
    const firestore = getFirestore();
    // navigate is used to go to search page while passing parameters
    const navigate = useNavigate()
    // logged in user's email. Can be used later
    const [email, setEmail] = useState(null)
    // a user's topics and links to iterate over
    const [topics, setTopics] = useState([])
    const [links, setLinks] = useState([])
    // used to pass data down to Article components
    const [fullContent, setFullContent] = useState([])
    // used as to pass query to search page
    const [searchInput, setSearchInput] = useState("");

    // on submit, we navigate to the search page and feed it the searchInpu\t
    const handleSubmit = (event) =>{
      event.preventDefault()
      console.log(searchInput)
      navigate('/search', { state:
        {query: searchInput}});
    }
     // on page load, we grab the current user's information and populate our variables
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

    // When topics array has been filled from the previous useEffect, then we will begin querying articles from the database 
    // based off of their links
    // We create an object, which holds an article's content, id, title, descritpion, and likes
    /*
    useEffect(() => {
      const fetchArticles = async () => {
        const newContent = [];
        for (const topic of topics) {
          console.log(topic)
          try {
            const q = query(collection(db, "articles"), where("topic", "==", topic), limit(1));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
              console.log(doc.data())
              const article = {
                id: doc.id,
                title: doc.data().title,
                description: doc.data().url,
                content: doc.data().content,
                userLikes: [],
                likes: doc.data().userLikes.length,
              }
              newContent.push(article);;
            });
          } catch (error) {
            console.error(`Error fetching articles for ${topic}`, error);
          }
        }
        setFullContent(newContent);
      };
  
      if (topics.length) {
        fetchArticles();
      }
    }, [topics]);
    */
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
                id: doc.id,
                title: doc.data().title,
                description: doc.data().url,
                content: doc.data().content,
                userLikes: [],
                likes: doc.data().userLikes.length,
                topics: doc.data().topic,
              }
              newContent.push(article);;
            });
          } catch (error) {
            console.error(`Error fetching articles for ${link}`, error);
          }
        }
        setFullContent(newContent);
      };
  
      if (topics.length) {
        fetchArticles();
      }
    }, [topics]);


    // When the input in the search field is changed, the update will be reflected in our variable
    const handleChange = (e) => {
      e.preventDefault();
      setSearchInput(e.target.value);
    };


    return (
      <main className={styles.Dashboard}>
        
        <div className={styles.header}>
        <h1 className = {styles.logo}> Stake The Stigma.</h1>
        <h2 className = {styles.slogan}> Destigmatizing Women's Health</h2>
        <form onSubmit={handleSubmit}>
        <input
            type="text"
            placeholder="Search here"
            onChange={handleChange}
            value={searchInput} 
            width="200px"/>
        </form>
        <Navbar />
        </div>
        <div className={styles.articleContainer}>
            {fullContent && fullContent.map((topic)=>{
                return <Article id={topic.id}
                title={topic.title} 
                description={topic.description} 
                content={topic.content} 
                userLikes={topic.userLikes} 
                likes={topic.likes}
                topic={topic.topics}/>
            })}
        </div>
    </main>
    );
  }
  


export default Dashboard;
