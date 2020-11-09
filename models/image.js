const mongoose = require('mongoose');
const path = require('path');

const ImageSchema = new mongoose.Schema({
    title: {
        type: String
    },
    filename: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {collection: 'Image', versionKey: false});

module.exports = mongoose.model('image', ImageSchema);