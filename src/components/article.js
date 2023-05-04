import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {useState} from 'react';
import { doc, updateDoc, getDoc, arrayUnion, setDoc, arrayRemove } from "firebase/firestore";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";
import Comment from "./Comment";
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import ShareRoundedIcon from '@mui/icons-material/ShareRounded';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import styles from "../../src/components/styles/Article.module.css";
import ImageProvider from './ImageMapping/ImageContext';
import CardImage from './ImageMapping/CardImage.js';

//article style
const style = {
  position: 'absolute',
  top: '30%',
  left: '50%',
  transform: 'translate(-50%, -30%)',
  width: '80%',
  height: '80%',
  maxWidth: '600px',
  bgcolor: 'background.paper',
  p: 4,
  borderRadius: 5,
  boxShadow: 3,
};



export default function Article(props) {
  // props passed in from the dashboard page 
  const [title, setTitle] = useState(props.title);
  const [description, setDescription] = useState(props.description);
  const [content, setContent] = useState(props.content);
  const [topic, setTopic] = useState(props.topic)
  const [open, setOpen] = React.useState(false);
  const [liked, setLiked] = useState(false);
  const [totalLikes, setTotalLikes] = useState();
  const [saved, setSaved] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const width = props.width
  const auth = getAuth();
  const currentUser = auth.currentUser.email;
  const [shared, setShared] = useState(false);

  //sharing articles
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: title,
        url: description,
      })
        .then(() => {
          console.log('Article shared successfully');
          setShared(true);
        })
        .catch((error) => {
          console.error('Error sharing article:', error);
          setShared(false);
        });
    } else {
      console.log('Web Share API not supported');
      setShared(false);
    }
  };

  //Saving articles
  async function saveHandler(){
    const auth = getAuth();
    if (auth.currentUser) {
      // add topics to user's thing
      // Send API call to Firebase with selectedTopics array
      // Example API call using fetch:
      const userRef = doc(db, "users", auth.currentUser.uid);
      
      // Add topics array to user profile in Firestore
      setDoc(userRef, { email: auth.currentUser.email, links: arrayUnion(props.description) }, { merge: true })
        .then(() => {
        })
        .catch((error) => {
          alert(error.message);
        });
    }
    // rough front end here not yet connected with back*** next sprint
    if (saved) {
      setSaved(false);
    }
    else {
      setSaved(true);
    }
  }


  
  //sets an article to true or false based on whether user liked that article, makes calls to database to reflect changes, could be more efficient however?

  async function likeHandler() {
    const auth = getAuth();
    if (liked) {
      setLiked(false);
      const docRef = doc(db, "articles", props.id);
      updateDoc(docRef, {
        userLikes: arrayRemove(currentUser)
      });
      const likes = await getDoc(docRef);
      updateDoc(docRef, {
        likes: likes.data().userLikes.length});
      setTotalLikes(likes.data().userLikes.length);
      if (auth.currentUser) {
        // add like to user's thing
        // Send API call to Firebase with selectedTopics array
        // Example API call using fetch:
        const userRef = doc(db, "users", auth.currentUser.uid);
        
        // Add topics array to user profile in Firestore
        updateDoc(userRef, { likedArticles: arrayRemove(props.description) }, { merge: true })
          .then(() => {
          })
          .catch((error) => {
            alert(error.message);
          });
      }
      }
    else {
      setLiked(true);
      const docRef = doc(db, "articles", props.id);
      updateDoc(docRef, {
        userLikes: arrayUnion(...props.userLikes, currentUser)
      });
      const likes = await getDoc(docRef);
      updateDoc(docRef, {
        likes: likes.data().userLikes.length});
      setTotalLikes(likes.data().userLikes.length);
    }
    if (auth.currentUser) {
      // add like to user's thing
      // Send API call to Firebase with selectedTopics array
      // Example API call using fetch:
      const userRef = doc(db, "users", auth.currentUser.uid);
      
      // Add topics array to user profile in Firestore
      updateDoc(userRef, { likedArticles: arrayUnion(props.description) }, { merge: true })
        .then(() => {
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  }
//Our articles are made using MUI Card and Modal Components. Articles are rendered with a prop passed in dashboard page, that metadata is then used below to supplement the fields.
  return (
    <Card sx={{ width: `${width}fr`,height: '100%',  borderRadius:2, background:'#F4F4F4'}}>
      <CardActionArea onClick={handleOpen}>
      <ImageProvider topic={topic}> 
        <CardImage />
      </ImageProvider>
          <CardContent>
          <Typography gutterBottom component="div" className="custom-h5" style={{ fontFamily: 'Montserrat', fontWeight: 'bold', color:'121221'}}>
             {title}
          </Typography>
          </CardContent>
      </CardActionArea>
    
      <a href={description}  target="_blank" style={{textDecoration:"none", color: "grey", fontSize:"medium", paddingLeft:"20px"}}>Source</a>
      
      <CardActions className={styles.cardActions}>
        <Button className={styles.cardActionButtons} onClick={handleShare}>
          <ShareRoundedIcon sx={{marginBottom: '8px'}}/>
        </Button>
        <Button className={styles.cardActionButtons} onClick = {likeHandler}>
          {!liked ? <h3><FavoriteBorderRoundedIcon />{totalLikes}</h3> : <h3><FavoriteRoundedIcon />{totalLikes}</h3>}
        </Button>
        <Button className={styles.cardActionButtons} onClick = {saveHandler}>
          {!saved ? <h3><BookmarkBorderIcon /></h3> : <h3><BookmarkIcon/></h3>}
        </Button>
      </CardActions>

    {/*This is the content within the card*/}
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
      <Box sx={{ ...style, overflowY: 'auto', maxHeight: '90vh', maxWidth:'150vh', overflowX: 'hidden'}}>
        <div className={styles.openContainer}>
          <Typography sx={{fontSize:'25px', fontWeight: 'bold', position:'relative', textAlign:'left', left: '5%', letterSpacing: '0.1rem'}}>
            {title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 , width: '92%', position: 'relative', textAlign:'left', left: '5%'}}>
            {content}
          </Typography>
          <div style={{ position: 'relative', width: '100%', height: '0px',  border: '1px solid #C4C4C4', transform: 'rotate(-0.06deg)', marginTop: '1.5em'}}></div>
          {/* <Card > */}
            <Comment id={props.id}/>
          {/* </Card> */}
        </div>
      </Box>
    </Modal>
  </Card>



  );
}
