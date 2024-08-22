


import firebase from "firebase/compat/app";
import {getAuth} from "firebase/auth"
import "firebase/compat/firestore"
import "firebase/compat/auth"

//your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDYpnNiPGwKtrCNNCyJ8l7-ROQRK1jv1nM",
  authDomain: "clone-efb1b.firebaseapp.com",
  projectId: "clone-efb1b",
  storageBucket: "clone-efb1b.appspot.com",
  messagingSenderId: "964865817215",
  appId: "1:964865817215:web:e9fb500b6c9395b2c39d4a"
};
// initialize firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = app.firestore()




















