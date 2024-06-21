// const products = [];

const { where } = require('sequelize');
const path = require('../helper/path');
const Cart = require('../models/cart');
const Product = require('../models/product');

exports.getProducts = (req, res, next)=> { 
    Product.findAll()
        .then(products => {
            res.render('shop/product-list', {
                prods : products, 
                pageTitle: 'Products List', 
                path : '/products', 
                // hasProducts : products.length > 0
            });
        })
        .catch(err => {
            console.log(err);
        });
    // console.log('shop products',products);
    // res.sendFile(path.join(rootDir, 'views', 'shop.html'));
    // const productsData = products;
    // Product.fetchAll()
    // .then(([rows, fieldData]) => {
    //     res.render('shop/product-list', {
    //         prods : rows, 
    //         pageTitle: 'Products List', 
    //         path : '/products', 
    //         // hasProducts : products.length > 0
    //     });
    // })
    // .catch(err => console.log(err));
}

exports.getProduct = (req, res, next)=> {
    const productId = req.params.productId;
    Product.findByPk(productId)
        .then((product) => {
            res.render('shop/product-detail', {
                product: product, 
                pageTitle : product.title,
                path : '/products'
            });
        })
        .catch(err => console.log(err));

    // alternative method with where query in sequalize

    // Product.findAll({where: {id : productId}})
    //     .then(products => {
    //         res.render('shop/product-detail', {
    //             product: products[0], 
    //             pageTitle : products[0].title,
    //             path : '/products'
    //         });
    //     })
    //     .catch(err => console.log(err));
}

exports.getIndex = (req, res, next)=> { 
    Product.findAll()
        .then(products => {
            res.render('shop/index', {
                prods : products, 
                pageTitle: 'My Shop', 
                path : '/'
            });
        })
        .catch(err => {
            console.log(err);
        });
    // Product.fetchAll()
    //     .then(([rows, fieldData]) => {
    //         res.render('shop/index', {
    //             prods : rows, 
    //             pageTitle: 'My Shop', 
    //             path : '/'
    //         });
    //     })
    //     .catch(err => console.log(err));
}

exports.getCart = (req, res, next)=> {
    res.render('shop/cart', {
        pageTitle: 'My Shop', 
        path : '/cart'
    });
}

exports.postCart = (req, res, next)=> {
    const prodId = req.body.productId;
    let fetchedCart;
    let newQuantity = 1;
    req.user
        .getCart()
        .then(cart => {
            fetchedCart = cart;
            return cart.getProducts({where: {id: prodId}});
        })
        .then(products => {
            let product;
            if(products.length > 0){
                product = products[0];
            }
            if(product){
                const oldQuantity = product.cartItem.quantity;
                newQuantity = oldQuantity + 1;
                return product;
            }
            return Product.findByPk(prodId)
        })
        .then(product =>{
            return fetchedCart.addProduct(product, {
                through: {quantity : newQuantity}
            })
        })
        .then(()=>{
            res.redirect('/cart');
        })
        .catch(err => console.log(err));
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

exports.getCart = (req, res, next)=> {
    req.user
        .getCart()
        .then(cart => {
            // console.log(cart);
            return cart
                .getProducts()
                .then(products => {
                    res.render('shop/cart', {
                        path : '/cart',
                        pageTitle : 'Your Cart',
                        products : products
                    })
                })
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err))
    // Cart.getCart(cart=>{
    //     Product.fetchAll(products => {
    //         const cartProducts = [];
    //         for (product of products) {
    //             const cartProductData = cart.products.find(prod => prod.id === product.id);
    //             if(cartProductData){
    //                 cartProducts.push({productData : product, qty : cartProductData.qty});
    //             }
    //         }
    //         res.render('shop/cart', {
    //             path : '/cart',
    //             pageTitle : 'Your Cart',
    //             products : cartProducts
    //         })
    //     })
    // })
}

exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    req.user
        .getCart()
        .then(cart => {
            return cart.getProducts({where: {id: prodId}});
        })
        .then(products => {
            const product = products[0];
            return product.cartItem.destroy();
        })
        .then(result => {
            res.redirect('/cart');
        })
        .catch(err=> console.log(err));
    // Product.findById(prodId, product => {
    //     Cart.deleteProduct(prodId, product.price);
    //     res.redirect('/cart');
    // })
}