// models/user.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    watchList: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'WatchlistItem',
        },
    ],
});
  
module.exports = mongoose.model('User', userSchema);
