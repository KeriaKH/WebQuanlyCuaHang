const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  province: { type: String, required: true },
  district: { type: String, required: true },
  ward: { type: String, required: true },
  title: { type: String, required: true },
  default: { type: Boolean, default: false },
  detailed_address: { type: String, required: true },
  phone:{type:String,require:true}
});

module.exports=mongoose.model('address',addressSchema)