const mongoose = require('mongoose');

const uploadSchema = new mongoose.Schema({
    filename: {
        type: String
    },
    size: {
        type: Number
    },
    ext: {
        type: String
    },
    url: {
        type: String
    },
    message: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'message'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
}, {timestamp: true, versionKey: false});

module.exports = mongoose.model('uploadFile', uploadSchema);