// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQTQeXLrjOGSwXMBe0XlkYwZq6neTaTdM",
  authDomain: "netflix-gpt-cc986.firebaseapp.com",
  projectId: "netflix-gpt-cc986",
  storageBucket: "netflix-gpt-cc986.appspot.com",
  messagingSenderId: "161935264531",
  appId: "1:161935264531:web:342f6a9317bd602c39e8e6",
  measurementId: "G-J86CN2249Y",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
