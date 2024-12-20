const express = require('express');
const router = express.Router();
const University = require('../models/University');

// GET all universities
router.get('/', async (req, res) => {
  try {
    const universities = await University.find();
    res.json(universities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new university
router.post('/', async (req, res) => {
  const university = new University({
    name: req.body.name,
    country: req.body.country,
  });

  try {
    const newUniversity = await university.save();
    res.status(201).json(newUniversity);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Additional routes for PUT and DELETE can be added similarly

module.exports = router;