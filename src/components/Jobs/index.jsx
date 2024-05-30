import React, { useState } from "react";
import Navbar from "../Navbar";
import { Link } from "react-router-dom";
import "./index.css";
import Job from "./../../Assets/jobs.json";
import Filter from "../Filter";

const experience = [
  { min: 0, max: 1 },
  { min: 2, max: 3 },
  { min: 4, max: 5 },
  { min: 5, max: 10 },
];

const Jobs = () => {
  const JobData = JSON.parse(localStorage.getItem("item")) || [];
  const [filteredJobs, setFilteredJobs] = useState([...JobData, ...Job]);
  const [active, setActive] = useState(false);
  function handleJobFilter(event) {
    const value = event.target.innerText;
    event.preventDefault();
    setFilteredJobs(
      Job.filter((job) => {
        return job.role === value;
      })
    );
  }
  function saveClick(id, logo, subject, school, location, description, cost) {
    window.localStorage.setItem(
      "Job",
      JSON.stringify(id, logo, subject, school, location, description,cost)
    );
    console.log(JobData);
  }

  function handleExperienceFilter(checkedState) {
    let filters = [];
    checkedState.forEach((item, index) => {
      if (item === true) {
        const filterS = Job.filter((job) => {
          return (
            job.experience >= experience[index].min &&
            job.experience <= experience[index].max
          );
        });
        filters = [...filters, ...filterS];
      }
      setFilteredJobs(filters);
    });
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
                            <p>{role}</p>
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
