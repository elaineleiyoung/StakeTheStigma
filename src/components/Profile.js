import { db } from "../firebase";
import { doc,  collection, where, query, getDocs, limit, updateDoc, onSnapshot} from "firebase/firestore"; 
import { useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react';
import { getAuth } from "firebase/auth";
import { getFirestore, getDoc } from "firebase/firestore";

import Box from '@mui/material/Box';

import {Paper, Popover} from '@mui/material'

import styles from './Profile.module.css';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonIcon from '@mui/icons-material/Person';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArticleIcon from '@mui/icons-material/Article';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import LogoutIcon from '@mui/icons-material/Logout';
import Avatar from '@mui/material/Avatar';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Dashboard from "./scripts/dashboard";

function Profile() {
    //defining our variables that will be used within the dashboard
    // auth, firestore are just to initialize our Firebase for pulling user data and database functions
    const auth = getAuth();
    const firestore = getFirestore();
    // navigate is used to go to search page while passing parameters
    const navigate = useNavigate()
    // logged in user's email. Can be used later
    const [email, setEmail] = useState(null)
    const [isEditing, setIsEditing] = useState(false);

    // a user's topics and links to iterate over
    const [topics, setTopics] = useState([])
    const [links, setLinks] = useState([])
    // used to pass data down to Article components
    const [fullContent, setFullContent] = useState([])
    // used as to pass query to search page
    const [searchInput, setSearchInput] = useState("");
    const [searchFocused, setSearchFocused] = useState(false);

    const [pronouns, setPronouns] = React.useState('');

    const handlePronounsChange = (event) => {
      setPronouns(event.target.value);
    };
  

  // on page load, we grab the current user's information and populate our variables
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      console.log(user.name)
      if (user) {
        setEmail(user.email);
        const userDocRef = doc(firestore, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          // setName(userDoc.data().name);
          // setZip(userDoc.data().zip);
          setTopics(userDoc.data().topics);
          setLinks(userDoc.data().links);
        } else {
          setEmail(null);
          // setZip(null);
          setTopics([]);
          setLinks([]);
        }
      } else {
        setEmail(null);
        setEmail(null);
        // setZip(null);
        setTopics(null);
        setLinks(null)
      }
    });
    return unsubscribe;
  }, [auth, firestore]);
  function EditableEmail({ email, setEmail }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedEmail, setEditedEmail] = useState(email);
  
    const handleInputChange = (event) => {
      const { value } = event.target;
      setEditedEmail(value);
    };
  
    const handleSaveClick = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(firestore, "users", user.uid);
        try {
          await updateDoc(userDocRef, { email: editedEmail });
          console.log("Email updated successfully");
          setEmail(editedEmail);
        } catch (error) {
          console.error("Error updating email:", error);
        }
      }
      setIsEditing(false);
    };
  
    const handleCancelClick = () => {
      setEditedEmail(email);
      setIsEditing(false);
    };
  
    const handleEditClick = () => {
      setIsEditing(true);
    };
  
    useEffect(() => {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(firestore, "users", user.uid);
        const unsubscribe = onSnapshot(userDocRef, (doc) => {
          setEmail(doc.data().email);
        });
        return unsubscribe;
      }
    }, []);
  
    if (isEditing) {
      return (
        <>
          <input
            className={styles.content}
            type="text"
            value={editedEmail}
            onChange={handleInputChange}
          />
          <div sx={{ display: 'flex', position: 'relative', right: '100em'}}>
            <Button sx={{ ml: 2 }} onClick={handleSaveClick}>Save</Button>
            <Button sx={{ ml: 2 }} onClick={handleCancelClick}>Cancel</Button>
          </div>
        </>
      );
    } else {
      return (
        <>
          <p className={styles.content} onClick={() => setIsEditing(true)}>
            {email}
          </p>
        </>
      );
    }
  }
  

    function LinkTab(props) {
      return (
        <Tab
          component="a"
          onClick={(event) => {
            event.preventDefault();
          }}
          {...props}
        />
      );
    }



    return (
      <main > 
        <div className={styles.total}>
          <header className="heading">
            <h1 className="logo"> Stake The Stigma.</h1>
            <h2 className="subtitle">Destigmatizing Women's Health</h2>
          </header>
        </div>

        <div className={styles.dboard} >
          <div className={styles.welcome}>

            <div className={styles.name}>
              {/* <AccountCircleIcon className={styles.icon} /> */}
              <Avatar sx={{ width: 100, height: 100 , fontSize:'2.5em'}}>
                {email ? email.charAt(0) : ''}
              </Avatar>

              <h2>{email}</h2>  
            </div>      
            <br></br>
              
            <Paper elevation={0} sx={{width:"100%"}} >
            <Tabs value={email} aria-label="nav tabs example" orientation="vertical" sx={{display: 'flex', justifyContent: 'center', marginLeft:'12.5%'}}>
              <LinkTab icon={<DashboardCustomizeIcon />} iconPosition="start"label="My Topics" href="/" />
              <LinkTab icon={<ArticleIcon />} iconPosition="start" label="My Articles" href="/" />
              <LinkTab icon={<FavoriteIcon />} iconPosition="start" label="My Favorites" href="/" />
              <LinkTab icon={<AccountCircleIcon />} iconPosition="start" label="Profile Details" href="/" />
              {/* <br></br> */}
              <LinkTab icon={<LogoutIcon />} iconPosition="start" label="Logout" href="/" sx={{position: "relative", right:'4em'}}/>
            </Tabs>
          </Paper>



          </div>
          <div className={styles.seperator}></div>

          <Paper  className={styles.articlePaper} elevation={0}>
            
              <div className={styles.rightChildTop}>
                <h1> Account Details </h1>
                <p className={styles.label}>Username:</p>
                <EditableEmail email={email} setEmail={setEmail} />
                <p className={styles.label}>Password:</p>
                <p className={styles.content}>******</p>
                
                <p className={styles.label}>Pronouns:</p>
                <Box sx={{ minWidth: 120 }} className={styles.pronouns} >
                  <FormControl variant="standard" sx={{ width: '20em', height: '1.5em'}}>
                    <InputLabel>Pronouns</InputLabel>
                    <Select
                      value={pronouns}
                      // label="Pronouns"
                      onChange={handlePronounsChange}
                    >
                      <MenuItem value="she/her">She/Her</MenuItem>
                      <MenuItem value="he/him">He/Him</MenuItem>
                      <MenuItem value="they/them">They/Them</MenuItem>
                      <MenuItem value="ze/hir">Ze/Hir</MenuItem>
                      <MenuItem value="xe/xem">Xe/Xem</MenuItem>
                      <MenuItem value="ey/em">Ey/Em</MenuItem>
                      <MenuItem value="per/pers">Per/Pers</MenuItem>
                      <MenuItem value="other">Other</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

            </div>
          </Paper>

        </div>
    </main>
    );
  }
  


export default Profile;
