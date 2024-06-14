//import logo from './logo.svg';
import React, { useEffect } from 'react';
import './App.css';
import Home from './components/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Jobs from './components/Jobs';
import SaveJobs from './components/SaveJobs';
import Login from './components/Login';
import { auth } from './firebase.js';


function App() {
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, print user info to console
        console.log('User info:', user);
      } else {
        // User is signed out
        console.log('No user is signed in.');
      }
    });

    // Clean up the observer on component unmount
    return () => unsubscribe();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/signin" element={<Login />} />
            <Route path="/saved-job" element={<SaveJobs />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
