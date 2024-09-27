const express = require('express')
const Router = express.Router()
const {register,login, loginAdmin} = require('../controller/auth.controller.js')

Router.post('/register',register)
Router.post('/login',login)
Router.post('/loginAdmin',loginAdmin)

module.exports=Router