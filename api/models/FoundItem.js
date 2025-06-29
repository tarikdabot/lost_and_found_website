const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  Picture: {
    type: String,
    default:
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
  },
  itemName: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  ZipCode: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: false,
  },
  country: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  whereFound: {
    type: String,
    required: true,
  },
  whenFound: {
    type: String, // Changed to Date type to store the lost date
    required: true,
  },
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  phone: {
    type:Number, // Corrected to String
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("FoundItems", workoutSchema);
