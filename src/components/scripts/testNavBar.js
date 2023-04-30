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
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import {Paper, Popover} from '@mui/material'
import shadows from "@mui/material/styles/shadows";
import styles from "../styles/Dashboard.module.css";
import Insights from './insights'

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

  function NavBAR() {
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
    const [searchFocused, setSearchFocused] = useState(false);

    const handleSearchFocus = () => {
      setSearchFocused(true);
    };
  
    const handleSearchBlur = () => {
      setSearchFocused(false);
    };
  
    
    
    const [state, setState] = React.useState({
      top: false,
      left: false,
      bottom: false,
      right: false,
    });
  
    const toggleDrawer = (anchor, open) => (event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
  
      setState({ ...state, [anchor]: open });
    };
  
    const list = (anchor) => (
      <Box
        sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >
        <List>
          {['Account', 'Contributor'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton onClick={()=>navigate(`/${text.toLowerCase()}`)}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton  >
            </ListItem>
          ))}
        </List>
        <Divider />
      </Box>
    );
  
    // on submit, we navigate to the search page and feed it the searchInpu\t
    const handleSubmit = (event) =>{
      event.preventDefault()
      console.log(searchInput)
      navigate('/search', { state:
        {query: searchInput}});
      window.location.reload()
    }
    

    // When the input in the search field is changed, the update will be reflected in our variable
    const handleChange = (e) => {
      e.preventDefault();
      setSearchInput(e.target.value);
    };


    return (
      <main > 
         <div>
      {['left', 'right', 'top', 'bottom'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
          <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ background: 'linear-gradient(to right, #A473E6, #9DB7FD, #87FAE7)', shadow:'none', height:'100px'}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={toggleDrawer('left', true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            {email}'s Dashboard
          </Typography>
          <Search>

          <Paper component="form" onSubmit={handleSubmit}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase 
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
            />
             </Paper>

          </Search>
        </Toolbar>
      </AppBar>
    </Box>
    </main>
    );
  }
  


export default NavBAR;