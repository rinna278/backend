const express = require('express')
const { createReview, getAllReview } = require('../controller/review.controller')
const {authMiddleware} =require('../middleware/auth.js')
const Router = express.Router()

Router.post('/create',authMiddleware,createReview)
Router.get('/:id',getAllReview)

module.exports=Router