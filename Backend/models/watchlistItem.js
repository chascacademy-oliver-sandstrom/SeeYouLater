const mongoose = require('mongoose');

const watchlistItem = new mongoose.Schema({
    title: String,
    year: String,
    poster: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
});

module.exports = mongoose.model('WatchlistItem', watchlistItem)