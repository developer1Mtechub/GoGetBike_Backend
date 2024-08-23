
const express = require("express");
const router = express.Router();

const securityDepositAmountController = require("../../controllers/SECURITY_DEPOSIT_AMOUNT/securityDepositAmountController");

router.post("/add-or-update-deposit-amount",securityDepositAmountController.addUpdateSecurityDepositAmount);
router.get("/get-deposit-amount",securityDepositAmountController.getSecurityDepositAmount);

module.exports = router;
