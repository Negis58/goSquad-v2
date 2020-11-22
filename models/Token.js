const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
    tokenId: {
        type: String,
        unique: true
    },
    id: {
        type: String
    }
}, {collection: 'Token', versionKey: false});

module.exports = mongoose.model('token', tokenSchema);