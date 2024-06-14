const express = require("express");
const router = express.Router();
const {
  ResetPasswordLink,
  resetPassword,
} = require("../controller/passwordReset/forgotPasswordController");
const { changePassword } = require("../controller/passwordReset/changePasswordController");
router.post("/forgot-password-reset-link", ResetPasswordLink);

router.post("/forgot-password-reset", resetPassword);

router.post("/change-password", changePassword);

module.exports = router;
