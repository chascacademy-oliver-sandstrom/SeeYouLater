const express = require('express');
const router = express.Router();
const axios = require('axios');
const passport = require('passport');

const OMDB_API_KEY = process.env.MOVIEAPI_URL;

router.get('/search', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { s } = req.query;

  try {
    const response = await axios.get(`http://www.omdbapi.com/?s=${s}&type=&apikey=${OMDB_API_KEY}`);
    res.json(response.data);
  } catch (error) {
    console.error('Fel vid API-anrop:', error);
    res.status(500).json({ error: 'Något gick fel vid API-anropet' });
  }
});

module.exports = router;
