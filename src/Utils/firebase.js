// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDnb4c_G_JgIBZCPwa7MjWZK4lGPZR78dQ",
  authDomain: "netflixgpt-24eb9.firebaseapp.com",
  projectId: "netflixgpt-24eb9",
  storageBucket: "netflixgpt-24eb9.appspot.com",
  messagingSenderId: "89466328178",
  appId: "1:89466328178:web:167d0cbc20a6f158211eeb",
  measurementId: "G-ZC98EEXJ6L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();