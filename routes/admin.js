const express = require('express');
const path = require('path');

const router = express.Router(); //use the Router function from express
const rootDir = require('../helper/path');//to use the rootDir instead of __dirname from helper

const products = [];

//add-product with =>GET
router.get('/add-product',(req, res, next)=> { //path will be specified at first
    console.log("Add product!");
    // res.send("<form action='/admin/add-product' method='POST'><input type='text' placeholder='Enter Product Title' name='title'><button type='submit'>Submit</button></form>") //here the header will set automatically to text/html or we can overwrite by res.setHeader('Content-Type', 'text/html)
    // res.sendFile(path.join(rootDir, 'views', 'add-product.html')); //need to use path for html page ../ for moving out from riutes folder
    res.render('add-product', {pageTitle : 'Add Product', path : '/admin/add-product'});
});

//add-product with =>POST
router.post('/add-product',(req, res, next)=> { //path will be specified at first
    products.push({title : req.body.title}); //push the value of title to array
    res.redirect('/');
});

exports.adminRoutes = router;
exports.products = products;