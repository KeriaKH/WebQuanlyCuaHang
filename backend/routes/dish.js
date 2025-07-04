const express = require("express");
const router = express.Router();
const {getDish, getDishbyId}=require('../controllers/dish')

router.get('/',getDish)
router.get('/:id',getDishbyId)

module.exports=router