const express = require('express');
const path = require('path');
const rootDir = require('../helper/path');
const productController = require('../controllers/products')

const router = express.Router();
// const {adminRoutes, products} = require('./admin');

router.get('/', productController.getProducts);

module.exports = router;