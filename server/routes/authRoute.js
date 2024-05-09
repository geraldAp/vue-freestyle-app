const express = require("express");
const router = express.Router();
const refreshController = require("../controller/refreshController");
const loginController = require("../controller/loginController");
const signUpController = require("../controller/signupcontroller");
const logoutController = require("../controller/logoutController");

router.post("/sign-up",signUpController);
router.post("/login", loginController);
router.post("/logout", logoutController);
router.post("/refresh-token", refreshController);

module.exports = router;
