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
        ...order.toObject(),
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

const getDashboarData = async (req, res) => {
  try {
    const order = await Order.find({ order_status: "delivered" });
    console.log(order);

    const totalOrder = order.length;
    const deliveryOrder = await Order.countDocuments({
      order_status: "shipped",
    });
    const now = new Date();

    const startOfToday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );
    const endOfToday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1
    );

    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    const todayOrder = await Order.countDocuments({
      createdAt: { $gte: startOfToday, $lt: endOfToday },
    });

    const monthOrderData = await Order.find({
      order_status: "delivered",
      createdAt: { $gte: startOfMonth, $lt: endOfMonth },
    });

    const monthOrder = monthOrderData.length;

    const totalRevenue = order.reduce((sum, orderDoc) => {
      const itemTotal = orderDoc.orderItem.reduce((orderSum, item) => {
        const optionTotal =
          item.selectedOptions?.reduce(
            (optSum, opt) => optSum + opt.price,
            0
          ) || 0;
        return orderSum + (item.price + optionTotal) * item.quantity;
      }, 0);
      return sum + itemTotal;
    }, 0);

    const monthRevenue = monthOrderData.reduce((sum, orderDoc) => {
      const itemTotal = orderDoc.orderItem.reduce((orderSum, item) => {
        const optionTotal =
          item.selectedOptions?.reduce(
            (optSum, opt) => optSum + opt.price,
            0
          ) || 0;
        return orderSum + (item.price + optionTotal) * item.quantity;
      }, 0);
      return sum + itemTotal;
    }, 0);

    return res.status(200).json({
      totalOrder,
      todayOrder,
      deliveryOrder,
      monthOrder,
      totalRevenue,
      monthRevenue,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { checkout, getOrderByUserId, getOrderByid, getDashboarData };
