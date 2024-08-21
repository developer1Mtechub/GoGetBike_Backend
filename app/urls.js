// urls.js
const cloudinary = require("cloudinary").v2;

const ApiUrl = 'https://portal.cueballdash.com'
const ApiUrl_Admin = 'https://admin.cueballdash.com'
// index.js

// Your Twilio credentials - you can find these in your Twilio console
const accountSid = 'AC9f362a3147d51974984b575c83690bc7'; // Replace with your Account SID
const authToken = 'e80d062aaa000dacaf91ed39833e0c97';   // Replace with your Auth Token
const twilio_test_phone="+12568587519"

// const baseUrl='https://64f08b5d1f93a1121bb51a0f--venerable-syrniki-24ae89.netlify.app'

cloudinary.config({
  cloud_name: "djvoptc2y",
  api_key: "244929791668434",
  api_secret: "BXD_zIa2otjtiOGsu6mLIdL8unM",
  secure: true,
});
// env varioable 
// CLOUDINARY_URL=cloudinary://244929791668434:BXD_zIa2otjtiOGsu6mLIdL8unM@djvoptc2y

// module.exports = {
//   cloudinary,
// };

const urls = {
  email_verification_url: `${ApiUrl}/verifyEmail`,
  login_url: `${ApiUrl}/login`,
  login_url_admin: `${ApiUrl_Admin}/login`,





  // Add more URLs here if needed
};

module.exports = {urls, accountSid, authToken,twilio_test_phone,cloudinary};

