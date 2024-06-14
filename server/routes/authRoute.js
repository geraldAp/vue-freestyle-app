const express = require("express");
const router = express.Router();
const refreshController = require("../controller/auth/refreshController");
const loginController = require("../controller/auth/loginController");
const signUpController = require("../controller/auth/signupcontroller");
const logoutController = require("../controller/auth/logoutController");
const { getAccounts, deleteAccounts } = require("../controller/accounts");


router.post("/sign-up", signUpController);
router.post("/login", loginController);
router.post("/logout", logoutController);
router.post("/refresh-token", refreshController);
router.delete("/delete-accounts", deleteAccounts);
router.get("/get-accounts", getAccounts);
module.exports = router;
