const express = require("express");
const {
    getFoundItems, // Corrected function name
    getFoundItem, // Corrected function name
    createFoundItem, // Corrected function name
    deleteFoundItem, // Corrected function name
    updateFoundItem, // Cormrected function name
} = require("../controller/FoundContoller");

const routers = express.Router();

// To get all workouts
routers.get("/ ", getFoundItems );
    // getLostItem );

// To get a single workout
routers.get("/:id", getFoundItem);

// To post a new workout
routers.post("/", createFoundItem);

// To delete a single workout
routers.delete("/:id", deleteFoundItem);

// To update a single workout
routers.patch("/:id", updateFoundItem);

module.exports = routers;
