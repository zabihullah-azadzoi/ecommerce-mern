// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAdg_GKzAv6NLiSaQadw9hhyzVP554sUGA",
  authDomain: "ecommerce-196e3.firebaseapp.com",
  projectId: "ecommerce-196e3",
  storageBucket: "ecommerce-196e3.appspot.com",
  messagingSenderId: "987196529399",
  appId: "1:987196529399:web:f5bfc38af60ef073f3d1f2",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firebaseAuth = firebase.auth;
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
