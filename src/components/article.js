import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {useState} from 'react'
import { doc, FieldValue, updateDoc, getDoc, arrayUnion, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";
import Comment from "./comment";
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import ShareRoundedIcon from '@mui/icons-material/ShareRounded';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import styles from "../../src/components/styles/Article.module.css";

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
  borderRadius: 2,
};



export default function Article(props) {
  // props passed in from the dashboard page 
  const [title, setTitle] = useState(props.title);
  const [description, setDescription] = useState(props.description);
  const [content, setContent] = useState(props.content);
  const [open, setOpen] = React.useState(false);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
    if (liked) {
      setLiked(false);
      const docRef = doc(db, "articles", props.id);
      updateDoc(docRef, {
        userLikes: props.userLikes,
      });
      const likes = await getDoc(docRef);
      updateDoc(docRef, {
        likes: likes.data().userLikes.length});
      }
    else {
      setLiked(true);
      const docRef = doc(db, "articles", props.id);
      updateDoc(docRef, {
        userLikes: arrayUnion(...props.userLikes, currentUser)
      });
      console.log(currentUser);
      const likes = await getDoc(docRef);
      updateDoc(docRef, {
        likes: likes.data().userLikes.length});
    }
  }
//Our articles are made using MUI Card and Modal Components. Articles are rendered with a prop passed in dashboard page, that metadata is then used below to supplement the fields.
  return (
    <Card sx={{ width: 345, borderRadius:2, boxShadow:0}}>
      <CardActionArea onClick={handleOpen}>
        <CardMedia
          component="img"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
          alt="Female Health<3"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" className="custom-h5">
            {title}
          </Typography>
          {/* <Typography variant="body2" color="text.secondary">
            {description}
          </Typography> */}
          <a href={description} >source</a>
        </CardContent>
      </CardActionArea>
      <CardActions>
      <Button onClick={handleShare}>
          <ShareRoundedIcon />
        </Button>

        <Button onClick = {likeHandler}>
          {!liked ? <h3><FavoriteBorderRoundedIcon /></h3> : <h3><FavoriteRoundedIcon /></h3>}
        </Button>

        <Button onClick = {saveHandler}>
          {!saved ? <h3><BookmarkBorderIcon /></h3> : <h3><BookmarkIcon/></h3>}
        </Button>
      </CardActions>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style, overflowY: 'auto', maxHeight: '90vh', maxWidth:'150vh', className:'articleOpen'}}>
          <Typography className={styles.Article}>
            {title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {content}
          </Typography>
          <Card >
            <Comment id={props.id}/>
          </Card>
        </Box>
      </Modal>
    </Card>
  );
}
