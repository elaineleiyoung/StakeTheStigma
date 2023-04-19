import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebase';
import './formComponent.css'
import styles from "./components/styles/formComponent.module.css";
import Navbar from './components/scripts/Navbar'

function FormComponent() {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [topic, setTopic] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Add the new document to the "articles" collection
    const docRef = await addDoc(collection(db, 'articles'), {
      title,
      url,
      topic,
      content,
      likes: 0,
    });

    console.log('Document written with ID: ', docRef.id);

    // Reset the form
    setTitle('');
    setUrl('');
    setTopic('');
    setContent('');
  };

  return (
    <div>
    {/* <Navbar /> */}
    <h1 className = {styles.logo}> Stake The Stigma.</h1>
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title</label>
      <input type="text" id="title" value={title} onChange={(event) => setTitle(event.target.value)} />

      <label htmlFor="url">URL</label>
      <input type="text" id="url" value={url} onChange={(event) => setUrl(event.target.value)} />

      <label htmlFor="topic">Topic</label>
      <input type="text" id="topic" value={topic} onChange={(event) => setTopic(event.target.value)} />

      <label htmlFor="content">Content</label>
      <textarea id="content" value={content} onChange={(event) => setContent(event.target.value)} />

      <button className="submit" type="submit">Submit</button>
    </form>
    </div>
  );
}

export default FormComponent;
