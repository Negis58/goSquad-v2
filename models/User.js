const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: 'https://gravatar.com/avatar/d2486fcf29a4f046af3086770549f1a4?d=mm&r=pg&s=200'
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
    },
    confirmHash: {
        type: String
    },
    confirmed: {
        type: Boolean,
        default: false
    },
    lastSeen: {
        type: Date,
        default: Date.now
    }

}, {timestamp: true});

module.exports = mongoose.model('user', UserSchema);