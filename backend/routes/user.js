const express = require("express");
const {
  signUp,
  addCartItem,
  getCart,
  updateCartItem,
  deleteCart,
  addAddress,
  getAddrress,
  deleteAddress,
  updateAddress,
  getUserbyId,
  updateUser,
  getUser,
} = require("../controllers/user");
const { verifyAdmin, verifyToken } = require("../middleware/verifyToken");
const router = express.Router();

router.post("/signUp", signUp);
router.get("/", verifyToken, verifyAdmin, getUser);
router.get("/:id", verifyToken, getUserbyId);
router.put("/update/:id", verifyToken, updateUser);
router.post("/cart/add", verifyToken, addCartItem);
router.get("/cart/:id", verifyToken, getCart);
router.put("/cart/update", verifyToken, updateCartItem);
router.delete("/cart/delete", verifyToken, deleteCart);
router.post("/:id/address/add", verifyToken, addAddress);
router.get("/:id/address", verifyToken, getAddrress);
router.delete("/:id/address/delete/:addressId", verifyToken, deleteAddress);
router.put("/:id/address/update", verifyToken, updateAddress);

module.exports = router;
