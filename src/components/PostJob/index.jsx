import React from "react";
import { useState } from "react";
import Navbar from "../Navbar";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { writeData } from "./../../utils/firebase.js";



const PostJob = () => {
  const [company, setCompany] = useState("");
  const [logo, setLogo] = useState("");
  const [position, setPosition] = useState("");
  const [salary, setSalary] = useState("");
  const [experience, setExperience] = useState("");
  const [role, setRole] = useState("");
  const [location, setLocation] = useState("");

  const navigate = useNavigate();

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };
  const handleImg = (e) => {
    const file = e.target.files[0];
    getBase64(file).then((base64) => {
      localStorage["logo"] = base64;
      setLogo(base64);
    });
  };

  const handleSubmitButton = (e) => {
    e.preventDefault();

    if (!company) {
      window.alert("Enter name");
      return;
    }
    if (!position) {
      window.alert("Enter position");
      return;
    }
    if (!experience) {
      window.alert("Enter Experience");
      return;
    }
    if (!salary) {
      window.alert("Enter Salary");
      return;
    }

    const jobPost = {
      id: Date.now().toString(), 
      company,
      logo,
      position,
      salary,
      experience,
      role,
      location,
    };

    writeData(
      jobPost.id,
      jobPost.position,
      jobPost.logo,
      jobPost.company,
      jobPost.experience,
      jobPost.salary,
      jobPost.role,
      jobPost.location
    );

    window.alert("Form Submitted Successfully");
    navigate("/Jobs");
  };
  return (
    <div>
      <Navbar />

      <div className="job-background">

      </div>
      <div className="container">
        <header className="header">
          <h1 className="post-job">Wypełnij formularz </h1>
        </header>
        <form>
          <div className="form-group">
            <label id="name-label" htmlFor="name">
              Imię i nazwisko
            </label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Imię i nazwisko"
              onChange={(e) => setCompany(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label id="name-label" htmlFor="name">
              Lokalizacja korepetycji
            </label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Lokalizacja korepetycji"
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label id="logo-label" htmlFor="logo">
              Zdjęcie
            </label>
            <label>
              <input
                type="file"
                id="myFile"
                name="filename"
                onChange={handleImg}
                required
              />
            </label>
          </div>
          <div className="form-group">
            <label>Przedmiot korepetycji</label>
            <select
              id="dropdown"
              name="role"
              className="form-control"
              onChange={(e) => setPosition(e.target.value)}
              required
            >
              <option disabled selected value>
                Wybierz przedmiot 
              </option>
              <option>Matematyka</option>
              <option>Język Polski</option>
              <option>Historia</option>
              <option>Chemia</option>
              <option>Biologia</option>
              <option>Fizyka</option>
              <option>Informatyka</option>
              <option>Język Obcy</option>
              <option>Inne</option>
            </select>
          </div>
          <div className="form-group">
            <label id="name-label" htmlFor="name">
              Opis korepetycji
            </label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Opis"
              onChange={(e) => setRole(e.target.value)}
              required
            />
          </div>

          <div
            className="form-group"
            onChange={(e) => setExperience(e.target.value)}
          >
            <label>Szkoła </label>
            <label>
              <input
                name="user-recommend"
                value="Podstawówka"
                type="radio"
                className="input-radio"
              />
              Podstawówka
            </label>
            
            <label>
              <input
                name="user-recommend"
                value="Liceum"
                type="radio"
                className="input-radio"
              />
              Liceum
            </label>
            <label>
              <input
                name="user-recommend"
                value="Technikum"
                type="radio"
                className="input-radio"
              />
              Technikum
            </label>
            <label>
              <input
                name="user-recommend"
                value="Zawodówka"
                type="radio"
                className="input-radio"
              />
              Zawodówka
            </label>
          </div>


          <div className="form-group">
            <label id="name-label" htmlFor="name">
              Cena korepetycji
            </label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Cena"
              onChange={(e) => setSalary(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <button type="submit" className="submit-button" onClick={handleSubmitButton}>
              Gotowe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostJob;
