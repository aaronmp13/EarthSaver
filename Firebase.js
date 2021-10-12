// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged, FacebookAuthProvider, signInWithCredential } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC4uqFjdWJMXusw3jD4Eab4lmtrC4yux7U",
  authDomain: "earthsaver-6318e.firebaseapp.com",
  projectId: "earthsaver-6318e",
  storageBucket: "earthsaver-6318e.appspot.com",
  messagingSenderId: "287401073940",
  appId: "1:287401073940:web:aacf543269007657653601",
  measurementId: "G-TNYYCBPNGC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);