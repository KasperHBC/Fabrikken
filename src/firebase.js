
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC6vERmxxMUYIATK6gi8xZrQcIIT6EMhIg",
  authDomain: "fabrikken-a51cb.firebaseapp.com",
  projectId: "fabrikken-a51cb",
  storageBucket: "fabrikken-a51cb.firebasestorage.app",
  messagingSenderId: "318066863201",
  appId: "1:318066863201:web:ad490c2a7b6b1f19884e20"
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);

// Initialiser Firestore
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };