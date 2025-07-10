const Dish=require('../models/dish')
const Order = require("../models/order");
const User = require("../models/user");
const Voucher = require("../models/voucher");

const checkout = async (req, res) => {
  const { orderData } = req.body;
  try {
    console.log(orderData)
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
  const { page, limit, delivered } = req.query;
  try {
    console.log(delivered);
    const skip = (page - 1) * limit;
    const order = await Order.find({
      userId: id,
      order_status: delivered === "1" ? "delivered" : { $ne: "delivered" },
    })
      .populate("orderItem.dishId")
      .skip(skip)
      .limit(limit);
    const count = order.length;
    return res.status(200).json({ order, count });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const getOrder = async (req, res) => {
  const {
    status,
    sortBy = "createdAt",
    sortOrder = -1,
    search,
    page,
    limit,
  } = req.query;
  try {
    const filter = {};
    if (status !== "all") filter.order_status = status;
    if (search !== "") filter._id = { $regex: search, $option: "i" };

    const sort = {
      [sortBy]: Number(sortOrder),
    };

    const skip = (page - 1) * limit;

    const order = await Order.find(filter)
      .populate({ path: "userId", select: "-password -cart -address -role" })
      .sort(sort)
      .skip(skip)
      .limit(limit);
    const count = order.length;
    return res.status(200).json({ order, count });
  } catch (error) {}
};

const getOrderByid = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findById(id)
      .populate({
        path: "userId",
        select: "-address -cart -password -__v",
      })
      .populate("voucherId");
    if (!order)
      return res.status(404).json({ message: "không tìm thấy order" });
    return res.status(200).json(order);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const getDashboarData = async (req, res) => {
  try {
    const order = await Order.find({ order_status: "delivered" });

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

    const totalRevenue = order.reduce(
      (sum, orderDoc) => sum + orderDoc.summary,
      0
    );

    const monthRevenue = monthOrderData.reduce(
      (sum, orderDoc) => sum + orderDoc.summary,
      0
    );

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

const confirmOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findByIdAndUpdate(id, {
      order_status: "cooking",
    });
    res.status(200).json({ message: "thành công" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  checkout,
  getOrderByUserId,
  getOrderByid,
  getDashboarData,
  getOrder,
  confirmOrder,
};
