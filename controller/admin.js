const Product = require('../models/product')

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {path: '/admin/add-product', editing: false})
}

exports.postAddProduct = (req, res) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product(null, title, imageUrl, price, description)
    product.save()
    res.redirect('/')
} 

exports.getProducts = (req, res) => {
    Product.fetchAll(products => {
        res.render('admin/products', {prod: products, path: '/admin/products'})
    console.log("asd",products)
    })
} 

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    const productId = req.params.productId;
    Product.findById(productId, product => {
        if(!product) {
            return res.redirect('/')
        }
        res.render('admin/edit-product', {path: '/admin/add-product', editing: editMode, product: product})
    })
    if(!editMode) {
        res.redirect('/')
    }
}

exports.postEditProduct = (req, res) => {
    const prodId = req.body.prodId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImage = req.body.imageUrl;
    const updatedDesc = req.body.description;
    const updatedProduct = new Product(prodId, updatedTitle, updatedImage, updatedPrice, updatedDesc);
    updatedProduct.save();
    res.redirect("/admin/products")
}

exports.postDeleteProduct = (req, res) => {
    const prodId = req.body.productId;
    Product.deleteById(prodId);
    res.redirect("/admin/products");
}