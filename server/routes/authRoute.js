const express = require("express");
const router = express.Router();
const refreshController = require("../controller/refreshController");
const loginController = require("../controller/loginController");
const signUpController = require("../controller/signupcontroller");
const logoutController = require("../controller/logoutController");
const { getAccounts, deleteAccounts } = require("../controller/accounts");


router.post("/sign-up", signUpController);
router.post("/login", loginController);
router.post("/logout", logoutController);
router.post("/refresh-token", refreshController);
router.delete("/delete-accounts", deleteAccounts);
router.get("/get-accounts", getAccounts);
module.exports = router;
