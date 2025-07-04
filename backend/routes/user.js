const express=require('express')
const { signUp, addCartItem, getCart } = require('../controllers/user')
const router=express.Router()

router.post('/signUp',signUp)
router.post('/cart/add',addCartItem)
router.get('/cart/:id',getCart)
module.exports=router

