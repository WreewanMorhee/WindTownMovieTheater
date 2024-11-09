// app/utils/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"; // Import Realtime Database module

const firebaseConfig = {
  apiKey: "AIzaSyCjZpZZsiwGJ7INciec6_flZz_NVovi1Kc",
  authDomain: "dogdogcatcat-c5643.firebaseapp.com",
  projectId: "dogdogcatcat-c5643",
  storageBucket: "dogdogcatcat-c5643.appspot.com",
  messagingSenderId: "108560560214",
  appId: "1:108560560214:web:36c7edbf043662c2580bf7",
  measurementId: "G-0FNQFYNJM1",
  databaseURL: 'https://dogdogcatcat-c5643-default-rtdb.asia-southeast1.firebasedatabase.app'
};

// Initialize Firebase app
export const firebase_app = initializeApp(firebaseConfig);

// Initialize Firebase Realtime Database
export const db = getDatabase(firebase_app);