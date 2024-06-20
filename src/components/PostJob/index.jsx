import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";
import { writeData, storage, storageRef, uploadString, getDownloadURL } from "./../../utils/firebase.js"; // Adjust the path as necessary
import useAuth from "../../useAuth"; 
import { initializeApp } from "firebase/app";
import { getCheckoutUrl } from "../../stripePayment.ts";
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
  const isAuthenticated = useAuth(); // Use the custom hook

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const handleFormSubmission = async (formData) => {
    const jobPostId = Date.now().toString(); // Generate a unique ID for the job post

    // Upload the logo to Firebase Storage
    let logoUrl = "";
    if (formData.logo) {
      const storageReference = storageRef(storage, `logos/${jobPostId}`);
      await uploadString(storageReference, formData.logo, 'data_url');
      logoUrl = await getDownloadURL(storageReference);
    }

    // Save job post data to Realtime Database with the logo URL
    writeData(
      jobPostId,
      formData.position,
      logoUrl,
      formData.company,
      formData.experience,
      formData.salary,
      formData.role,
      formData.location,
      formData.email
    );

    window.alert("Form Submitted Successfully");
    navigate("/Jobs");
  };

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      const storedFormData = localStorage.getItem("jobFormData");
      if (storedFormData) {
        const formData = JSON.parse(storedFormData);
        handleFormSubmission(formData);
        localStorage.removeItem("jobFormData"); // Clear stored data after submission
      }
    }
  }, []);

  if (!isAuthenticated) {
    return null; // Optionally render a loading indicator
  }

  const handleImg = async (e) => {
    const file = e.target.files[0];
    const base64Logo = await getBase64(file);
    setLogo(base64Logo); // Save the base64 string directly
  };

  const handleSubmitButton = async (e) => {
    e.preventDefault();

    if (!company || !position || !experience || !salary) {
      window.alert("Please fill out all required fields.");
      return;
    }

    // Save form data to local storage
    const formData = {
      company,
      position,
      experience,
      salary,
      role,
      location,
      email,
      logo,
    };
    localStorage.setItem("jobFormData", JSON.stringify(formData));

    const firebaseConfig = {
      apiKey: "AIzaSyBjybcFZ0BODY_UNWmqF-pciAHSzETdxSE",
      authDomain: "ebiznes-korepetycje.firebaseapp.com",
      projectId: "ebiznes-korepetycje",
      storageBucket: "ebiznes-korepetycje.appspot.com",
      messagingSenderId: "993251495624",
      appId: "1:993251495624:web:f282f4584f5a4cd1065ffd",
      measurementId: "G-D7NBB1Y122"
    };

    const appp = initializeApp(firebaseConfig);

    try {
      const priceId = "price_1PTn10CnHsDV8SNDxbmO5BVe";
      const checkoutUrl = await getCheckoutUrl(appp, priceId);
      window.location.href = checkoutUrl; // Redirect to Stripe Checkout
    } catch (error) {
      console.error("Error initiating Stripe Checkout: ", error);
      window.alert("Failed to initiate payment. Please try again.");
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
              value={company}
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
              value={location}
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
              value={position}
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
              value={role}
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
              value={salary}
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
              value={email}
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
