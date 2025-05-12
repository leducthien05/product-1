const express = require("express");
const router = express.Router();
const multer = require("multer");

const upload = multer();
const controller = require("../../controller/admin/accounts.controller");
const uploadClound = require("../../middleware/admin/uploadCloudinary");
const validate = require("../../validate/admin/accounts.validate");
const AuthorAccount = require("../../middleware/admin/authorization.middleware");

router.get("/", controller.index);

router.get("/create",AuthorAccount.AaccoutCreate, controller.create);

router.post("/create",
    upload.single("avatar"),
    validate.createItem,
    uploadClound.multer,
    controller.createItem
);

router.get("/edit/:id",AuthorAccount.AaccoutEdit, controller.edit);

router.patch("/edit/:id",
    upload.single("avatar"),
    validate.editItem,
    uploadClound.multer,
    controller.editItem
)

module.exports = router;