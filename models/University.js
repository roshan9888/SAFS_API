const mongoose = require('mongoose');

const UniversitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  country: String, // Optional: To categorize universities by country
});

module.exports = mongoose.model('University', UniversitySchema);