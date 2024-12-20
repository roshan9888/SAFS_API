const mongoose = require('mongoose');

const BankSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  country: String, // Optional: To categorize banks by country
});

module.exports = mongoose.model('Bank', BankSchema);