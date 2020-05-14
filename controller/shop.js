const Product = require('../models/product')
const Cart = require('../models/cart')

exports.getProducts = (req, res) => {
    Product.fetchAll(products => {
        res.render('shop/product-list', {prod: products, path: '/'})
    // console.log("asd",products)
    })
}

exports.getProductDetails = (req, res) => {
    const prodId = req.params.productId;
    // console.log("productId", prodId)
    Product.findById(prodId, details => {
        // console.log(details)
        res.render("shop/product-detail", {product: details, path: "/products/details/:productId"});
    })
}

exports.getIndex = (req, res) => {
    Product.fetchAll(products => {
        res.render('shop/index', {prod: products, path: '/'})
    // console.log("asd",products)
    })
}

exports.getCart = (req, res) => {
    
    Cart.getProduct(cart => {
        Product.fetchAll(products => {
            const cartProducts = [];
            for (product of products) {
                const cartProductData = cart.products.find(prod => prod.id === product.id);
                if(cartProductData) {
                    cartProducts.push({productData: product, qty: cartProductData.qty})
                }
            }
            res.render('shop/cart', {path: '/cart', products: cartProducts})
        })
    })
}

exports.postCart = (req, res) => {
    const productId = req.body.productId
    console.log(productId)
    Product.findById(productId, product => {
        console.log(product.price)
        Cart.addProduct(productId, product.price)
    })
    res.redirect('/cart')
}

exports.postCartDeleteProduct = (req, res) => {
    const prodId = req.body.productId;
    Product.findById(prodId, product => {
        Cart.deleteProduct(prodId, product.price)
        res.redirect('/cart')
    })
}

exports.getCheckOut = (req, res) => {
    res.render('shop/checkOut', {path: '/checkout'})
}

exports.getOrder = (req, res) => {
    res.render('shop/orders', {path: '/checkout'})
}