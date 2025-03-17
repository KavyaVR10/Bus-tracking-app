const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Connection Error:", err));


const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});
const User = mongoose.model("User", UserSchema, "Users");

const BusSchema = new mongoose.Schema({
  busName: String,
  fromStation: String,
  destination: String,
  schedule: [
    { departureTime: String, arrivalTime: String, days: [String] }
  ],
  stations: [String],  // Array of in-between stations
});

const Bus = mongoose.model("Bus", BusSchema, "Buses");

app.post("/signup", async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) return res.status(400).json({ error: "Passwords do not match" });

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User Registered Successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error Registering User" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("🔹 Login request received:", email);

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found:", email);
      return res.status(400).json({ error: "User not found" });
    }

    console.log("User found:", user);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log(" Password Match Status:", isMatch);

    if (!isMatch) {
      console.log("Incorrect password for:", email);
      return res.status(400).json({ error: "Invalid credentials" });
    }


    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: "1h" });


    console.log("Token Generated:", token);

    res.json({ message: "Login Successful", token });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: "Login Error" });
  }
});



app.get("/getBuses", async (req, res) => {
  const { from, to } = req.query;
  try {
    const buses = await Bus.find({
      fromStation: { $regex: new RegExp(`^${from}$`, "i") },
      destination: { $regex: new RegExp(`^${to}$`, "i") },
    });
    res.json(buses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bus data", error });
  }
});
app.get("/bus/:name/stations", async (req, res) => {
  try {
    const busName = req.params.name.trim();
    console.log("Received request for bus:", busName); // Debugging log

    const bus = await Bus.findOne({ busName: busName }); // Use busName instead of _id

    if (!bus) {
      return res.status(404).json({ message: "Bus not found" });
    }

    res.json(bus.stations); // Return the stations array
  } catch (error) {
    console.error("Error fetching stations:", error);
    res.status(500).json({ message: "Error fetching stations", error });
  }
});




app.post("/payment", (req, res) => {
  res.json({ message: "Payment Successful" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
