import styles from "../styles/Login.module.css";
import { db } from "../../firebase";
import { doc, setDoc, collection, addDoc } from "firebase/firestore"; 
import { Link, useNavigate, useLocation} from 'react-router-dom'
import { getNhsArticles } from "../../api";
import React, { useEffect, useState } from 'react';

function Dashboard() {

    const navigate = useNavigate() /*navigate allows us to navigate between components*/
    const [description,setDescription] = useState('')
    const [content, setContent] = useState([])
    function removeHtmlTags(text) {
        const regex = /(<([^>]+)>)/gi;
        return text.replace(regex, "");
      }
    /** {content.map((blob) => (
                    blob['mainEntintyofPage'][0]['text'] ? 
                    <p>{blob['mainEntintyofPage'][0]['text']}</p> : 
                    <p></p>
                    ))} */
    const fetchArticle = async() => {
        const responseJson = await getNhsArticles()
        setContent(responseJson)
    }
    return (
        <main>
            <h1>Hi this is the dashboard</h1>
            <button onClick={fetchArticle}>Click me to view json for nhs period articles!</button>
            <h1>{description}</h1>
            <div>
            {content.map((blob) => (
                <div>
                {<h1>{blob['headline']}</h1>}
                {<p>{removeHtmlTags(blob['mainEntityOfPage'][0]['text'])}</p>}
                </div>
            ))}
            </div>
            {/* This is how I implemented dynamically created html elements in my previous project
             <div className="DisplayImageGrid">
        {imageList.map((image)=> <Zoom><div className="pic"><img class="DisplayImage"src={image.url.slice(0,47) + "q_auto/" + image.url.slice(47)} alt={image.public_id}></img></div></Zoom>)},
      </div>
            */}
        </main>
    );
}

export default Dashboard; 