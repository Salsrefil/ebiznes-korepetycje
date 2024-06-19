import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import "./index.css";
import { storage, getDownloadURL, storageRef } from "./../../utils/firebase.js";


const SaveJobs = () => {
  const [jobs, setJobs] = useState([]);



  useEffect(() => {
    const savedJob = JSON.parse(localStorage.getItem("Job"));
    if (savedJob && savedJob.logo) {
      fetchLogoUrl(savedJob.logo).then((logoUrl) => {
        savedJob.logoUrl = logoUrl;
        setJobs([savedJob]);
      });
    }
  }, []);

  const fetchLogoUrl = async (logoPath) => {
    try {
      const logoRef = storageRef(storage, `logos/${logoPath}`);
      const logoUrl = await getDownloadURL(logoRef);
      return logoUrl;
    } catch (error) {
      console.error("Error fetching logo URL:", error);
      return "";
    }
  };

  return (
    <div>
      <Navbar />
      <div className="tutor-for-you">

        <div className="tutor-section">
          <div className="tutor-page">
            {jobs.map(({ logo, subject, school, location, tutor, description,cost, email }) => {
              return (
                <div className="tutor-list">
                  <div className="tutor-card">
                    <div className="tutor-name">
                      <img
                       src={logo || require(`../../Assets/images/default.png`)}
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
                    <div className="tutor-contact">
                      <h4>Contact Information</h4>
                      <p>Email: {email}</p>
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
