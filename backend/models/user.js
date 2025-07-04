const mongoose = require("mongoose");
const address=require('./address')
const bcrypt = require("bcryptjs");

const cartItemSchema = new mongoose.Schema(
  {
    dishId: { type: mongoose.Schema.Types.ObjectId,ref:'dish', require: true },
    quantity: { type: Number, required: true },
    note: { type: String, default: "" },
    selectedOptions:[
      {
        optionName:{ type: String, required: true },
        choiceName:{ type: String, required: true },
        price:{ type: Number, required: true }
      }
    ]
  },
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    avatar: { type: String, default: "https://jbagy.me/wp-content/uploads/2025/03/hinh-anh-cute-avatar-vo-tri-3.jpg" },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" },
    cart: [cartItemSchema],
    address: [address.schema],
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("user", userSchema);
