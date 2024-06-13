const express = require("express");
const router = express.Router();
const {
  ResetPasswordLink,
  resetPassword,
} = require("../controller/forgotPasswordController");

router.post("/forgot-password-reset-link",ResetPasswordLink)

router.post("/forgot-password-reset",resetPassword);


module.exports = router;
