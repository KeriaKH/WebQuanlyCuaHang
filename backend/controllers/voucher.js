const Voucher = require("../models/voucher");

const getVoucher = async (req, res) => {
  const { id } = req.params;
  try {
    const voucher = await Voucher.find({ usedBy: { $ne: id } });
    return res.status(200).json({ voucher });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const getAllVoucher = async (req, res) => {
  try {
    const voucher = await Voucher.find();
    return res.status(200).json(voucher);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const addVoucher = async (req, res) => {
  const voucherData = req.body;
  try {
    const voucher = await Voucher.create(voucherData);
    return res.status(200).json(voucher);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const updateVoucher = async (req, res) => {
  const { id } = req.params;
  const voucherData = req.body;
  try {
    const voucher = await Voucher.findByIdAndUpdate(id, voucherData);
    if (!voucher) {
      return res.status(404).json({ message: "Không tìm thấy voucher" });
    }
    return res.status(200).json(voucher);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const deleteVoucher = async (req, res) => {
  const { id } = req.params;
  try {
    const voucher = await Voucher.findByIdAndDelete(id);
    if (!voucher) {
      return res.status(404).json({ message: "Không tìm thấy voucher" });
    }
    return res.status(200).json({ message: "thành công" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getVoucher, addVoucher, updateVoucher, deleteVoucher,getAllVoucher };
