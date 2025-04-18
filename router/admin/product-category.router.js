const express = require("express");
const router = express.Router();
const multer = require('multer');
const upload = multer();
const uploadCould = require("../../middleware/admin/uploadCloudinary");
const controller = require("../../controller/admin/product-category.controller");

router.get("/", controller.index); 

router.get("/create", controller.create);

router.post("/create", 
    upload.single("thumbnail"),
    uploadCould.multer,
    controller.createItem
);

module.exports = router;