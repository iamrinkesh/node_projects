// const products = [];

const Product = require('../models/product');

exports.getAddProduct = (req, res, next)=> { 
    // res.send("<form action='/admin/add-product' method='POST'><input type='text' placeholder='Enter Product Title' name='title'><button type='submit'>Submit</button></form>") //here the header will set automatically to text/html or we can overwrite by res.setHeader('Content-Type', 'text/html)
    // res.sendFile(path.join(rootDir, 'views', 'add-product.html')); //need to use path for html page ../ for moving out from riutes folder
    res.render('add-product', {pageTitle : 'Add Product', path : '/admin/add-product'});
}

exports.postAddProduct = (req, res, next)=> { 
    // products.push({title : req.body.title}); //push the value of title to array
    const product = new Product(req.body.title);
    product.save();
    res.redirect('/');
}

exports.getProducts = (req, res, next)=> { 
    // console.log('shop products',products);
    // res.sendFile(path.join(rootDir, 'views', 'shop.html'));
    // const productsData = products;
    Product.fetchAll(products=>{
        res.render('shop', {
            prods : products, 
            pageTitle: 'My Shop', 
            path : '/', 
            hasProducts : products.length > 0
        });
    });
}