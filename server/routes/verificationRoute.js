const express = require("express");
const router = express.Router();
const {
  getVerificationEmailPage,
  verifyEmail,
} = require("../controller/verifyEmailController");
const {
  resendVerificationEmail,
} = require("../controller/resendVerificationEmail");

router.route("/verify-email").get(getVerificationEmailPage).post(verifyEmail);
router.post("/resend-verification-email", resendVerificationEmail);


module.exports = router;