import firebase from 'firebase/app'
//import {auth} from 'firebase/auth'

// Your web app's Firebase configurationz
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
var app = null
if (!firebase.apps.length) {
  app = firebase.initializeApp({});
}else {
  app = firebase.app(); // if already initialized, use that one
}
