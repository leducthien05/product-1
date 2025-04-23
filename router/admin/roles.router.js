const express = require('express');
const router = express.Router();

const validate = require("../../validate/admin/validateProduct");
const controller = require("../../controller/admin/roles.controller");

//[GET] admin/roles
router.get("/", controller.index);

//[GET] admin/roles/create
router.get("/create", controller.create);

//[POST] admin/roles/create
router.post("/create", 
    validate.item,
    controller.createItem
);

//[GET] admin/roles/detail/:id
router.get("/detail/:id", controller.detail);

//[GET] admin/roles/edit/:id
router.get("/edit/:id", controller.edit);

//[POST] admin/roles/create
router.patch("/edit/:id", 
    validate.item,
    controller.editItem
);


module.exports = router;