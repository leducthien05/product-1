const express = require("express");
const router = express.Router();
const multer = require("multer");

const upload = multer();
const uploadCloudinary = require("../../middleware/admin/uploadCloudinary");
const controller = require("../../controller/admin/my-account.controller");

router.get("/", controller.index);

router.get("/edit", controller.edit);

router.patch("/edit",upload.single("avatar"), uploadCloudinary.multer, controller.editItem);

module.exports = router;
