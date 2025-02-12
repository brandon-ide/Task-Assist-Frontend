// src/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your Firebase config object
const firebaseConfig = {
  apiKey: "AIzaSyAWh4yZoXm4t8yyZh2Nwsdyu5qieZVG4xI",
  authDomain: "taskassist-grandcircus.firebaseapp.com",
  projectId: "taskassist-grandcircus",
  storageBucket: "taskassist-grandcircus.firebasestorage.app",
  messagingSenderId: "711808050719",
  appId: "1:711808050719:web:aa46d76019c21dceadd72a",
  measurementId: "G-8XJGCVV3PM"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };