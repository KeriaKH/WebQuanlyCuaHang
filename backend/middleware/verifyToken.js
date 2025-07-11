// middleware/verifyToken.js
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // dạng "Bearer <token>"

  if (!token) return res.status(401).json({ message: "Không có token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // giải mã
    req.user = decoded; // lưu thông tin user (id, role, ...)
    next(); // cho phép tiếp tục
  } catch (err) {
    return res.status(403).json({ message: "Token không hợp lệ" });
  }
};

const verifyAdmin = (req, res, next) => {
  if (req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Bạn không có quyền truy cập" });
  }
};


module.exports = {verifyToken,verifyAdmin};
