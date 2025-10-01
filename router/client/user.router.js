const express = require("express");
const router = express.Router();

const controller = require("../../controller/client/user.controller");
const validate = require("../../validate/client/user.validate");

router.get("/register", controller.register);
router.post("/register",validate.register, controller.registerPost);

router.get("/logout", controller.logout);

router.get("/login", controller.login);
router.post("/login", validate.login, controller.loginPost);

router.get("/password/passwordForgot", controller.passwordForgot);
router.post("/password/passwordForgot", controller.passwordForgotPost);

router.get("/password/otpPassword", controller.otpPassword);
router.post("/password/otpPassword",validate.otp, controller.otpPasswordPost);

router.get("/password/reset", controller.reset);
router.post("/password/reset",validate.resetPassword, controller.resetPost);
module.exports = router;