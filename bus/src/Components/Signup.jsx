import React, { useState } from "react";
import "./css/signup.css";
import { Link, useNavigate } from "react-router-dom";
import "../Components/css/Login.css";
import { FaUser, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Mainpage from "./MainPage";
import Login from "./Login";

const Signup = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await response.json();
    if (response.ok) {
      setMessage(data.message);
      setTimeout(() => navigate("/Mainpage"), 2000); 
    } else {
      setMessage(data.error);
    }
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit}>
        <h1>SIGNUP</h1>

        <div className="input-box">
          <input type="text" name="username" placeholder="Enter your Username" onChange={handleChange} required />
          <FaUser className="icon" />
        </div>

        <div className="input-box">
          <input type="email" name="email" placeholder="Enter your Email" onChange={handleChange} required />
          <MdEmail className="icon" />
        </div>

        <div className="input-box">
          <input type="password" name="password" placeholder="Enter your password" onChange={handleChange} required />
          <FaLock className="icon" />
        </div>

        <div className="input-box">
          <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} required />
          <FaLock className="icon" />
        </div>

        <button type="submit">SUBMIT</button>
        <p className="message">{message}</p>

        <div className="register-link">
          <p>Already have an Account? <Link to="/">Login</Link></p>
        </div>

        <div className="register-link">
          <p>Continue as <Link to="/Mainpage">Guest</Link></p>
        </div>
      </form>
    </div>
  );
};

export default Signup;
