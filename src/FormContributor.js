import { useState } from 'react';
import { db } from "./firebase";
import { collection, addDoc,  query, getDocs, where, limit } from "firebase/firestore";
import './formComponent.css'
import styles from "./components/styles/formComponent.module.css";
import Navbar from './components/scripts/Navbar';
import {OpenAI} from './openAI';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Survey from './components/scripts/survey';
import Chip from '@mui/material/Chip';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function FormComponent() {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [selectedTopics, setSelectedTopics] = useState([]);

  function handleTopicClick(topic, link) {
    if (selectedTopics.includes(topic)) {
      setSelectedTopics(selectedTopics.filter((t) => t !== topic));
    } else {
      setSelectedTopics([...selectedTopics, topic]);
    }
  }


  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const q = query(collection(db, "articles"), where("url", "==", url), limit(1))
      const querySnapshot = await getDocs(q)
      if (querySnapshot.size === 0) {
        const content = await OpenAI(url);
        console.log(content);
        const docRef = await addDoc(collection(db, "articles"), {
          title: title,
          url: url,
          topic: selectedTopics,
          content: content.text,
          likes: 0,
          userLikes: []
        });
        console.log('Document written with ID: ', docRef.id);
        // Reset the form
        setTitle('');
        setUrl('');
      }
    } catch (error) {
      console.error(`Error fetching articles for ${url}`, error);
    }
  };

  return (
    <div>
      <header className="heading">
        <h1 className="logo"> Stake The Stigma.</h1>
        <h2 className="subtitle">Destigmatizing Women's Health</h2>
      </header>
      <div className= "overall"> 
        <div className = "contributorIcon">
          <AccountCircleIcon sx={{ fontSize: 125, marginLeft: '2px' }} />
        </div>
      <div className="content">
          <h1 className= "contributeTitle">Contribute</h1> 
          <form onSubmit={handleSubmit} className="form-total">
            <label className="surveyLabel"> Title <input type="text" id="fname" name="firstname" className="contributorInput" onChange={(event) => setTitle(event.target.value)} /></label>
            <label className="surveyLabel"> URL  <input type="text" id="fname" name="firstname" className="contributorInput" onChange={(event) => setUrl(event.target.value)} /></label>
            <input type="text" id="fname" name="firstname"  placeHolder="Type your mini blog..." className="contributorInput2" />
          </form>
        <div className="surveyLabel2">
          <h1>Topics</h1>
          <StyledChip className= {styles.chips}
              label="Menstruation"
              onClick={() => handleTopicClick("menstruation","https://www.nhs.uk/conditions/period-pain/")}
              clicked={selectedTopics.includes("menstruation")}
            />
            <StyledChip
              label="HPV Vaccination"
              onClick={() => handleTopicClick("hpv","https://www.cdc.gov/std/hpv/stdfact-hpv.htm#:~:text=What%20is%20HPV%3F,including%20genital%20warts%20and%20cancers.")}
              clicked={selectedTopics.includes("hpv")}
            />
            <StyledChip
              label="Polycystic ovary syndrome (PCOS)"
              onClick={() => handleTopicClick("pcos","https://www.nhs.uk/conditions/polycystic-ovary-syndrome-pcos/")}
              clicked={selectedTopics.includes("pcos")}
            />
            <StyledChip
              label="Pregnancy"
              onClick={() => handleTopicClick("pregnancy", "https://www.cdc.gov/pregnancy/index.html")}
              clicked={selectedTopics.includes("pregnancy")}
            />
            <StyledChip
              label="Ovarian and Cervical Cancer"
              onClick={() => handleTopicClick("ovarian_cancer","https://www.nhs.uk/conditions/ovarian-cancer/")}
              clicked={selectedTopics.includes("ovarian_cancer")}
            />
            <StyledChip
              label="Postpartum Depression"
              onClick={() => handleTopicClick("postpartum","https://www.mayoclinic.org/diseases-conditions/postpartum-depression/symptoms-causes/syc-20376617")}
              clicked={selectedTopics.includes("postpartum")}
            />
            <StyledChip
              label="Breast Cancer"
              onClick={() => handleTopicClick("breast_cancer","https://www.cdc.gov/cancer/breast/basic_info/what-is-breast-cancer.htm")}
              clicked={selectedTopics.includes("breast_cancer")}
            />
            <StyledChip
              label="Menopause"
              onClick={() => handleTopicClick("menopause","https://www.nia.nih.gov/health/what-menopause")}
              clicked={selectedTopics.includes("menopause")}
            />
          {/* <TextField className="other-topic" label="Other Topic" variant="outlined" sx={{width: '450px', marginTop: "10px", marginLeft: "10px"}}/> */}
      </div>
      <Button className="submit" type="submit" variant='contained'
                onClick={handleSubmit} sx={{
                width:'200px', 
                height: '50px',
                borderRadius: '999px',
                backgroundColor: '#3A448C', 
                  '&:hover': {
                  backgroundColor: "#A473E6",
                  }
                }}>
          Submit
    </Button>
    </div>

    </div>
    </div>
  );
}

function StyledChip(props) {
  const { clicked, ...rest } = props;
  return (
    <Chip
      variant="outlined"
      {...rest}
      sx={[
        clicked ? { backgroundColor: "#59515e", color: "white" } : { backgroundColor: "white", color: "black" },
        { margin: 1 },
        
      ]}
    />
  );
}


export default FormComponent;
