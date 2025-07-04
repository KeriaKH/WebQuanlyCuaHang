const mongoose = require("mongoose");

const dishSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    price: { type: Number, require: true },
    image: { type: String, default: "" },
    description: { type: String, require: false },
    categoryId: { type: mongoose.Schema.Types.ObjectId, require: true },
    available: { type: Boolean, require: true, default: false },
    option: [
      {
        optionName: { type: String, required: true },
        choices: [
          {
            name: { type: String, required: true },
            price: { type: Number, required: true },
          },
        ],
        _id: false,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("dish", dishSchema);
