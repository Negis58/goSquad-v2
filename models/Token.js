const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
    tokenId: {
        type: String,
        unique: true
    },
    userId: {
        type: String
    }
}, {collection: 'Token', versionKey: false});

module.exports = mongoose.model('token', tokenSchema);