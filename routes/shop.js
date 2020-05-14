const path = require('path')

const express = require("express")
const router = express.Router()

const shopController = require('../controller/shop')

router.get('/', shopController.getIndex)

router.get('/products', shopController.getProducts)

router.get('/cart', shopController.getCart)

router.post('/cart', shopController.postCart)

router.post('/cart-delete-item', shopController.postCartDeleteProduct)

router.get('/products/details/:productId', shopController.getProductDetails)

router.get('/checkout', shopController.getCheckOut)

router.get('/orders', shopController.getOrder)

module.exports = router;