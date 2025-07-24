// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "ai-logo-generator-3362d.firebaseapp.com",
  projectId: "ai-logo-generator-3362d",
  storageBucket: "ai-logo-generator-3362d.firebasestorage.app",
  messagingSenderId: "305866284683",
  appId: "1:305866284683:web:96fb7e17f8f75a77e63e8e",
  measurementId: "G-9LGHWHGJFG"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);