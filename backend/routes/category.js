const express = require("express");
const router = express.Router();
const {getCategory, addCategory, deleteCategory}=require('../controllers/category');
const { verifyToken, verifyAdmin } = require("../middleware/verifyToken");

router.get('/',getCategory)
router.post('/',verifyToken,verifyAdmin,addCategory)
router.delete('/:id',verifyToken,verifyAdmin,deleteCategory)

module.exports=router