// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCLEFy6e0m9E4qshM4RGLC0UU9ABeGyyVw",
  authDomain: "to-list-ce4bb.firebaseapp.com",
  projectId: "to-list-ce4bb",
  storageBucket: "to-list-ce4bb.firebasestorage.app",
  messagingSenderId: "667246116178",
  appId: "1:667246116178:web:17b7a92ba08839803cce8b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db=getFirestore(app)