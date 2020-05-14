const path = require('path')
const express = require("express")
const app = express()

const adminRoutes = require("./routes/admin")
const shopRoutes = require("./routes/shop")

const errorController = require("./controller/error")

app.set('view engine', 'ejs');
app.set('views', 'views')

app.use(express.urlencoded({extended: false}))
app.use(express.static('public'))

app.use('/admin', adminRoutes);
app.use(shopRoutes)

app.use(errorController.error404)

app.listen(3000)
