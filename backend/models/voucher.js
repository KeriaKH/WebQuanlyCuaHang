const mongoose = require("mongoose");

const voucherSchema = mongoose.Schema(
  {
    code: { type: String, required: true },
    quantity: { type: Number, required: true },
    value: { type: Number, required: true },
    minimum: { type: Number, required: true, default: 0 },
    expiresAt: { type: Date, required: true },
    usedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  },
  { timestamps: true, }
);

module.exports=mongoose.model('voucher',voucherSchema)
