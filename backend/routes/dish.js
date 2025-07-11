const express = require("express");
const router = express.Router();
const {getDish, getDishbyId, updateDish, deleteDish, addDish}=require('../controllers/dish');
const { verifyAdmin, verifyToken } = require("../middleware/verifyToken");

router.get('/',getDish)
router.get('/:id',getDishbyId)
router.put('/:id',verifyToken,verifyAdmin,updateDish)
router.delete('/:id',verifyToken,verifyAdmin,deleteDish)
router.post('/',verifyToken,verifyAdmin,addDish)

module.exports=router