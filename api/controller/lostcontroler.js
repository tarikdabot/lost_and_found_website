const Workout = require('../models/lost-item.js');
const mongoose = require('mongoose');

// Get all lost items
const getLostItems = async (req, res) => {
  const workouts = await Workout.countDocuments();
  console.log(workouts);
    res.status(200).json({'totalLost':workouts});
};

// Get a single lost item by ID
const getLostItem = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such workout' });
  }

  const workout = await Workout.findById(id);
  if (!workout) {
    return res.status(404).json({ error: 'No such workout' });
  }

  res.status(200).json(workout);
};

// Create a new lost item
const createLostItem = async (req, res) => {
  const {
    Picture,
    itemName,
    category,
    isAdmin,
    whenLost,
    whereLost,
    country,
    city,
    brand,
    ZipCode,
    fname,
    lname,
    phone,
    email
  } = req.body;

  // Validate required fields
  const requiredFields = { Picture, itemName, category, country, city, whereLost, ZipCode, whenLost, fname, lname, phone, email };
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
      itemName,
      isAdmin,
      category,
      whenLost,
      whereLost,
      country,
      city,
      brand,
      ZipCode,
      fname,
      lname,
      phone,
      email
    });
    res.status(200).json(workout);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

// Delete a lost item
const deleteLostItem = async (req, res) => {
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
const updateLostItem = async (req, res) => {
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
  getLostItems,
  getLostItem,
  createLostItem,
  deleteLostItem,
  updateLostItem
};
