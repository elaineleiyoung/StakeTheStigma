import styles from "../styles/Survey.module.css";
import { db } from "../../firebase";
import { doc, setDoc, collection, addDoc, arrayUnion } from "firebase/firestore"; 
import React, { useState } from 'react';
import SurveyButton from "../UI/button";
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import DoneIcon from "@mui/icons-material/Done";
import { Link } from 'react-router-dom';
import {getNewsArticles} from '../../newsApi'
import {OpenAI} from '../../openAI'
import { useEffect } from 'react'
import { getAuth } from 'firebase/auth';
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';

function Search() {
  const location = useLocation()
  const query = location.state.query  
  const API_KEY = process.env.REACT_APP_API_KEY
  const cx = 'd5445a74cd13a432b'
  const [links, setLinks] = useState([])
  useEffect(() => {
    fetch(
        `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${cx}&q=${query}&num=5`
      )
        .then((response) => response.json())
        .then((data) => setLinks(data['items']))
        .catch((error) => console.error(error));
  }, [query]);
  return (
    <div>
      {links.map((link, index) => (
        <h1 key={index}>{link.link}</h1>
      ))}
    </div>
  );
}
export default Search;

/*
fetch('https://www.googleapis.com/customsearch/v1?key=INSERT_YOUR_API_KEY&cx=017576662512468239146:omuauf_lfve&q=lectures')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));*/