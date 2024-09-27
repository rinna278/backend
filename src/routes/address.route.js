const express = require('express')
const {authMiddleware} =require('../middleware/auth.js')
const { findAllAddressByUserId, findAddressById, createAddress, updateAddress, removeAddress } = require('../controller/address.controller.js')

const Router = express.Router()

Router.get('/',authMiddleware,findAllAddressByUserId)
Router.get('/:id',authMiddleware,findAddressById)
Router.post('/create',authMiddleware,createAddress)
Router.patch('/update/:id',authMiddleware,updateAddress)
Router.delete('/delete',authMiddleware,removeAddress)

module.exports=Router