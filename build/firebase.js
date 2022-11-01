import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from"@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAPlzkCV5Ds_AYp8H9yzKqnAibCnJe14ZU",
  authDomain: "myproject-176e0.firebaseapp.com",
  projectId: "myproject-176e0",
  storageBucket: "myproject-176e0.appspot.com",
  messagingSenderId: "56222236504",
  appId: "1:56222236504:web:ff356d8f86682031756f2d",
  measurementId: "G-70NTSX3C1Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const db = getFirestore(app)