const express = require('express')
const {isAdmin} =require('../middleware/auth.js')
const {createCategory, getCategory, deleteCategory, getCategoryById, update_category} =require('../controller/category.controller.js')
const Router = express.Router()

Router.post('/add',isAdmin,createCategory)
Router.delete('/delete',isAdmin,deleteCategory)
Router.get('/',getCategory)
Router.get('/:id',getCategoryById)
Router.patch('/update/:id',isAdmin,update_category)

module.exports=Router