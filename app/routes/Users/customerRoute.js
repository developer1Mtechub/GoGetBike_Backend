const express = require("express");
const router = express.Router();

const customerController = require("../../controllers/USERS/customerController");

router.post("/add-about-us", customerController.addAboutUs);
router.post("/update-about-us", customerController.updateAboutUs);
// Phone Verification
router.post("/verify-phone", customerController.verifyPhone);
router.post("/verify-code", customerController.verifyCode);
// User Profile
router.post("/update-user", customerController.updateUser);
router.post("/get-user-profile", customerController.getUserProfile);
module.exports = router;
