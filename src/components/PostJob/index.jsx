import React, { useState } from "react";
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";
import { writeData, storage, storageRef, uploadString, getDownloadURL } from "./../../utils/firebase.js"; // Adjust the path as necessary
import "./index.css";

const PostJob = () => {
  const [company, setCompany] = useState("");
  const [logo, setLogo] = useState(null);
  const [position, setPosition] = useState("");
  const [salary, setSalary] = useState("");
  const [experience, setExperience] = useState("");
  const [role, setRole] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");

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
    setLogo(file);
  };

  const handleSubmitButton = async (e) => {
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

    const jobPostId = Date.now().toString(); // Generate a unique ID for the job post

    try {
      // Upload the logo to Firebase Storage
      let logoUrl = "";
      if (logo) {
        const storageReference = storageRef(storage, `logos/${jobPostId}`);
        const base64Logo = await getBase64(logo); // Await the base64 conversion
        await uploadString(storageReference, base64Logo, 'data_url');
        logoUrl = await getDownloadURL(storageReference);
      }

      // Save job post data to Realtime Database with the logo URL
      writeData(
        jobPostId,
        position,
        logoUrl,
        company,
        experience,
        salary,
        role,
        location,
        email
      );

      window.alert("Form Submitted Successfully");
      navigate("/Jobs");
    } catch (error) {
      console.error("Error uploading file or saving data: ", error);
      window.alert("Failed to submit the form. Please try again.");
    }
  };

  return (
    <div>
      <Navbar />

      <div className="job-background"></div>
      <div className="container">
        <header className="header">
          <h1 className="post-job">Wypełnij formularz</h1>
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
            <label id="name-label" htmlFor="name">
              Email
            </label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
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
