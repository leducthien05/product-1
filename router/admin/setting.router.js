const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

const uploadCloud = require("../../middleware/admin/uploadCloudinary");
const controller =require("../../controller/admin/setting-general.controller");

router.get("/general", controller.general);
router.patch("/general", upload.single("logo"), uploadCloud.multer, controller.generalPatch);

module.exports = router;
