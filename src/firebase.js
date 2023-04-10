// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBmN_FaKypjOKQQFrR91ClS76B0YG8bNZ0",
  authDomain: "stakethestigma-dc208.firebaseapp.com",
  projectId: "stakethestigma-dc208",
  storageBucket: "stakethestigma-dc208.appspot.com",
  messagingSenderId: "748785801153",
  appId: "1:748785801153:web:b5181a696b692c3f024140",
  measurementId: "G-H1E8HTJJJ4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
