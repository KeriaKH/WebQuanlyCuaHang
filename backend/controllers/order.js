const Order = require("../models/order");
const User = require("../models/user");
const Voucher = require("../models/voucher");

const checkout = async (req, res) => {
  const { orderData } = req.body;
  try {
    console.log(orderData);
    const order = await Order.create(orderData);
    const user = await User.findById(orderData.userId);
    user.cart = [];
    await user.save();
    if (orderData.voucherId) {
      const voucher = await Voucher.findById(orderData.voucherId);
      voucher.usedBy.push(orderData.userId);
      await voucher.save();
    }
    return res.status(200).json(order);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const getOrderByUserId = async (req, res) => {
  const { id } = req.params;
  const { page, limit } = req.query;
  try {
    const skip = (page - 1) * limit;
    const order = await Order.find({ userId: id, order_status: "delivered" })
      .populate("orderItem.dishId")
      .skip(skip)
      .limit(limit);
    const count = await Order.countDocuments({ order_status: "delivered" });

    const ordersWithSummary = order.map((order) => {
      const summary = order.orderItem.reduce((total, item) => {
        const optionPrice =
          item.selectedOptions?.reduce(
            (optSum, opt) => optSum + opt.price,
            0
          ) || 0;
        return total + (item.price + optionPrice) * item.quantity;
      }, 0);

      return {
        ...order.toObject(), // chuyển từ mongoose document thành plain object để thêm field mới
        summary,
      };
    });
    return res.status(200).json({ order: ordersWithSummary, count });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const getOrderByid = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findById(id)
      .populate({
        path: "userId",
        select: "-address -cart -password -__v",
      })
      .populate("orderItem.dishId")
      .populate("voucherId");
    if (!order)
      return res.status(404).json({ message: "không tìm thấy order" });
    const orderWithSummary = {
      ...order.toObject(),
      summary: order.orderItem.reduce(
        (sum, item) =>
          sum +
          (item.price +
            item.selectedOptions.reduce((sum, r) => sum + r.price, 0)) *
            item.quantity,
        0
      ),
    };
    return res.status(200).json(orderWithSummary);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { checkout, getOrderByUserId, getOrderByid };
