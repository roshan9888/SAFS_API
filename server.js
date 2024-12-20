// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const universityRoutes = require('./routes/universities');
const bankRoutes = require('./routes/banks');
const userRoutes = require('./routes/user');
const auth = require('./Router/user');
const studentSelectionRoutes = require('./routes/studentSelections');

app.use('/universities', universityRoutes);
app.use('/banks', bankRoutes);
app.use('/auth', auth);
app.use('/user', userRoutes);
app.use('/students', studentSelectionRoutes);

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch(err => {
  console.error('MongoDB connection error:', err);
});
