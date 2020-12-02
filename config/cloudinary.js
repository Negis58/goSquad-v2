const cloudinary = require('cloudinary').v2;
const config = require('config');
const CLOUDINARY_NAME = config.get('cloudinary.cloud_name');
const CLOUDINARY_API_KEY = config.get('cloudinary.api_key');
const CLOUDINARY_API_SECRET = config.get('cloudinary.api_secret');

cloudinary.config({
    cloud_name: CLOUDINARY_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
});

module.exports = cloudinary;