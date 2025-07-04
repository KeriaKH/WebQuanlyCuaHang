const express = require("express");
const router = express.Router();
const { getReview }=require('../controllers/review')

router.get('/:id',getReview)

module.exports=router
