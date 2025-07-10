const express = require("express");
const router = express.Router();
const {getCategory, addCategory, deleteCategory}=require('../controllers/category')

router.get('/',getCategory)
router.post('/',addCategory)
router.delete('/:id',deleteCategory)

module.exports=router