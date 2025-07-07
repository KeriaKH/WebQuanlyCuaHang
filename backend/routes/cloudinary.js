const express = require("express");
const router = express.Router();
const upload = require("../cloudinary/upload");

router.post("/upload", upload.single("image"), (req, res) => {
  try {
    return res.status(200).json({
      message: "Upload thành công",
      imageUrl: req.file.path,
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi upload", error });
  }
});

module.exports = router;
