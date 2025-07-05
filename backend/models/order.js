const mongoose = require("mongoose");
const address = require("./address");

const orderItemSchema = new mongoose.Schema(
  {
    dishId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "dish",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    price: {
      type: Number,
      required: true,
    },
    note: {
      type: String,
      default: "",
    },
    selectedOptions: [
      {
        optionName: { type: String, required: true },
        choiceName: { type: String, required: true },
        price: { type: Number, required: true },
      },
    ],
  },
  { _id: false }
);

const orderSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    orderItem: {
      type: [orderItemSchema],
      required: true,
      validate: [(arr) => arr.length > 0, "Order must have at least one item"],
    },
    address: { type: address.schema, required: true },
    paymentMethod: { type: String, enum: ["cod", "zalopay"], required: true },
    note: { type: String, default: "" },
    voucherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "voucher",
      default: null,
    },
    order_status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("order", orderSchema);
