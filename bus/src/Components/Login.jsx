import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaLock, FaUser } from "react-icons/fa";
import "./css/login.css";
import Signup from "./Signup";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting login form:", form);
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      console.log("Response from server:", data);

      if (response.ok) {
        setMessage(data.message);
        localStorage.setItem("token", data.token);
        setTimeout(() => navigate("/Mainpage"), 2000);
      } else {
        setMessage(data.error);
      }
    } catch (error) {
      console.error("Error submitting login:", error);
      setMessage("Something went wrong!");
    }
  };
  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit}>
        <h1>LOGIN</h1>
        <div className="input-box">
          <input type="email" name="email" placeholder="Enter your Email" onChange={handleChange} required />
          <FaUser className="icon" />
        </div>
        <div className="input-box">
          <input type="password" name="password" placeholder="Enter your Password" onChange={handleChange} required />
          <FaLock className="icon" />
        </div>
        <button type="submit">LOGIN</button>
        <p className="message">{message}</p>
        <div className="register-link">
          <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
        </div>
         <div className="register-link">
                  <p>Continue as <Link to="/Mainpage">Guest</Link></p>
                </div>
      </form>
    </div>
  );
};

export default Login;
