const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser"); // Import cookie-parser
const user_router = require("./routes/user-route");
const auth_router = require("./routes/auth-router");
const lostItemRoutes = require("./routes/lostitem");
const FoundItemRoutes = require("./routes/FoundItem");
const authRoutes = require("./routes/auth-router");
const  dashfounds = require("./routes/dashFoun")  

dotenv.config(); // Load environment variables from .env

// Connect to MongoDB
mongoose.connect(process.env.MONGO)
  .then(() => {
    console.log("MongoDB is connected");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB:", err);
  });

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',  // Allow requests from your React app's origin
}));
app.use(cookieParser()); // Use cookie-parser middleware

// Routes
app.use("/api/user", user_router);
app.use('/api/auth', authRoutes);
app.use('/api/lostitem', lostItemRoutes);
app.use('/api/founditem', FoundItemRoutes);
app.use("/api/auth", auth_router);
app.use("/api/founds",dashfounds)

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
  next();
});

// Start the server
app.listen(4000, () => {
  console.log("The server is listening on port 4000");
}); 