const express = require('express');
const path = require('path');
const rootDir = require('../helper/path');

const router = express.Router();
const {adminRoutes, products} = require('./admin');

router.get('/',(req, res, next)=> { 
    console.log('shop products',products);
    res.sendFile(path.join(rootDir, 'views', 'shop.html'));
});

module.exports = router;