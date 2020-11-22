const mongoose = require('mongoose');

const dialogSchema = new mongoose.Schema({
    partner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    lastMessage: {
        type: Schema.Types.ObjectId,
        ref: 'message'
    }
}, {timestamp: true});

module.exports = mongoose.model('dialog', dialogSchema);