const express = require("express");
const {
  getVoucher,
  getAllVoucher,
  addVoucher,
  updateVoucher,
  deleteVoucher,
} = require("../controllers/voucher");
const router = express.Router();

router.get("/", getAllVoucher);
router.post("/", addVoucher);
router.get("/:id", getVoucher);
router.put("/:id", updateVoucher);
router.delete("/:id", deleteVoucher);

module.exports = router;
