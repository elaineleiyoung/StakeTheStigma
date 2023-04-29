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

function Dashboard() {
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
    }
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

    // When topics array has been filled from the previous useEffect, then we will begin querying articles from the database 
    // based off of their links
    // We create an object, which holds an article's content, id, title, descritpion, and likes
    /*
    useEffect(() => {
      const fetchArticles = async () => {
        const newContent = [];
        for (const topic of topics) {
          console.log(topic)
          try {
            const q = query(collection(db, "articles"), where("topic", "==", topic), limit(1));
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
              }
              newContent.push(article);;
            });
          } catch (error) {
            console.error(`Error fetching articles for ${topic}`, error);
          }
        }
        setFullContent(newContent);
      };
  
      if (topics.length) {
        fetchArticles();
      }
    }, [topics]);
    */
    useEffect(() => {
      const fetchArticles = async () => {
        const newContent = [];
        for (const link of links) {
          console.log(link)
          try {
            const q = query(collection(db, "articles"), where("url", "==", link), limit(1));
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
            console.error(`Error fetching articles for ${link}`, error);
          }
        }
        setFullContent(newContent);
      };
  
      if (topics.length) {
        fetchArticles();
      }
    }, [topics]);


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
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
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
        <div >
        {/* <h1> Stake The Stigma.</h1>
        <h2 > Destigmatizing Women's Health</h2> */}
        </div>
        <div className={styles.dboard}>
        <div className={styles.welcome}>

          <CustomTypography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            whiteSpace= "pre-wrap"
          >
             Welcome{'\n'}{email}!
          </CustomTypography>
          
          <Insights/>
          <Paper>
            <Typography variant="subtext">
              <div>
              “The, the boy's a liar
              The boy's a liar
              He doesn't see ya
              You're not lookin' at me, boy”
              </div>
            </Typography>
          </Paper>
            <div className={styles.quoteImagePos}> 
              <img className={styles.quoteImage} src={quote1} alt="Logo" />;
            </div>
        </div>
        <div className={styles.insights}>
        <Paper elevation={10}>
        </Paper>
        </div>
        <Styled2Paper  className={styles.articlePaper} elevation={15}>
      <div className={styles.articleGrid}>
        {fullContent && fullContent.map((topic) => (
          <Article
            id={topic.id}
            title={topic.title}
            description={topic.description}
            content={topic.content}
            userLikes={topic.userLikes}
            likes={topic.likes}
            topic={topic.topics}
            width={2/9}
          />
        ))}
      </div>
    </Styled2Paper>
        </div>
    </main>
    );
  }
  


export default Dashboard;
