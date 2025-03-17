import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import "../Components/css/BusBooking.css";

const BusBooking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bus = location.state;

  if (!bus) {
    return <p className="error-message">No bus details available.</p>;
  }

  return (
    <div className="bus-booking-container">
       <button onClick={() => navigate("/Mainpage")} className="back-button">
                <FaArrowLeft className="mr-2" /> Back to Search
              </button>
      <h1 className="heading">Bus Booking</h1>
      <div className="bus-details-card">
        <h2 className="bus-name">{bus.busName}</h2>
        <p><strong>Route:</strong> {bus.fromStation} → {bus.destination}</p>
        {bus.schedule && bus.schedule.length > 0 ? (
          <div>
            <h3>Schedule:</h3>
            <ul>
              {bus.schedule.map((sch, index) => (
                <li key={index}>
                  {sch.departureTime} - {sch.arrivalTime} ({sch.days.join(", ")})
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>No schedule available.</p>
        )}
      </div>

      <div className="button-container">
        <button
          className="route-button"
          onClick={() => navigate(`/bus-route/${bus.id}`, { state: bus })}
        >
          View Route
        </button>

        <button
          className="payment-button"
          onClick={() => navigate("/payment")}
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default BusBooking;
