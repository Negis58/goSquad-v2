const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    avatar: {
        type: String,
        default: 'https://sun9-24.userapi.com/impf/c854416/v854416610/138875/JRU5SBf6-P0.jpg?size=540x1080&quality=96&proxy=1&sign=625c49829eff0d2a759ffaa6864a6c5c&type=album'
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    resetToken: {
        type: String
    }

}, {timestamp: true});

module.exports = mongoose.model('user', UserSchema);