import styles from "../styles/Dashboard.module.css";
import { db } from "../../firebase";
import { doc, setDoc, collection, addDoc, where, query, getDocs, limit} from "firebase/firestore"; 
import { Link, useNavigate, useLocation} from 'react-router-dom'
import React, { useEffect, useState } from 'react';
import { getAuth } from "firebase/auth";
import { getFirestore, getDoc } from "firebase/firestore";
import Article from '../article'
import { Text} from '@chakra-ui/react'
import { styled, alpha } from '@mui/material/styles';

import InputBase from '@mui/material/InputBase';
/*MUI Imports */
import Navbar from './Navbar'




const style = {
  position: 'absolute',
  top: '30%',
  left: '50%',
  transform: 'translate(-50%, -30%)',
  width: '80%',
  height: 'auto',
  maxWidth: '600px',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


function Dashboard() {
  const [searchOpen, setSearchOpen] = useState(false);

  const handleSearchClick = () => {
    setSearchOpen(true);
  }

  const handleSearchClose = () => {
    setSearchOpen(false);
  }
    const auth = getAuth();
    const firestore = getFirestore();
    const navigate = useNavigate()
    const [description,setDescription] = useState(null)
    const [content, setContent] = useState([])
    const [email, setEmail] = useState(null)
    const [topics, setTopics] = useState([])
    const [links, setLinks] = useState([])
    const [fullContent, setFullContent] = useState([])
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
      setInputValue(event.target.value);
    };

    const handleSubmit = (event) =>{
      event.preventDefault()
      console.log(searchInput)
      navigate('/search', { state:
        {query: searchInput}});
    }

    const Search = styled('div')(({ theme }) => ({
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    }));
    
    const SearchIconWrapper = styled('div')(({ theme }) => ({
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }));
    
    const StyledInputBase = styled(InputBase)(({ theme }) => ({
      color: 'inherit',
      '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          width: '12ch',
          '&:focus': {
            width: '20ch',
          },
        },
      },
    }));
    
    
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
                likes: doc.data().likes
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


    const searchBar = () => {}
    const [searchInput, setSearchInput] = useState("");
    const handleChange = (e) => {
      e.preventDefault();
      setSearchInput(e.target.value);
    };
    
   /*  if (searchInput.length > 0) {
        countries.filter((country) => {
        return country.name.match(searchInput);
    });
    } */

    return (
      <main>
        <Navbar />
        <form onSubmit={handleSubmit}>
        <input
            type="text"
            placeholder="Search here"
            onChange={handleChange}
            value={searchInput} 
            width="200px"/>
        </form>
      <div className={styles.sheesh}>
        <div className={styles.header}>
          <h1 className = {styles.logo}> Stake The Stigma.</h1>
          <h2 className = {styles.slogan}> Destigmatizing Women's Health</h2>
        </div>
        {/*
        <p className= {styles.message}>Hi {email}</p>
          <h2>Your topics are</h2>
          {topics?topics.map((topic)=><Text>{topic}</Text>):null}
          <h1>Your links are</h1>
        <div className = {styles.topics}>
          {links?links.map((link)=><Text>{link}</Text>):null}
        </div>*/}

        <div>
        <div className={styles.articleContainer}>
            {fullContent && fullContent.map((topic)=>{
                {console.log(topic)}
                return <Article id={topic.id}
                title={topic.title} 
                description={topic.description} 
                content={topic.content} 
                likes={topic.likes}/>
            })}
        </div>
        </div>
        </div>
    </main>
    );
}


export default Dashboard;




