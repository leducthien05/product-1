const express = require("express");
const router = express.Router();
const multer = require('multer');
const uploadCould = require("../../middleware/admin/uploadCloudinary");

//const storage = require("../../helper/multerStorage");
const upload = multer();

const productController = require("../../controller/admin/product.controller");
const validate = require("../../validate/admin/validateProduct");
const AuthorProduct = require("../../middleware/admin/authorization.middleware");

router.get('/', productController.product);

router.patch('/changeStatus/:status/:id', productController.changeStatus);

router.patch('/change-multi', productController.changeMulti);

router.delete('/delete/:id', productController.delete);

router.get('/create',AuthorProduct.ProductCreate, productController.create);

router.post(
    '/create', 
    upload.single('thumbnail'),
    uploadCould.multer,
    validate.item, 
    productController.createItem);

router.get('/edit/:id',upload.single('thumbnail'),AuthorProduct.AaccoutEdit, productController.edit );

router.patch('/edit/:id', upload.single('thumbnail'),uploadCould.multer, validate.item, productController.editItem);

router.get('/detail/:slug', productController.detail);
module.exports = router;