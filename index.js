const express = require('express');
const config = require('config');
const connectDB = require('./config/db');
const authRoute = require('./routes/authRoutes');
const userRoute = require('./routes/userRoutes');


const app = express();
app.use(express.json({ extended: true }));

const PORT = config.get('port') || 5000;

connectDB().then(() => console.log('MongoDB connected...'));

app.listen(PORT, () => console.log(`App has been started on port ${PORT}`));

app.use('/', userRoute);
app.use('/', authRoute);
