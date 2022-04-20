// set your env variable CLOUDINARY_URL or set the following
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

// configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = { cloudinary };
