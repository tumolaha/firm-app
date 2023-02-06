// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { FacebookAuthProvider, getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyD6ZORUYmxcKSWB90V9UC7zvYIV2QmuJdI',
    authDomain: 'movie-app-d63fe.firebaseapp.com',
    databaseURL: 'https://movie-app-d63fe-default-rtdb.asia-southeast1.firebasedatabase.app',
    projectId: 'movie-app-d63fe',
    storageBucket: 'movie-app-d63fe.appspot.com',
    messagingSenderId: '423101826976',
    appId: '1:423101826976:web:a7d946d08be41ec4a206c5',
    measurementId: 'G-CPN5BFSCVE',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const db =  getFirestore(app)
auth.languageCode = 'it';

const googleAuthProvider = new GoogleAuthProvider();
const facebookAuthProvider = new FacebookAuthProvider();

export { auth, db, googleAuthProvider, facebookAuthProvider };
