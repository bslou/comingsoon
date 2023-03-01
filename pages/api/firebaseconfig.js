// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyChlQQIwfQin_xirFjaNNMAMPrs7c7l3B0",
  authDomain: "a-passionate-nerd.firebaseapp.com",
  projectId: "a-passionate-nerd",
  storageBucket: "a-passionate-nerd.appspot.com",
  messagingSenderId: "786003147092",
  appId: "1:786003147092:web:812ce541744283860f30c1",
  measurementId: "G-8H09VCNSC4",
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();

export { db };
