const express = require('express')

const {authMiddleware} =require('../middleware/auth.js')
const { createRating, getAllRating } = require('../controller/rating.controller.js')
const Router = express.Router()

Router.post('/create',authMiddleware,createRating)
Router.get('/:id',getAllRating)

module.exports=Router