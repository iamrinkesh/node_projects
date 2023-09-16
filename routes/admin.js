const express = require('express');
const path = require('path');

const router = express.Router(); //use the Router function from express
// const rootDir = require('../helper/path');//to use the rootDir instead of __dirname from helper

const productController = require('../controllers/products')


//add-product with =>GET
router.get('/add-product', productController.getAddProduct); //path will be specified at first

//add-product with =>POST
router.post('/add-product', productController.postAddProduct);

exports.adminRoutes = router;