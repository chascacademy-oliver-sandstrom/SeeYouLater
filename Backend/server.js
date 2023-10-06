require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('./config/passport');
const bodyParser = require('body-parser'); 

const app = express(); // Create an express instance 

const MONGODB_URL = process.env.MONGODB_URL;
mongoose.connect(MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB', err);
  });

app.use(passport.initialize());

app.use(bodyParser.json());

app.use(cors());

app.use('/api', require('./routes/auth'));
app.use('/api', require('./routes/api'));
app.use('/api/watchlist', require('./routes/watchlist'));

app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({ message: 'Something went wrong.' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
