const mongoose = require('mongoose');
const config = require('config');
const mongoUri = config.get('mongoUri');

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
