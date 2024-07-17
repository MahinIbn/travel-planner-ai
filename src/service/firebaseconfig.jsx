// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC3EasEOHx6oEZ4Ptbaz_J3sHzkI5d6Rpg",
  authDomain: "rosy-valor-407203.firebaseapp.com",
  projectId: "rosy-valor-407203",
  storageBucket: "rosy-valor-407203.appspot.com",
  messagingSenderId: "622848520213",
  appId: "1:622848520213:web:a0b349a9bbf2a772001e1c",
  measurementId: "G-TVLT7R8H65"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db= getFirestore(app);
// const analytics = getAnalytics(app);