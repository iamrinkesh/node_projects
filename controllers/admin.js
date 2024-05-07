const Product = require('../models/product');

exports.getAddProduct = (req, res, next)=> { 
    // res.send("<form action='/admin/add-product' method='POST'><input type='text' placeholder='Enter Product Title' name='title'><button type='submit'>Submit</button></form>") //here the header will set automatically to text/html or we can overwrite by res.setHeader('Content-Type', 'text/html)
    // res.sendFile(path.join(rootDir, 'views', 'add-product.html')); //need to use path for html page ../ for moving out from riutes folder
    res.render('admin/edit-product', {
        pageTitle : 'Add Product', 
        path : '/admin/add-product',
        editing : false
    });
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

exports.getEditProduct = (req, res, next)=> { 
    const editMode = req.query.edit;
    if(!editMode){
        return res.redirect('/');
    }
    prodId = req.params.productId;
    Product.findById(prodId, product => {
        res.render('admin/edit-product', {
            pageTitle : 'Edit Product', 
            path : '/admin/edit-product',
            editing : editMode,
            product : product
        });
    });
}

exports.postEditProduct = (req, res, next) =>{
    prodId = req.body.productId;
    updatedTitle = req.body.title;
    updatedImageUrl = req.body.imageUrl;
    updatedPrice = req.body.price;
    updatedDesc = req.body.description;
    const updatedProduct = new Product(
        prodId,
        updatedTitle,
        updatedImageUrl,
        updatedPrice,
        updatedDesc
    );
    updatedProduct.save();
    res.redirect('/admin/products');
};

exports.postAddProduct = (req, res, next)=> { 
    let title = req.body.title;
    let imageUrl = req.body.imageUrl;
    let price = req.body.price;
    let description = req.body.description;
    const product = new Product(null, title, imageUrl, price, description);
    product.save();
    res.redirect('/');
}

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
}