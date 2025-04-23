const express = require("express");
const router = express.Router();
const multer = require('multer');
const upload = multer();

const uploadCloud = require("../../middleware/admin/uploadCloudinary");
const controller = require("../../controller/admin/product-category.controller");
const validate = require("../../validate/admin/validateProduct");

router.get("/", controller.index); 

router.get("/create", controller.create);

router.post("/create", 
    upload.single("thumbnail"),
    validate.item,
    uploadCloud.multer,
    controller.createItem
);

router.get("/edit/:id", controller.edit);

router.patch("/edit/:id", 
    upload.single("thumbnail"),
    uploadCloud.multer,
    validate.item,
    controller.editItem
);

router.get("/detail/:id", controller.detail);

router.delete("/delete/:id", controller.delete);

module.exports = router;