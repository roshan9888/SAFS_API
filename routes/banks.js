const express = require('express');
const router = express.Router();
const Bank = require('../models/Bank');

// GET all banks
router.get('/', async (req, res) => {
  try {
    const banks = await Bank.find();
    res.json(banks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new bank
router.post('/', async (req, res) => {
  const bank = new Bank({
    name: req.body.name,
    country: req.body.country,
  });

  try {
    const newBank = await bank.save();
    res.status(201).json(newBank);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Additional routes for PUT and DELETE can be added similarly

module.exports = router;