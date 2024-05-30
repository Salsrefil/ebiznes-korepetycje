import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

const Navbar = () => {
  return (
    <>
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
              <Link to="/post-job">Wystaw ogłoszenie</Link>
            </li>
            <li>
              <Link to="/saved-job">Logowanie/Rejestracja</Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
