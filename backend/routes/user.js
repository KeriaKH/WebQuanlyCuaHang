const express=require('express')
const { signUp, addCartItem, getCart, updateCartItem, deleteCart } = require('../controllers/user')
const router=express.Router()

router.post('/signUp',signUp)
router.post('/cart/add',addCartItem)
router.get('/cart/:id',getCart)
router.put('/cart/update',updateCartItem)
router.delete('/cart/delete',deleteCart)
module.exports=router

