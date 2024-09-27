const express = require('express')
const Router = express.Router()
const {add_wishlish, getAllWish, deleteWish}=require('../controller/wishlist.controller.js')
const { authMiddleware } = require('../middleware/auth.js')
Router.post('/addwishlist',authMiddleware,add_wishlish)
Router.get('/',authMiddleware,getAllWish)
Router.delete('/delete',authMiddleware,deleteWish)

module.exports=Router