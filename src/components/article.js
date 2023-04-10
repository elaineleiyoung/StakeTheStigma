import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {useState} from 'react'
import { doc, FieldValue, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import Comment from "./comment";
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import ShareRoundedIcon from '@mui/icons-material/ShareRounded';

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



export default function Article(props) {
  // props passed in from the dashboard page 
  const [title, setTitle] = useState(props.title);
  const [description, setDescription] = useState(props.description);
  const [content, setContent] = useState(props.content);
  const [open, setOpen] = React.useState(false);
  const [liked, setLiked] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //sets an article to true or false based on whether user liked that article. Can figure out how we can implement this into the database later. 
  function likeHandler() {
    if (liked) {
      setLiked(false);
      const docRef = doc(db, "articles", props.id);
      updateDoc(docRef, {
        likes: props.likes
      });
      console.log(props.likes)
    }
    else {
      setLiked(true);
      const docRef = doc(db, "articles", props.id);
      updateDoc(docRef, {
        likes: props.likes + 1
      });
      console.log(props.likes)
    }
  }
//Our articles are made using MUI Card and Modal Components. Articles are rendered with a prop passed in dashboard page, that metadata is then used below to supplement the fields.
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea onClick={handleOpen}>
        <CardMedia
          component="img"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button>
          <ShareRoundedIcon />
        </Button>
        <Button onClick = {likeHandler}>
          {!liked ? <h3><FavoriteBorderRoundedIcon /></h3> : <h3><FavoriteRoundedIcon /></h3>}
        </Button>
      </CardActions>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style, overflowY: 'auto', maxHeight: '90vh' }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {content}
          </Typography>
          <Typography>
            <Comment />
          </Typography>
        </Box>
      </Modal>
    </Card>
  );
}
