import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCJxzdZWRybn4c5hd9OfdIqjZp-jxFNr-A",
    authDomain: "task-manager-28fcf.firebaseapp.com",
    projectId: "task-manager-28fcf",
    storageBucket: "task-manager-28fcf.firebasestorage.app",
    messagingSenderId: "421667628400",
    appId: "1:421667628400:web:141fa722d2f7f3e87d1bb5",
    measurementId: "G-J4Q6JXZJ5G"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
