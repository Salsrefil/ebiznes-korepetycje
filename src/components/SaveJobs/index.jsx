import React, { useState } from "react";
import Navbar from "../Navbar";

const SaveJobs = () => {
  const jobs = [JSON.parse(localStorage.getItem("Job"))];
  return (
    <div>
      <Navbar />
      <div className="jobs-for-you">

        <div className="job-section">
          <div className="job-page">
            {jobs.map(({ logo, subject, school, location, role, description,cost }) => {
              return (
                <div className="job-list">
                  <div className="job-card">
                    <div className="job-name">
                      <img
                        src={require(`../../Assets/images/${logo}`)}
                        alt="logo"
                        className="job-profile"
                      />
                      <div className="job-detail">
                        <h4>{subject}</h4>
                        <h3>{school}</h3>
                        <p>{description}</p>
                        <div className="category">
                          <p>{location}</p>
                          <p>{role}</p>
                          <p>{cost} zł/h</p>
                        </div>
                      </div>
                    </div>
                    <div className="job-posting">
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
