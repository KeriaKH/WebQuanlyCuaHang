const jwt = require("jsonwebtoken");
const user = require("../models/user");

const createToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const User = await user.findOne({ email });
    console.log(User);
    if (!User) {
      return res.status(404).json({ error: "email không tồn tại" });
    }
    if (!(await User.comparePassword(password))) {
      return res.status(400).json({ error: "Sai mật khẩu" });
    }

    return res.status(200).json({ User, token: createToken(User) });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { login };
