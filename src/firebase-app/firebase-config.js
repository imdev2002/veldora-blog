// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBdQTwmAbW3cpHYHiesyVkcwBnc0pGmAEw",
  authDomain: "fspade-blog.firebaseapp.com",
  projectId: "fspade-blog",
  storageBucket: "fspade-blog.appspot.com",
  messagingSenderId: "782374426586",
  appId: "1:782374426586:web:b85068f46c90dfe155d2e3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
