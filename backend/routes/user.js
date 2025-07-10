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
const router = express.Router();

router.post("/signUp", signUp);
router.get('/',getUser)
router.get("/:id", getUserbyId);
router.put('/update/:id',updateUser)
router.post("/cart/add", addCartItem);
router.get("/cart/:id", getCart);
router.put("/cart/update", updateCartItem);
router.delete("/cart/delete", deleteCart);
router.post("/:id/address/add", addAddress);
router.get("/:id/address", getAddrress);
router.delete("/:id/address/delete/:addressId", deleteAddress);
router.put("/:id/address/update", updateAddress);


module.exports = router;
