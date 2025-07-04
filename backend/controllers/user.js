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
    const existingItem = user.cart.find(
      (item) => item.dishId.toString() === cartItem.dishId.toString()
    );
    console.log(cartItem);
    console.log(existingItem);
    if (existingItem) {
      const checkOptions = existingItem.selectedOptions.every(
        (option, index) =>
          option.choiceName ===
          cartItem.selectedOptions[index].choiceName
      );
      if (checkOptions) {
        existingItem.quantity += cartItem.quantity;
        await user.save();
        return res
          .status(200)
          .json({ message: "cập nhật giỏ hàng thành công" });
      }
    }
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
    const subtotal = cart.cart.reduce(
      (total, item) =>
        total +
        item.dishId.price * item.quantity +
        item.selectedOptions.reduce((sum, option) => sum + option.price, 0),
      0
    );
    if (!cart)
      return res.status(404).json({ message: "không tìm thấy giỏ hàng" });
    return res.status(200).json({ cart: cart.cart, subtotal });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const updateCartItem = async (req, res) => {
  const { cartItem, id } = req.body;
  console.log(cartItem);
  try {
    const cart = await User.findById(id).select("cart");
    if (!cart)
      return res.status(404).json({ message: "không tìm thấy giỏ hàng" });
    console.log(cart);
    const existingItem = cart.cart.find(
      (item) => item._id.toString() === cartItem._id.toString()
    );
    if (existingItem) {
      existingItem.quantity = cartItem.quantity;
      existingItem.note = cartItem.note;
      existingItem.selectedOptions = cartItem.selectedOptions;
      await cart.save();
      return res.status(200).json({ message: "cập nhật giỏ hàng thành công" });
    }
    return res
      .status(404)
      .json({ message: "không tìm thấy món ăn trong giỏ hàng" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const deleteCart = async (req, res) => {
  const { id, cartItemId } = req.query;
  try {
    const cart = await User.findById(id).select("cart");
    if (!cart)
      return res.status(404).json({ message: "không tìm thấy giỏ hàng" });
    const initialLength = cart.cart.length;
    cart.cart = cart.cart.filter(
      (item) => item._id.toString() !== cartItemId.toString()
    );
    if (cart.cart.length === initialLength) {
      return res
        .status(404)
        .json({ message: "không tìm thấy món ăn trong giỏ hàng" });
    }
    await cart.save();
    return res.status(200).json({ message: "cập nhật giỏ hàng thành công" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { signUp, addCartItem, getCart, updateCartItem, deleteCart };
