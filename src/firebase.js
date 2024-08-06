



//api = http://127.0.0.1:5001/new-290a3/us-central1/api).




import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; // Import Firestore

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBEH5X8yYlVVk4iYrJ-Xtg4gAekGka6q8E",
  authDomain: "new-290a3.firebaseapp.com",
  projectId: "new-290a3",
  storageBucket: "new-290a3.appspot.com",
  messagingSenderId: "133892931202",
  appId: "1:133892931202:web:353bc58c0017a2172dfe9b",
  measurementId: "G-VTSN8SR4XE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // Initialize Firestore

export { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, db };
