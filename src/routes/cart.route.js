const express = require('express')
const { getCart, addToCart } = require('../controller/cart.controller')
const {authMiddleware} =require('../middleware/auth.js')

const Router = express.Router()

Router.get('/',authMiddleware,getCart)
Router.post('/add',authMiddleware,addToCart)

module.exports=Router