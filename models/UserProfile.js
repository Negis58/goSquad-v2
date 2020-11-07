const mongoose = require('mongoose');

const UserProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    birthdate: {
        type: Date,
        default: Date.now
    },
    location: {
        type: String
    },
    about: {
        type: String
    },
    status: {
        type: String,
        required: true
    },
    platform: {
      type: [String],
      required: true
    },
    social: {
        discord: {
            type: String
        },
        youtube: {
            type: String
        },
        steam: {
            type: String
        }
    },
    favorite: [
        {
            title: {
                type: String,
                required: true
            },
            platform: {
                type: String,
                required: true
            }
        }
    ],
    posts: [
        {
            user: {
                type: mongoose.Types.ObjectId,
                ref: 'post'
            }
        }
    ],
    followers: [
        {
            follower: {
                type: mongoose.Types.ObjectId,
                ref: 'user'
            }
        }
    ],
    following: [
        {
            follower: {
                type: mongoose.Types.ObjectId,
                ref: 'user'
            }
        }
    ],
    photo: {

    }

}, {collection: 'UserProfile', versionKey: false});

module.exports = mongoose.model('userProfile', UserProfileSchema);