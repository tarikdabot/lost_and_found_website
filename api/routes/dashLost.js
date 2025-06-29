const express = require("express");
const {
    getLostItems, // Corrected function name
    getLostItem, // Corrected function name
    createLostItem, // Corrected function name
    deleteLostItem, // Corrected function name
    updateLostItem, // Cormrected function name
} = require("../controller/lostcontroler");

const routers = express.Router();

// To get all workouts
routers.get("/dashgetLost", getLostItems );
    // getLostItem );

// To get a single workout
routers.get("/:id", getLostItem);

// To post a new workout
routers.post("/", createLostItem);

// To delete a single workout
routers.delete("/:id", deleteLostItem);

// To update a single workout
routers.patch("/:id", updateLostItem);

module.exports = routers;
