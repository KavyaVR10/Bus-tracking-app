import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import "../Components/css/BusAnimation.css"; // Import CSS

const BusAnimation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bus = location.state;
  const [stations, setStations] = useState([]);

  useEffect(() => {
    if (bus?.busName) {
      fetchStations(bus.busName);
    }
  }, [bus]);

  const fetchStations = async (busName) => {
    try {
      const encodedBusName = encodeURIComponent(busName.trim());
      const response = await fetch(`http://localhost:5000/bus/${encodedBusName}/stations`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setStations(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching stations:", error);
    }
  };

  if (!bus) {
    return <p className="error-message">No bus details available.</p>;
  }

  return (
    <div className="route-container">
      <h2>Bus Route</h2>
      <div className="route-line">
        {stations.map((station, index) => (
          <div key={index} className="station">
            <p>{station}</p>
          </div>
        ))}
      </div>
      <button
       onClick={() => navigate(`/bus-booking/${bus._id}`, { state: bus })}
        className="return-button"
      >
        Return to Bus Booking
      </button>
    </div>
  );
};

export default BusAnimation;
