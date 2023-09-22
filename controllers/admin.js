const Product = require('../models/product');

exports.getAddProduct = (req, res, next)=> { 
    // res.send("<form action='/admin/add-product' method='POST'><input type='text' placeholder='Enter Product Title' name='title'><button type='submit'>Submit</button></form>") //here the header will set automatically to text/html or we can overwrite by res.setHeader('Content-Type', 'text/html)
    // res.sendFile(path.join(rootDir, 'views', 'add-product.html')); //need to use path for html page ../ for moving out from riutes folder
    res.render('admin/add-product', {pageTitle : 'Add Product', path : '/admin/add-product'});
}

exports.getProducts = (req, res, next)=> { 
    Product.fetchAll(products=>{
        res.render('admin/products', {
            prods : products, 
            pageTitle: 'Admin Products', 
            path : '/admin/products', 
            hasProducts : products.length > 0
        });
    });
}

exports.postAddProduct = (req, res, next)=> { 
    let title = req.body.title;
    let imageUrl = req.body.imageUrl;
    let price = req.body.price;
    let description = req.body.description;
    const product = new Product(title, imageUrl, price, description);
    product.save();
    res.redirect('/');
}