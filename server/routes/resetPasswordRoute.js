const express = require("express");
const router = express.Router();
const {
  ResetPasswordLink,
  resetPassword,
} = require("../controller/passwordReset/forgotPasswordController");
const authMiddleWare = require("../middleware/verifyJwt");
const {
  changePassword,
} = require("../controller/passwordReset/changePasswordController");

router.post("/forgot-password-reset-link", ResetPasswordLink);
router.put("/forgot-password-reset", resetPassword);
router.use(authMiddleWare);
router.put("/change-password", changePassword);

module.exports = router;
