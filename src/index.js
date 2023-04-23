import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {usePromiseTracker} from "react-promise-tracker"
import {ThreeDots} from 'react-loader-spinner'

const LoadingIndicator = props =>{
  const {promiseInProgress} = usePromiseTracker()
  return(
    promiseInProgress &&  <div
          style={{
            width: "100%",
            height: "100",
            display: "flex",
           justifyContent: "center",
            alignItems: "center"
          }}
        >
          <ThreeDots type="ThreeDots" color="#2BAD60" height="100" width="100" />
        </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    <LoadingIndicator/>
  </React.StrictMode>
);