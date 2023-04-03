import styles from "../styles/Survey.module.css";
import { db } from "../../firebase";
import { collection, addDoc,  query, getDocs, where, limit } from "firebase/firestore";
import React, { useState } from 'react';
import {OpenAI} from '../../openAI'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Article from '../article'

 
function Search() {
  // Defining variables used throughout this file
  const location = useLocation()
  const squery = location.state.query
  console.log(squery)
  const API_KEY = process.env.REACT_APP_API_KEY
  // parameter for my Google PSE
  const cx = 'd5445a74cd13a432b'  
  const [links, setLinks] = useState([])
  const [fullContent, setFullContent] = useState([])

  // For testing purposes: when the generate summary button is clicked, we will check each link
  // 1) if its in our database already, do nothing
  // 2) if its not in our database, generate a summary for it and create an object for it in our database
  const handleClick = async () => {
    links.map(async (data) => {
      console.log(data)
      const q = query(collection(db, "articles"), where("url", "==", data.link), limit(1))
      const querySnapshot = await getDocs(q)
      if (querySnapshot.size === 0) {
        const content = await OpenAI(data.link)
        console.log(content)
      const docRef = await addDoc(collection(db,"articles"),{
        title: data.title,
        url: data.link,
        topic: "N/A",
        content: content.text,
        likes: 0
      })
      console.log(docRef.id)
      }
    })
  }

  // When this button is clicked, we want to iterate through our list of links
  // and create objects and populate them with the metadata for each link from our database
  // our function above gaurantees that every link generated will be in the database 
  const displaySearchResults = async () => {
    const newContent = [];
    for (const piece of links) {
      console.log(piece)
      try {
        const q = query(collection(db, "articles"), where("url", "==", piece.link), limit(1));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
          console.log(doc.data())
          const article = {
            title: doc.data().title,
            description: doc.data().url,
            content: doc.data().content,
            likes: doc.data().likes
          }
        newContent.push(article);;
      });
      } catch (error) {
        console.error(`Error fetching articles for ${piece}`, error);
      }
   }
    setFullContent(newContent);
  };

  // This function will run on page load. 
  // Once it receives the query from props, it will make a call to google PSE API, and store the response in a variable
  // This response will be stored as a list of items, which has fields link, title, summary, etc. 
  useEffect(() => {
    fetch(
    `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${cx}&q=${squery}&num=5`
    ).then((response) => response.json()).then((data) => setLinks(data['items'])).catch((error) => console.error(error));
  }, [squery]);

  return (
      <div>
        {links.map((link, index) => (
          <h1 key={index}>{link.link}</h1>
        ))}
        <button onClick={handleClick}>Click me for load OpenAI Summarization</button>
        <button onClick={displaySearchResults}>Click me to load search results as articles</button>
        <Box className={styles.articleContainer} sx={{ p: 2 }}>
          {fullContent && fullContent.map((topic) => {
            console.log(topic);
            return (
              <Article
                title={topic.title}
                description={topic.description}
                content={topic.content}
                likes={topic.likes}
              />
            );
          })}
        </Box>
      </div>
    );
  }

export default Search;

  

/*

fetch('https://www.googleapis.com/customsearch/v1?key=INSERT_YOUR_API_KEY&cx=017576662512468239146:omuauf_lfve&q=lectures')

.then(response => response.json())

.then(data => console.log(data))

.catch(error => console.error(error));*/
