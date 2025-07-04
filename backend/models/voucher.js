const mongoose = require("mongoose");

const voucherSchema = mongoose.Schema(
  {
    code: { type: String, require: true },
    quantity: { type: Number, require: true },
    value: { type: Number, require: true },
    minimum: { type: Number, require: true, default: 0 },
    expiresAt: { type: Date, required: true },
    usedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  },
  { timestamps: true, }
);

module.exports=mongoose.Schema('voucher',voucherSchema)
