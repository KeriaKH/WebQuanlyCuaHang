const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema(
  {
    dishId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "dish",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    star: { type: Number, required: true },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports=mongoose.model('review',reviewSchema)
