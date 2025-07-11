const express = require("express");
const router = express.Router();
const { getReview, addReview } = require("../controllers/review");
const { verifyToken } = require("../middleware/verifyToken");

router.get("/:id", verifyToken, getReview);
router.post("/add", verifyToken, addReview);

module.exports = router;
