import React, { useState } from "react";
import Navbar from "../Navbar";
import "./index.css";


const SaveJobs = () => {
  const jobs = [JSON.parse(localStorage.getItem("Job"))];
  return (
    <div>
      <Navbar />
      <div className="tutor-for-you">

        <div className="tutor-section">
          <div className="tutor-page">
            {jobs.map(({ logo, subject, school, location, tutor, description,cost }) => {
              return (
                <div className="tutor-list">
                  <div className="tutor-card">
                    <div className="tutor-name">
                      <img
                        src={require(`../../Assets/images/${logo}`)}
                        alt="logo"
                        className="tutor-profile"
                      />
                      <div className="tutor-detail">
                        <h4>{subject}</h4>
                        <h3>{tutor}</h3>
                        <h5>{school}</h5>
                        <p>{description}</p>
                        <div className="category">
                          <p>{location}</p>
                          <p>{cost} zł/h</p>
                        </div>
                      </div>
                    </div>
                    <div className="tutor-posting">
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaveJobs;
