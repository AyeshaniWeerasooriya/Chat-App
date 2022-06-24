// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDmn2BUoRDA6L5UJFtZtVJMRqGkkNN3WoQ",
  authDomain: "react-chat-25592.firebaseapp.com",
  databaseURL: "http://react-chat-25592.firebaseio.com",
  projectId: "react-chat-25592",
  storageBucket: "react-chat-25592.appspot.com",
  messagingSenderId: "56382664592",
  appId: "1:56382664592:web:ca908c5d4336303af8      kuk6mpms4d15"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db=getFirestore(app);
const storage = getStorage(app);

export {auth, db, storage};