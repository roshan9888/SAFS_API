// seed.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const University = require('./models/University');
const Bank = require('./models/Bank');

dotenv.config();

const {MONGODB_URI}=process.env;

const universities = [
  "Harvard University",
  "Stanford University",
  "Massachusetts Institute of Technology (MIT)",
  "University of California, Berkeley",
  "Princeton University",
  "Columbia University",
  "Yale University",
  "University of Chicago",
  "University of Pennsylvania",
  "California Institute of Technology",
  "Monash University, Australia",
  "UNSW, Australia",
  "TU Munich, Germany",
  "University of Europe for Applied Sciences, Germany",
  "NUS, Singapore",
  "University of Toronto, Canada",
  "Brock University, Canada",
  "Kingston University, UK",
  "University of Leeds, UK",
  "Trinity College Dublin, Ireland"
];

const banks = [
  "State Bank of India (SBI)",
  "Credila",
  "Avanse",
  "ICICI Bank",
  "Axis Bank",
  "Union Bank of India",
  "Mpower Financing"
];

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('Connected to MongoDB for seeding');

  // Clear existing data
  await University.deleteMany({});
  await Bank.deleteMany({});

  // Insert universities
  const universityDocs = universities.map(name => ({ name }));
  await University.insertMany(universityDocs);
  console.log('Universities seeded');

  // Insert banks
  const bankDocs = banks.map(name => ({ name }));
  await Bank.insertMany(bankDocs);
  console.log('Banks seeded');

  mongoose.disconnect();
})
.catch(err => {
  console.error('Seeding error:', err);
});
