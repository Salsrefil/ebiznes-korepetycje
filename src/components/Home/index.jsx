import React from "react";
import Navbar from "../Navbar";
import { Link } from "react-router-dom";
import "./index.css";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="banner-img">
        <div className="title">
          <h3>
            Rozpocznij szukanie korepetycji!

          </h3>

        </div>
        <div className="button" data-testid="btn">
          <Link to="/Jobs">Szukaj korepetycji</Link>
        </div>
      </div>

      <div className="about-us">
        <h3>Jesteśmy największą platformą z korepetycjami w Polsce!</h3>
        <p>
          Z naszych usług skorzystało juz ponad 20 000 uczniów!
        </p>
      </div>


    </>
  );
};

export default Home;
