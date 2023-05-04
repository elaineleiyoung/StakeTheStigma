import { useNavigate } from 'react-router-dom'
import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {Paper} from '@mui/material'
import styles from "../styles/Dashboard.module.css";
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
  
  
    // on submit, we navigate to the search page and feed it the searchInpu\t
    const handleSubmit = (event) =>{
        event.preventDefault()
        console.log(searchInput)
        if(currentPath === '/search'){
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
           <a href="/profile">
            <button className={styles.profileBtn}><AccountCircleIcon fontSize="large" sx={{color:"white"}}/></button>
           </a>
          </IconButton>
         {/* search bar*/}
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