const express = require("express");
const { checkout, getOrderByUserId, getOrderByid } = require("../controllers/order");
const router = express.Router();

router.post('/',checkout)
router.get('/user/:id',getOrderByUserId)
router.get('/:id',getOrderByid)
module.exports=router