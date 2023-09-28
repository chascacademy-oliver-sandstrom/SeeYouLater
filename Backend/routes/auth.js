const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const router = express.Router();

router.post('/register', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    console.log("Raw password:", password); 
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log("Hashed password:", hashedPassword); 

    const user = new User({ username, password: hashedPassword });
    await user.save();

    res.json({ message: 'User has registered' });
  } catch (err) {
    console.error("Error saving user:", err);
    next(err);
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      console.error("User not found");
      return res.status(401).json({ message: 'Failed to login' });
    }

    console.log("Raw password for login:", password), user.password; 
    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log("Password comparison result:", passwordMatch, user.password); 

    if (!passwordMatch) {
      console.error("Incorrect password");
      return res.status(401).json({ message: 'Failed to login' });
    }

    const token = jwt.sign({ user }, process.env.SECRET_KEY);
    console.log("JWT-token:", token);
    console.log("User logged in successfully:", user.username);
    return res.json({ token });
  } catch (error) {
    console.error("Error during authentication:", error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});


module.exports = router;
