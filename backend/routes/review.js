const express = require("express");
const router = express.Router();
const { getReview, addReview } = require("../controllers/review");

router.get("/:id", getReview);
router.post("/add", addReview);

module.exports = router;
