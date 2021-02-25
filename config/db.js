const mongoose = require('mongoose');
require('dotenv').config();
const mongoUri =  process.env.mongoUri;

async function connectDB() {
    try {
        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        });
    } catch (e) {
        console.log('Server Error', e.message);
        process.exit(1);
    }
}

module.exports = connectDB;
