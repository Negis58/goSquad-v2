const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    text: {
        type: String,
        require: Boolean
    },
    dialog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'dialog',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    read: {
        type: Boolean,
        default: false
    },
    attachments: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'uploadFile'
    }

}, {timestamp: true, usePushEach: true});

module.exports = mongoose.model('message', messageSchema);