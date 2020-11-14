const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    name: {
        type: String,
        required: true
    },
    title: {
        type: String,
        default: "Post"
    },
    text: {
        type: String,
        required: true
    },
    comments: [{
        text: {
            type: String
        },
        commentedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        data: {
            type: Date,
            default: Date.now
        }
    }],
    likes: [{
        likedBy: {
            type: mongoose.Types.ObjectId,
            ref: 'user'
        }
    }]
}, {collection: 'Post', versionKey: false});


module.exports = mongoose.model('post', postSchema);