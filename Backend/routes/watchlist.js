const express = require('express');
const router = express.Router();
const passport = require('passport');
const WatchlistItem = require('../models/watchlistItem');

const requireAuth = passport.authenticate('jwt', { session: false });

router.get('/', requireAuth, async (req, res) => {
    try {

        const userId = req.user._id;
        const watchlist = await WatchlistItem.find({ user: userId });
        res.json(watchlist);
    } catch (error) {
        console.error('Error fetching watchlist');
        res.status(500).json({ error: 'something went wrong' });
    }
});
 
router.post('/add', requireAuth, async (req, res) => {
    try {
        const { title, year, poster } = req.body;
        const userId = req.user._id; // Hämta användar-ID från JWT-token
        const watchlistItem = new WatchlistItem({
            title,
            year,
            poster,
            user: userId, // Använd användar-ID från JWT-token
        });

        await watchlistItem.save();
        console.log('Movie added to watchlist');
        res.json({ message: 'Movie added to watchlist' });
    } catch (error) {
        console.error('Error when trying to add movie to watchlist', error);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

module.exports = router;
