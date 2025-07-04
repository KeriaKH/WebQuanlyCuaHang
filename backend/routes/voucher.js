const express = require("express");
const { getVoucher } = require("../controllers/voucher");
const router = express.Router();

router.get('/:id',getVoucher)

module.exports = router;