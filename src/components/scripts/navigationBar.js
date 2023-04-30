import { db } from "../../firebase";
import { doc,  collection, where, query, getDocs, limit} from "firebase/firestore"; 
import { useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react';
import { getAuth } from "firebase/auth";
import { getFirestore, getDoc } from "firebase/firestore";
import Article from '../article'
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
import quote1 from '../ArticleImage/resources/quote1.jpg'
import { useLocation } from "react-router-dom";

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
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
    color: '#3A448C'
  
  }));
  
  const StyledPaper = styled(Paper)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    borderRadius:'50px',
    margin: theme.spacing(1),
  }));
  
  const Styled2Paper = styled(Paper)(({ theme }) => ({
    display: 'relative',
    width: '90%',
    height:'99%',
    borderRadius:'10px',
    margin: theme.spacing(1),
    boxShadow:'none',
    backgroundColor:'white'
  }));
  
  
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      width: '100%',
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      [theme.breakpoints.up('sm')]: {
        width: '20ch',
        '&:focus': {
          width: '30ch',
        },
      },
    },
  }));
  
  const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1, 2),
  }));
  
  const CustomTypography = styled(Typography)(({ theme }) => ({
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 'bold'
  }));
  
  
function NaviBar() {
    const location = useLocation();
    // Get the current path from the location object
    const currentPath = location.pathname;  
    // navigate is used to go to search page while passing parameters
    const navigate = useNavigate()
    const [searchInput, setSearchInput] = useState("");
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
        if(currentPath == '/search'){
            navigate('/search', { state:
                {query: searchInput}});
            window.location.reload()
        }else{
            navigate('/search', { state:
                {query: searchInput}});
        }
      }

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
      <AppBar position="static" sx={{ background: 'linear-gradient(to right, #A473E6, #9DB7FD, #87FAE7)', shadow:'none', height:'80px'}}>
        <StyledToolbar>
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
          <Search>

          <StyledPaper component="form" onSubmit={handleSubmit}>
          <SearchIconWrapper sx={{backgroundColor: 'transparent'}}>
            <SearchIcon />
          </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              sx={{backgroundColor: 'transparent'}}
            />
          </StyledPaper>
          </Search>
          <div className= {styles.logos}> 
            <h1 className={styles.logo1}>Stake The Stigma</h1>
            <h2 className={styles.logo2}>Destigmatizing Women's Health.</h2>
          </div>
        </StyledToolbar>
      </AppBar>
    </Box>
    </main>
    );
  }
  


export default NaviBar;