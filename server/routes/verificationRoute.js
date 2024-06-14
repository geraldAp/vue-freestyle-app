const express = require("express");
const router = express.Router();
const {
  getVerificationEmailPage,
  verifyEmail,
} = require("../controller/email-verification/verifyEmailController");
const {
  resendVerificationEmail,
} = require("../controller/email-verification/resendVerificationEmail");

router.route("/verify-email").get(getVerificationEmailPage).post(verifyEmail);
router.post("/resend-verification-email", resendVerificationEmail);


module.exports = router;