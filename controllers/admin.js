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
    // Product.findAll()
    req.user
        .getProducts()
        .then(products => {
            res.render('admin/products', {
                prods : products, 
                pageTitle: 'Admin Products', 
                path : '/admin/products', 
                hasProducts : products.length > 0
            });
        })
        .catch(err => {
            console.log(err);
        });
    // Product.fetchAll(products=>{
    //     res.render('admin/products', {
    //         prods : products, 
    //         pageTitle: 'Admin Products', 
    //         path : '/admin/products', 
    //         hasProducts : products.length > 0
    //     });
    // });
}

exports.getEditProduct = (req, res, next)=> { 
    const editMode = req.query.edit;
    if(!editMode){
        return res.redirect('/');
    }
    prodId = req.params.productId;
    // Product.findByPk(prodId)
    req.user.getProducts({ where: {id:prodId} })
        .then((products) => {
            const product = products[0];
            if(!product){
                return res.redirect('/');
            }
            res.render('admin/edit-product', {
                pageTitle : 'Edit Product', 
                path : '/admin/edit-product',
                editing : editMode,
                product : product
            });
        })
        .catch(err => console.log(err));

    // Product.findById(prodId, product => {
    //     res.render('admin/edit-product', {
    //         pageTitle : 'Edit Product', 
    //         path : '/admin/edit-product',
    //         editing : editMode,
    //         product : product
    //     });
    // });
}

exports.postEditProduct = (req, res, next) =>{
    prodId = req.body.productId;
    updatedTitle = req.body.title;
    updatedImageUrl = req.body.imageUrl;
    updatedPrice = req.body.price;
    updatedDesc = req.body.description;
    Product.findByPk(prodId)
        .then(product => {
            product.title = updatedTitle;
            product.imageUrl = updatedImageUrl;
            product.price = updatedPrice;
            product.description = updatedDesc;
            product.save();
        })
        .then(result => {
            console.log('Product Updated');
            res.redirect('/admin/products');
        })
        .catch(err => console.log(err));
    // const updatedProduct = new Product(
    //     prodId,
    //     updatedTitle,
    //     updatedImageUrl,
    //     updatedPrice,
    //     updatedDesc
    // );
    // updatedProduct.save();
};

exports.postAddProduct = (req, res, next)=> { 
    let title = req.body.title;
    let imageUrl = req.body.imageUrl;
    let price = req.body.price;
    let description = req.body.description;
    // const product = new Product(null, title, imageUrl, price, description);
    // product
    //     .save()
    //     .then(()=>{
    //         res.redirect('/');
    //     })
    //     .catch(err => console.log(err));

    // Product.create({
    //     title : title,
    //     price : price,
    //     imageUrl : imageUrl,
    //     description : description,
    //     userId : req.user.id
    // })

    req.user
        .createProduct({
            title : title,
            price : price,
            imageUrl : imageUrl,
            description : description,
            userId : req.user.id
        })
        .then(result => {
            console.log("Created Product");
            res.redirect('/admin/products');
        })
        .catch(err => {
            console.log(err);
        })
}

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findByPk(prodId)
        .then(product => {
            return product.destroy();
        })
        .then(result => {
            console.log("Product Deleted Successfully");
            res.redirect('/admin/products');
        })
        .catch(err => console.log(err));
    // Product.deleteById(prodId);
}