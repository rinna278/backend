const express = require('express')
const {authMiddleware} =require('../middleware/auth.js')
const { updateCartItem, removeCartItem } = require('../controller/cartItem.controller.js')

const Router = express.Router()

Router.patch('/update',authMiddleware,updateCartItem)
Router.delete('/delete',authMiddleware,removeCartItem)

module.exports=Router