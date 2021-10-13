import firebase from 'firebase/app'
import 'firebase/auth';

// Your web app's Firebase configurationz
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC4uqFjdWJMXusw3jD4Eab4lmtrC4yux7U",
  authDomain: "earthsaver-6318e.firebaseapp.com",
  projectId: "earthsaver-6318e",
  storageBucket: "earthsaver-6318e.appspot.com",
  messagingSenderId: "287401073940",
  appId: "1:287401073940:web:e9328cb3951d1465653601",
  measurementId: "G-0JCWE0S3FP"
};

// Initialize Firebase
let Firebase;
if (!firebase.apps.length) {
  Firebase = firebase.initializeApp(firebaseConfig);
}else {
  Firebase = firebase.app(); // if already initialized, use that one
}

export default Firebase