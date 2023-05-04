import { db } from "../firebase";
import { doc,  collection, query, getDocs, getFirestore, getDoc} from "firebase/firestore"; 
import { useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react';
import { getAuth } from "firebase/auth";
import Article from './Article'
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import {Paper} from '@mui/material'
import NaviBar  from "./NavigationBar";
import styles from "./styles/Search.module.css";

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

function ContributorFeed() {
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

    useEffect(() => {
      const fetchArticles = async () => {
        const newContent = [];
        try {
            const q = query(collection(db, "communityPosts"));
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
            console.error(`Error fetching articles for`, error);
          }
        setFullContent(newContent);
      };
      fetchArticles()
    }, [topics]);

      function handleBack(){
            navigate('/dashboard')
          }

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
                Contributor
                <CustomTypography
                        variant="h2"
                        noWrap
                        component="div"
                        whiteSpace= "pre-wrap"
                >
                Feed: {'\n'}
                <CustomTypography
                        variant="h5"
                        noWrap
                        component="div"
                        whiteSpace= "pre-wrap"
                        color="#3A448C"
                >
                <em>Community Posts</em>
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
                                        topic={topic.topics}
                                        />
                                ))}
                        </div>
                </Styled2Paper>
        </div>
</main>
    );
  }
  


export default ContributorFeed;
