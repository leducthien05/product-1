const express = require("express");
const router = express.Router();

const controller = require("../../controller/client/cart.controller");

router.post('/add/:id', controller.index);

module.exports = router;