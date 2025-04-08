// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBtAj_WkK0m871b1cHegDjKk7Z8azWE03o",
    authDomain: "quiz-app-auth-46034.firebaseapp.com",
    projectId: "quiz-app-auth-46034",
    storageBucket: "quiz-app-auth-46034.firebasestorage.app",
    messagingSenderId: "307498304248",
    appId: "1:307498304248:web:a793aaf0090be957c8b10d"
  };

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app); // ✅ export Firestore
