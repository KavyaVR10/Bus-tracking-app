import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Components/css/MainPage.css"
import { FaBus } from "react-icons/fa";

const Mainpage = () => {
  const [fromStation, setFromStation] = useState("");
  const [destination, setDestination] = useState("");
  const navigate = useNavigate();

  const locations = ["shollinganallur", "Adyar", "Guindy", "koyambedu", "Anna nagar"];

  const handleSearch = (e) => {
    e.preventDefault();

    if (!fromStation || !destination) {
      alert("Please select both From and Destination!");
      return;
    }

    navigate(`/results?from=${fromStation}&to=${destination}`);
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleSearch}>
        <h1>Travel Around</h1>
        <div className="input-box">
          <select value={fromStation} onChange={(e) => setFromStation(e.target.value)} required>
            <option value="">Select From Station</option>
            {locations.map((location, index) => (
              <option key={index} value={location}>
                {location}
              </option>
            ))}
          </select>
          <FaBus className="icon" />
        </div>
        <div className="input-box">
          <select value={destination} onChange={(e) => setDestination(e.target.value)} required>
            <option value="">Select Destination</option>
            {locations.map((location, index) => (
              <option key={index} value={location}>
                {location}
              </option>
            ))}
          </select>
          <FaBus className="icon" />
        </div>
        <button type="submit">Find Buses</button>
      </form>
    </div>
  );
};

export default Mainpage;
