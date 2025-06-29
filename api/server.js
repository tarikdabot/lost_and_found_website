const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const user_router = require("./routes/user-route.js");
const auth_router = require("./routes/auth-router.js");
const axios = require("axios"); // Import Axios

dotenv.config(); // Load environment variables from .env

// Connect to MongoDB
mongoose.connect(process.env.MONGO)
    .then(() => {
        console.log("MongoDB is connected");
        console.log("the MongoDB URL:", process.env.MONGO);
    })
    .catch((err) => {
        console.log("Error is:", err);
    });

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',  // Allow requests from your React app's origin
  }));
// Example route to make an external API call using Axios
app.post("/api/external-data", async (req, res) => {
    try {
        // Example external API call
        const response = await axios.get("https://api.example.com/data");

        // Sending the response from the external API back to the client
        res.status(200).json(response.data);
    } catch (error) {
        console.error("Error fetching data from external API:", error);
        res.status(500).json({ success: false, message: "Error fetching external data" });
    }
});

// Start the server
app.listen(4000, () => {
    console.log("The server is listening on port 4000");
});

app.use("/api/user", user_router);
app.use("/api/auth", auth_router);

// Error handling middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error";
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});
