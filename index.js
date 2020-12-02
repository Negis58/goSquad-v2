const express = require('express');
const config = require('config');
const connectDB = require('./config/db');
const authRoute = require('./routes/authRoutes');
const userRoute = require('./routes/userRoutes');
const postRoute = require('./routes/postRoutes');
const bodyParser = require('body-parser');
const multer = require('multer');
const app = express();
const PORT = config.get('port') || 5000;
const auth = require('./util/authMIddeware');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectDB().then(() => console.log('MongoDB connected...'));



app.listen(PORT, () => console.log(`App has been started on port ${PORT}`));

app.use('/api',  userRoute);
app.use('/api', authRoute);
app.use('/api',  postRoute);
