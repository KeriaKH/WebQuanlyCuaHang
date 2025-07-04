const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  province: { type: String, required: true },
  district: { type: String, required: true },
  ward: { type: String, required: true },
  name: { type: String, required: true },
  phone_number: { type: String, required: true },
  detailed_address: { type: String, required: true },
});

module.exports=mongoose.model('address',addressSchema)