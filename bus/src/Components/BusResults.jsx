import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaBusAlt, FaArrowLeft } from "react-icons/fa";
import "../Components/css/BusResults.css";

const BusResults = () => {
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const from = params.get("from");
  const to = params.get("to");

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        if (!from || !to) return;
        const response = await fetch(`http://localhost:5000/getBuses?from=${from}&to=${to}`);
        const data = await response.json();
        setBuses(data);
      } catch (error) {
        console.error("Error fetching buses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBuses();
  }, [from, to]);

  return (
    <div className="bus-results-container">
      <div className="bus-results-wrapper">
        <button onClick={() => navigate("/Mainpage")} className="back-button">
          <FaArrowLeft className="mr-2" /> Back to Search
        </button>

        <h1 className="heading">Available Buses</h1>

        {loading ? (
          <p className="text-center">Loading buses...</p>
        ) : buses.length === 0 ? (
          <p className="text-center text-red-500">No buses found.</p>
        ) : (
          <div className="bus-list">
            {buses.map((bus) => (
              <div
                key={bus._id}
                className="bus-card"
                onClick={() => navigate(`/bus-booking/${bus._id}`, { state: bus })}
              >
                <FaBusAlt className="bus-icon" />
                <div className="bus-info">
                  <h2 className="bus-name">{bus.busName}</h2>
                  <p className="bus-details">
                    <strong>Route:</strong> {bus.fromStation} → {bus.destination}
                  </p>

                  <div className="bus-schedule">
                    <h3 className="schedule-title">Schedule:</h3>
                    {bus.schedule && bus.schedule.length > 0 ? (
                      <ul>
                        {bus.schedule.map((schedule, index) => (
                          <li key={index} className="bus-details">
                            <strong>{schedule.departureTime} - {schedule.arrivalTime}</strong>
                            <br />
                            <span>Days: {schedule.days.join(", ")}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>No schedule available</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BusResults;
