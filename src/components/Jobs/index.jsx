import React, { useState } from "react";
import Navbar from "../Navbar";
import { Link } from "react-router-dom";
import "./index.css";
import Job from "./../../Assets/jobs.json";
import Filter from "../Filter";



const jobCategories = ["Podstawówka", "Liceum", "Technikum", "Zawodówka"];


const Jobs = () => {
  const JobData = JSON.parse(localStorage.getItem("item")) || [];
  const [filteredJobs, setFilteredJobs] = useState([...JobData, ...Job]);
  const [checkedState, setCheckedState] = useState(new Array(jobCategories.length).fill(false));

  const [active, setActive] = useState(false);
  function handleJobFilter(event) {
    const value = event.target.innerText;
    event.preventDefault();
    if (value === "Wszystkie") {
      setFilteredJobs([...JobData, ...Job]); 
    } else {
      setFilteredJobs(
        Job.filter((job) => job.subject === value)
      );
    }
  }
  function saveClick(id, logo, subject, school, location, description, cost) {
    window.localStorage.setItem(
      "Job",
      JSON.stringify(id, logo, subject, school, location, description,cost)
    );
    console.log(JobData);
  }

  function handleExperienceFilter(checkedState) {
    const selectedSchools = jobCategories.filter((category, index) => checkedState[index]);
    if (selectedSchools.length === 0) {
      setFilteredJobs([...JobData, ...Job]); 
    } else {
      const filtered = Job.filter((job) => selectedSchools.includes(job.school));
      setFilteredJobs(filtered);
    }
  }
  return (
    <>
      <Navbar />
      <div className="jobs-for-you">

        <div className="job-section">
          <div className="job-page">
            {filteredJobs.map(
              ({ id, logo, subject, school, location, description, role,cost }) => {
                return (
                  <div className="job-list">
                    <div className="job-card">
                      <div className="job-name">
                        <img
                          src={
                            logo.length > 20
                              ? logo
                              : require(`../../Assets/images/${logo}`)
                          }
                          alt="logo"
                          className="job-profile"
                        />
                        <div className="job-detail">
                          <h4>{subject}</h4>
                          <h3>{school}</h3>
                          <div className="category">
                            <p>{location}</p>
                          </div>
                        </div>
                      </div>
                      <div className="job-button">
                        <div className="job-posting">
                          <Link to="/saved-job"
                            onClick={() => {
                              saveClick(
                                {
                                  id,
                                  logo,
                                  subject,
                                  school,
                                  location,
                                  description,
                                  cost,
                                },
                                setActive(!active)
                              );
                            }}>Sprawdź ofertę</Link>
                        </div>
                        
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          </div>

          <Filter
            setFilteredJobs={setFilteredJobs}
            handleJobFilter={handleJobFilter}
            handleExperienceFilter={handleExperienceFilter}
          />
        </div>
      </div>
    </>
  );
};

export default Jobs;
