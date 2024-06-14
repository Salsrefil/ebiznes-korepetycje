// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBjybcFZ0BODY_UNWmqF-pciAHSzETdxSE",
  authDomain: "ebiznes-korepetycje.firebaseapp.com",
  projectId: "ebiznes-korepetycje",
  storageBucket: "ebiznes-korepetycje.appspot.com",
  messagingSenderId: "993251495624",
  appId: "1:993251495624:web:f282f4584f5a4cd1065ffd",
  measurementId: "G-D7NBB1Y122"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);