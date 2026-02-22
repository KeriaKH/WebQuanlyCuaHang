const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const dishRoute = require("./routes/dish");
const categoryRoute = require("./routes/category");
const reviewRoute = require("./routes/review");
const voucherRoute = require("./routes/voucher");
const orderRoute = require("./routes/order");
const cloudinaryRoute = require("./routes/cloudinary");

dotenv.config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost",
    credentials: true,
  })
);

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/dish", dishRoute);
app.use("/api/category", categoryRoute);
app.use("/api/review", reviewRoute);
app.use("/api/voucher", voucherRoute);
app.use("/api/order", orderRoute);
app.use("/api/cloudinary", cloudinaryRoute);

const Port = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(Port, () => {
      console.log(`🚀 Server running on http://localhost:${Port}`);
      console.log("🔗 Connected URI:", process.env.MONGO_URI);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });
