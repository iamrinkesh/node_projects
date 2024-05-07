// const products = [];

const path = require('../helper/path');
const Cart = require('../models/cart');
const Product = require('../models/product');

exports.getProducts = (req, res, next)=> { 
    // console.log('shop products',products);
    // res.sendFile(path.join(rootDir, 'views', 'shop.html'));
    // const productsData = products;
    Product.fetchAll(products=>{
        res.render('shop/product-list', {
            prods : products, 
            pageTitle: 'Products List', 
            path : '/products', 
            // hasProducts : products.length > 0
        });
    });
}

exports.getProduct = (req, res, next)=> {
    const productId = req.params.productId;
    Product.findById(productId, product => {
        res.render('shop/product-detail', {
            product: product, 
            pageTitle : product.title,
            path : '/products'
        });
    })
}

exports.getIndex = (req, res, next)=> { 
    Product.fetchAll(products=>{
        res.render('shop/index', {
            prods : products, 
            pageTitle: 'My Shop', 
            path : '/'
        });
    });
}

exports.getCart = (req, res, next)=> {
    res.render('shop/cart', {
        pageTitle: 'My Shop', 
        path : '/cart'
    });
}

exports.postCart = (req, res, next)=> {
    const prodId = req.body.productId;
    Product.findById(prodId, product =>{
        Cart.addProduct(prodId, product.price)
    });
    res.redirect('/cart')
}

exports.getOrders = (req, res, next)=> {
    res.render('shop/orders', {
        pageTitle: 'My Orders', 
        path : '/orders'
    });
}

exports.getCheckout = (req, res, next)=> {
    res.render('shop/checkout', {
        pageTitle: 'Checkout', 
        path : '/checkout'
    });
}