const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema({
    id:{
      type: Number
    },
    parent_id: {
        type: Number
    },
    citizen: [
        {
            user: mongoose.Types.ObjectId,
            ref: 'user'
        }
    ]
}, {collection: 'Locations', versionKey: false});

module.exports = mongoose.model('location', LocationSchema);