const express = require('express');
const path = require('path');
const rootDir = require('../helper/path');
const shopController = require('../controllers/shop')

const router = express.Router();
// const {adminRoutes, products} = require('./admin');

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/products/:productId', shopController.getProduct);

router.get('/cart', shopController.getCart);

router.post('/cart', shopController.postCart);

router.get('/orders', shopController.getOrders);

router.get('/checkout', shopController.getCheckout);

module.exports = router;