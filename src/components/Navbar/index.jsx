import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "./index.css";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [auth]);

  const handleLogout = () => {
    auth.signOut().then(() => {
      setIsLoggedIn(false);
    });
  };

  return (
    <div className="main-page">
      <nav id="navbar">
        <h1 className="logo">
          Korki<span>.pl</span>
        </h1>
        <ul>
          <li>
            <Link to="/home">Strona Główna</Link>
          </li>
          <li>
            <Link to="/jobs">Ogłoszenia korepetycji</Link>
          </li>
          <li>
            <Link to="/post-tutoring">Wystaw ogłoszenie</Link>
          </li>
          {isLoggedIn ? (
            <li>
              <Link to="/" onClick={handleLogout}>Wyloguj</Link>
            </li>
          ) : (
            <li>
              <Link to="/signin">Logowanie/Rejestracja</Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
