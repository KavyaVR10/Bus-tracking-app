import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
      <h1 className="heading">Bus Booking</h1>
      <div className="bus-details-card">
        <h2 className="bus-name">{bus.busName}</h2>
        <p><strong>Route:</strong> {bus.fromStation} → {bus.destination}</p>
        {bus.schedule && (
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
        )}
      </div>

      <button className="payment-button" onClick={() => navigate("/payment")}>
  Proceed to Payment
</button>
    </div>
  );
};

export default BusBooking;
