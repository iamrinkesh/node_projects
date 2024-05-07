const express = require('express');
const path = require('path');

const router = express.Router(); //use the Router function from express
// const rootDir = require('../helper/path');//to use the rootDir instead of __dirname from helper

const adminController = require('../controllers/admin')


//add-product with =>GET
router.get('/add-product', adminController.getAddProduct); //path will be specified at first

//product list with =>GET
router.get('/products', adminController.getProducts);

//add-product with =>POST
router.post('/add-product', adminController.postAddProduct);

router.get('/edit-product/:productId', adminController.getEditProduct);

router.post('/edit-product', adminController.postEditProduct);

router.post('/delete-product', adminController.postDeleteProduct);

exports.adminRoutes = router;