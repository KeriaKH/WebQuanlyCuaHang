const express = require("express");
const {
  checkout,
  getOrderByUserId,
  getOrderByid,
  getDashboarData,
  getOrder,
  confirmOrder,
} = require("../controllers/order");
const { createOrderWithZaloPay } = require("../zaloPay/zalopay");
const { verifyAdmin, verifyToken } = require("../middleware/verifyToken");
const router = express.Router();

router.post("/checkout", verifyToken, checkout);
router.put("/confirm/:id", verifyToken, verifyAdmin, confirmOrder);
router.get("/", verifyToken, verifyAdmin, getOrder);
router.get("/user/:id", verifyToken, getOrderByUserId);
router.get("/dashboard", verifyToken, verifyAdmin, getDashboarData);
router.get("/:id", verifyToken, getOrderByid);
router.post("/zalopay", verifyToken, createOrderWithZaloPay);

module.exports = router;
