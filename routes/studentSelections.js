const express = require('express');
const router = express.Router();
const StudentSelection = require('../models/StudentSelection');
const University = require('../models/University');
const Bank = require('../models/Bank');


router.post('/:studentId/selections', async (req, res) => {
  const { studentId } = req.params;
  const { selections } = req.body; // selections: [{ universityId, bankIds: [] }, ...]

  try {
    // Validate universities and banks
    for (const sel of selections) {
      const uni = await University.findById(sel.universityId);
      if (!uni) {
        return res.status(400).json({ message: `University ID ${sel.universityId} not found.` });
      }
      sel.universityName = uni.name; // Store the university name
      console.log("sel.universityName", sel.universityName);
      for (const bankId of sel.bankIds) {
        const bank = await Bank.findById(bankId);
        if (!bank) {
          return res.status(400).json({ message: `Bank ID ${bankId} not found.` });
        }
        // Store the bank name
        if (!sel.banks) sel.banks = [];
        sel.banks.push({ bankId, bankName: bank.name });
      }
    }

    // Upsert student selection
    let studentSelection = await StudentSelection.findOne({ studentId });
    if (!studentSelection) {
      studentSelection = new StudentSelection({ studentId, selections: [] });
    }

    // Update selections
    selections.forEach(sel => {
      const existingSel = studentSelection.selections.find(s => s.university.toString() === sel.universityId);
      if (existingSel) {
        existingSel.banks = sel.banks;
      } else {
        studentSelection.selections.push({

          university: sel.universityId,
          universityName: sel.universityName,
          banks: sel.banks,
        });
      }
    });

    const updatedSelection = await studentSelection.save();
    res.json(updatedSelection);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:studentId/selections', async (req, res) => {
  const { studentId } = req.params;

  try {
    const studentSelection = await StudentSelection.findOne({ studentId });
    if (!studentSelection) {
      return res.status(404).json({ message: 'Student selections not found.' });
    }
    res.json(studentSelection);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// DELETE a specific selection
router.delete('/:studentId/selections/:selectionId', async (req, res) => {
  const { studentId, selectionId } = req.params;

  try {
    // Find the student selection
    const studentSelection = await StudentSelection.findOne({ studentId });
    if (!studentSelection) {
      return res.status(404).json({ message: 'Student selections not found.' });
    }

    // Find the selection to be deleted
    const selection = studentSelection.selections.id(selectionId);
    if (!selection) {
      return res.status(404).json({ message: 'Selection not found.' });
    }

    // Remove the selection
    studentSelection.selections = studentSelection.selections.filter(
      (sel) => sel._id.toString() !== selectionId
    );
    await studentSelection.save();

    // Respond with a success message
    res.json({ message: 'Selection removed.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;