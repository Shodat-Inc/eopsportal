// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAtWg2GWHXJovsBFr42Rjeb1rGkZJ4HxUg",
  authDomain: "eopsportal.firebaseapp.com",
  projectId: "eopsportal",
  storageBucket: "eopsportal.appspot.com",
  messagingSenderId: "807769778699",
  appId: "1:807769778699:web:7638703f778b570b72750e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);