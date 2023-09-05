const express = require('express');
const path = require('path');
const rootDir = require('../helper/path');

const router = express.Router();
const {adminRoutes, products} = require('./admin');

router.get('/',(req, res, next)=> { 
    // console.log('shop products',products);
    // res.sendFile(path.join(rootDir, 'views', 'shop.html'));
    const productsData = products;
    res.render('shop', {prods : productsData, pageTitle: 'My Shop', path : '/'}); //it will take the pug file as we have defined in app.js with view engine
});

module.exports = router;