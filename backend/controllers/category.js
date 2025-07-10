const Category = require("../models/category");

const getCategory = async (req, res) => {
  try {
    const categories = await Category.find();
    return res.status(200).json({ categories });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const addCategory = async (req, res) => {
  const {categoryName}=req.body
  try {
    const category = await Category.create({categoryName});
    return res.status(200).json( category );
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const deleteCategory = async (req, res) => {
  const {id}=req.params
  try {
    await Category.findByIdAndDelete(id);
    return res.status(200).json({ message:"Thành công" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports={getCategory,addCategory,deleteCategory}
