const Workout = require('../models/FoundItem')
const mongoose = require('mongoose');

// Get all lost items
const getFoundItems = async (req, res) => {
  const totalFoundItems = await Workout.countDocuments();
    res.status(200).json({"totalFound": totalFoundItems});
};

// Get a single lost item by ID
const getFoundItem = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such workouts found' });
  }

  const workout = await Workout.findById(id);
  if (!workout) {
    return res.status(404).json({ error: 'No such workout' });
  }

  res.status(200).json(workout);
};

// create a new workout
const createFoundItem = async (req, res) => {
  const { Picture, itemName, category, isAdmin, whenFound, whereFound, country, city, brand, ZipCode, fname, lname, phone, email } = req.body;
 
  
 

  // Validate required fields
  const requiredFields = {  Picture, itemName, category, isAdmin, whenFound, whereFound, country, city, brand, ZipCode, fname, lname, phone, email };
  const emptyFields = Object.keys(requiredFields).filter((field) => !requiredFields[field]);

  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all fields', emptyFields });
  }

  // Ensure Picture is a string and set default if necessary
  const pictureUrl = typeof Picture === "string" && Picture.trim()
    ? Picture
    : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';

  // Add to the database
  try {
    const workout = await Workout.create({
      Picture: pictureUrl,
       itemName, category, isAdmin, whenFound, whereFound, country, city, brand, ZipCode, fname, lname, phone, email
    });
    res.status(200).json(workout);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

// Delete a lost item
const deleteFoundItem = async (req, res) => {
  const { id } = req.params;
  const { isAdmin } = req.body;

  if (!isAdmin) {
    return res.status(403).json({ error: 'You cannot delete the item' });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'No such item' });
  }

  const workout = await Workout.findOneAndDelete({ _id: id });
  if (!workout) {
    return res.status(404).json({ error: 'No such item' });
  }

  res.status(200).json(workout);
};

// Update a lost item
const updateFoundItem = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'No such workout' });
  }

  const workout = await Workout.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true });
  if (!workout) {
    return res.status(404).json({ error: 'No such workout' });
  }

  res.status(200).json(workout);
};

module.exports = {
  getFoundItems,
  getFoundItem,
  createFoundItem,
  deleteFoundItem,
  updateFoundItem
}