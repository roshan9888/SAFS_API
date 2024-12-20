const mongoose = require('mongoose');

const studentSelectionSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  selections: [
    {
      university: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'University',
        required: true,
      },
      universityName: {
        type: String,
        required: true, // To store the university name
      },
      banks: [
        {
          bankId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Bank',
            required: true,
          },
          bankName: {
            type: String,
            required: true, // To store the bank name
          },
        },
      ],
    },
  ],
});

module.exports = mongoose.model('StudentSelection', studentSelectionSchema);
