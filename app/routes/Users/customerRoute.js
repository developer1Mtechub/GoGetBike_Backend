const express = require("express");
const router = express.Router();

const customerController = require("../../controllers/USERS/customerController");

router.post("/add-about-us", customerController.addAboutUs);
router.post("/update-about-us", customerController.updateAboutUs);
router.get("/get-about-us", customerController.getAboutUs);
// Phone Verification
router.post("/verify-phone", customerController.verifyPhone);
router.post("/verify-code", customerController.verifyCode);
// User Profile
router.post("/update-user", customerController.updateUser);
router.post("/get-user-profile", customerController.getUserProfile);
// updateUserVerifyStatus
router.post("/update-user-verify-status", customerController.updateUserVerifyStatus);
// Deposit security fee 
router.post("/deposit-security-fee", customerController.depositUserSecurityFee);
module.exports = router;
