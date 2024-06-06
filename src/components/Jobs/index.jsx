import React, { useState, useEffect} from "react";
import Navbar from "../Navbar";
import { Link } from "react-router-dom";
import "./index.css";
import Job from "./../../Assets/tutors.json";
import Filter from "../Filter";


const experienceCategories = ["Podstawówka", "Liceum", "Technikum", "Zawodówka"];
const subjectCategories = ["Wszystkie", "Matematyka", "Język Polski", "Historia", "Chemia", "Biologia", "Fizyka", "Informatyka", "Język Obcy", "Inne"];

const Tutors = () => {
  const [active, setActive] = useState(false);

  const JobData = JSON.parse(localStorage.getItem("item")) || [];
  const [filteredJobs, setFilteredJobs] = useState([...JobData, ...Job]);
  const [checkedState, setCheckedState] = useState(new Array(experienceCategories.length).fill(false));
  const [selectedSubject, setSelectedSubject] = useState("Wszystkie");

  useEffect(() => {
    const filtered = combinedFilter([...JobData, ...Job], selectedSubject, checkedState);
    setFilteredJobs(filtered);
  }, [selectedSubject, checkedState]);

  const combinedFilter = (tutors, subject, checkedState) => {
    let filtered = subject === "Wszystkie" ? tutors : tutors.filter((job) => job.subject === subject);

    const selectedSchools = experienceCategories.filter((category, index) => checkedState[index]);
    if (selectedSchools.length > 0) {
      filtered = filtered.filter((job) => selectedSchools.includes(job.school));
    }

    return filtered;
  };

  const handleTutorFilter = (event) => {
    const value = event.target.innerText;
    event.preventDefault();
    setSelectedSubject(value);
  };

  const handleExperienceFilter = (updatedCheckedState) => {
    setCheckedState(updatedCheckedState);
  };

  const saveClick = (id, logo, subject, school, location,tutor, description, cost) => {
    window.localStorage.setItem(
      "Job",
      JSON.stringify({ id, logo, subject, school, location,tutor, description, cost })
    );
    console.log(JobData);
  };

  return (
    <>
      <Navbar />
      <div className="tutor-for-you">
        <div className="tutor-section">
          <div className="tutor-page">
            {filteredJobs.map(
              ({ id, logo, subject, school, location, description, tutor, cost }) => {
                return (
                  <div className="tutor-list" key={id}>
                    <div className="tutor-card">
                      <div className="tutor-name">
                        <img
                          src={
                            logo.length > 20
                              ? logo
                              : require(`../../Assets/images/${logo}`)
                          }
                          alt="logo"
                          className="tutor-profile"
                        />
                        <div className="tutor-detail">
                          <h4>{subject}</h4>
                          <h3>{tutor}</h3>
                          <h5>{school}</h5>
                          <div className="category">
                            <p>{location}</p>
                            <p>{cost} zł/h</p>
                          </div>
                        </div>
                      </div>
                      <div className="tutor-button">
                        <div className="tutor-posting">
                          <Link to="/saved-tutor"
                            onClick={() => {
                              saveClick(id, logo, subject, school, location,tutor, description, cost);
                              setActive(!active);
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
            handleTutorFilter={handleTutorFilter}
            handleExperienceFilter={handleExperienceFilter}
            checkedState={checkedState}
          />
        </div>
      </div>
    </>
  );
};

export default Tutors;