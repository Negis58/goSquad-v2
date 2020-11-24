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
    avatar: {
      type: String
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
        username: {
          type: String
        },
        commentedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        avatar: {
            type: String
        },
        date: {
            type: Date,
            default: Date.now
        }
    }],
    likes: [{
        likedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        }
    }]
}, {collection: 'Post', versionKey: false});


module.exports = mongoose.model('post', postSchema);