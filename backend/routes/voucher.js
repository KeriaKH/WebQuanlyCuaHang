const express = require("express");
const {
  getVoucher,
  getAllVoucher,
  addVoucher,
  updateVoucher,
  deleteVoucher,
} = require("../controllers/voucher");
const { verifyAdmin, verifyToken } = require("../middleware/verifyToken");
const router = express.Router();

router.get("/", verifyToken, verifyAdmin, getAllVoucher);
router.post("/", verifyToken, verifyAdmin, addVoucher);
router.get("/:id", verifyToken, getVoucher);
router.put("/:id", verifyToken, verifyAdmin, updateVoucher);
router.delete("/:id", verifyToken, verifyAdmin, deleteVoucher);

module.exports = router;
