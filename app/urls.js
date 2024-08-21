// urls.js
const cloudinary = require("cloudinary").v2;
require("dotenv").config();
// Your Twilio credentials - you can find these in your Twilio console
const accountSid = process.env.TWILIO_ACCOUNT_SID; // Replace with your Account SID
const authToken = process.env.TWILIO_AUTH_TOKEN; // Replace with your Auth Token
const twilio_test_phone = process.env.TWILIO_PHONE_NUMBER;
// const baseUrl='https://64f08b5d1f93a1121bb51a0f--venerable-syrniki-24ae89.netlify.app'
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
  // text data
});
// env varioable
// CLOUDINARY_URL=cloudinary://244929791668434:BXD_zIa2otjtiOGsu6mLIdL8unM@djvoptc2y

// module.exports = {
//   cloudinary,
// };

module.exports = { accountSid, authToken, twilio_test_phone, cloudinary };
