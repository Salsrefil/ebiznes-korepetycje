// src/FirebaseAuth.js
import React, { useEffect } from 'react';
import Navbar from "../Navbar";
import firebase from 'firebase/compat/app';
import 'firebase/auth';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import { auth } from '../../firebase.js';


const FirebaseAuth = () => {
  useEffect(() => {
    const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);
    ui.start('#firebaseui-auth-container', {
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ],
      signInSuccessUrl: '/',
    });
  }, []);

  return ( <>
        <Navbar />
  <div id="firebaseui-auth-container"></div>
  </>);
};

export default FirebaseAuth;
