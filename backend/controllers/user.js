const User = require("../models/user");

const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (await User.findOne({ email }))
      return res.status(400).json({ message: "email đã tồn tại" });
    const user = await User.create({ name, email, password });
    return res
      .status(200)
      .json({ id: user._id, name: user.name, email: user.email });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: err.message });
  }
};

const getUserbyId = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (user)
      return res.status(200).json({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
    return res.status(404).json({ message: "không tìm thấy user" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: err.message });
  }
};

const addCartItem = async (req, res) => {
  const { cartItem, id } = req.body;
  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "không tìm thấy user" });
    user.cart.push(cartItem);
    await user.save();
    return res
      .status(200)
      .json({ message: "Thêm món ăn vào giỏ hàng thành công" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const getCart = async (req, res) => {
  const { id } = req.params;
  try {
    const cart = await User.findById(id).select("cart").populate("cart.dishId");
    const subtotal=cart.cart.reduce((total, item) =>  total+ item.dishId.price * item.quantity , 0);
    console.log(subtotal);
    if (!cart)
      return res.status(404).json({ message: "không tìm thấy giỏ hàng" });
    return res.status(200).json({ cart:cart.cart,subtotal });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { signUp, addCartItem,getCart };
