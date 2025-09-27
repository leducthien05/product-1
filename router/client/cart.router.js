const express = require("express");
const router = express.Router();

const controller = require("../../controller/client/cart.controller");

router.post('/add/:id', controller.addProduct);

router.get('/', controller.index);

router.get('/update/:idProduct/:quantity', controller.update);

router.get('/delete/:idProduct', controller.delete);

module.exports = router;