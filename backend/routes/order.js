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
const router = express.Router();

router.post("/checkout", checkout);
router.put("/confirm/:id", confirmOrder);
router.get("/", getOrder);
router.get("/user/:id", getOrderByUserId);
router.get("/dashboard", getDashboarData);
router.get("/:id", getOrderByid);
router.post("/zalopay", createOrderWithZaloPay);

module.exports = router;
