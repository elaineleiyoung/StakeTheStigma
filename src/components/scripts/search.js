import styles from "../styles/Search.module.css";
import { db } from "../../firebase";
import { collection, addDoc,  query, getDocs, where, limit } from "firebase/firestore";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import {OpenAI} from '../../openAI'
import {Categorize} from './categorize'
import { useEffect, useMemo } from 'react'
import { useLocation } from 'react-router-dom';
import Article from '../article'
import { trackPromise } from 'react-promise-tracker'
import NaviBar from "./navigationBar";
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import {Paper} from '@mui/material'

const Styled2Paper = styled(Paper)(({ theme }) => ({
        display: 'relative',
        width: '90%',
        height:'99%',
        borderRadius:'10px',
        margin: theme.spacing(1),
        boxShadow:'none',
        backgroundColor:'white'
      }));
const CustomTypography = styled(Typography)(({ theme }) => ({
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: 'bold'
      }));
function Search() {
  // Defining variables used throughout this file
  const location = useLocation()
  const squery = useMemo(() => location.state.query, [location.state.query])
  const API_KEY = 'AIzaSyBmN_FaKypjOKQQFrR91ClS76B0YG8bNZ0';
  // parameter for my Google PSE
  const cx = 'd5445a74cd13a432b'  
  const [links, setLinks] = useState([])
  const [fullContent, setFullContent] = useState([])
  const navigate = useNavigate()

  // For testing purposes: when the generate summary button is clicked, we will check each link
  // 1) if its in our database already, do nothing
  // 2) if its not in our database, generate a summary for it and create an object for it in our database
  function handleBack(){
    navigate('/dashboard')
  }
  const fetchLinks = async () => {
    try {
      const response = await fetch(`https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${cx}&q=${squery}&num=6`);
      const data = await response.json();
      setLinks(data['items']);
    } catch (error) {
      console.error(error);
    }
  };

  const generateSummaries = async () => {
    for (const data of links) {
      console.log(data);
      const q = query(collection(db, "articles"), where("url", "==", data.link), limit(1));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.size === 0) {
        const content = await OpenAI(data.link);
        const category = await Categorize(squery)
        const qtopic = category.text.replace(/\s/g, '')
        console.log(qtopic)
        console.log(content);
        const docRef = await addDoc(collection(db, "articles"), {
          title: data.title,
          url: data.link,
          topic: qtopic,
          content: content.text,
          likes: 0,
          userLikes: []
        });
        console.log(docRef.id);
      }
    }
    const articles = await getArticles();
    setFullContent(articles);
  };

  const getArticles = async () => {
    const newContent = [];
    for (const piece of links) {
      console.log(piece);
      try {
        const q = query(collection(db, "articles"), where("url", "==", piece.link), limit(1));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          console.log(doc.data());
          const article = {
            id: doc.id,
            title: doc.data().title,
            description: doc.data().url,
            content: doc.data().content,
            likes: doc.data().likes,
            qtopic: doc.data().topic
          }
          newContent.push(article);
        });
      } catch (error) {
        console.error(`Error fetching articles for ${piece}`, error);
      }
    }
    return newContent;
  };

  useEffect(() => {
    fetchLinks();
  }, [squery]);

  useEffect(() => {
    if (links.length > 0) {
      trackPromise(generateSummaries());
    }
  }, [links]);


  return (
        <main > 
                <NaviBar/>
                <div className={styles.sboard}>
                <button className={styles.back}onClick={handleBack}>BACK</button>
                        <CustomTypography
                                variant="h2"
                                noWrap
                                component="div"
                                whiteSpace= "pre-wrap"
                                className={styles.m1}
                        >
                        STS Search Results
                        <CustomTypography
                                variant="h2"
                                noWrap
                                component="div"
                                whiteSpace= "pre-wrap"
                        >
                        For: {'\n'}
                        <CustomTypography
                                variant="h5"
                                noWrap
                                component="div"
                                whiteSpace= "pre-wrap"
                                color="#3A448C"
                        >
                        <em>{squery}</em>
                        </CustomTypography>
                        </CustomTypography>
                        </CustomTypography>
                        
                        
                        <Styled2Paper  className={styles.searchPaper} elevation={15}>
                                <div className={styles.searchGrid}>
                                        {fullContent && fullContent.map((topic) => (
                                                <Article
                                                id={topic.id}
                                                title={topic.title}
                                                description={topic.description}
                                                content={topic.content}
                                                userLikes={topic.userLikes}
                                                likes={topic.likes}
                                                topic={topic.qtopic}
                                                />
                                        ))}
                                </div>
                        </Styled2Paper>
                </div>
        </main>
    );
  }

export default Search;

  

/*

fetch('https://www.googleapis.com/customsearch/v1?key=INSERT_YOUR_API_KEY&cx=017576662512468239146:omuauf_lfve&q=lectures')

.then(response => response.json())

.then(data => console.log(data))

.catch(error => console.error(error));*/