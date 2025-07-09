const express = require("express");
const router = express.Router();
const {getDish, getDishbyId, updateDish, deleteDish, addDish}=require('../controllers/dish')

router.get('/',getDish)
router.get('/:id',getDishbyId)
router.put('/:id',updateDish)
router.delete('/:id',deleteDish)
router.post('/',addDish)

module.exports=router