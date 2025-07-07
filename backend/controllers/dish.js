const Dish = require("../models/dish");
const Category = require("../models/category");
const Review = require("../models/review");

const getDish = async (req, res) => {
  const {
    page = 1,
    limit = 10,
    search = "",
    sortBy = "createdAt",
    sortOrder = -1,
    category = "Tất cả",
  } = req.query;
  try {
    const filter = {};
    filter.name = { $regex: search, $options: "i" };
    if (category !== "undefined" && category !== "Tất cả") {
      const foundCategory = await Category.findOne({ categoryName: category });
      if (!foundCategory)
        return res.status(404).json({ error: "Không tìm thấy category" });
      filter.categoryId = foundCategory._id;
    }

    const sort = {
      [sortBy]: Number(sortOrder),
    };

    const skip = (page - 1) * limit;

    const dishs = await Dish.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));

    const count = await Dish.countDocuments(filter);

    const dishsWithReviews = await Promise.all(
      dishs.map(async (dish) => {
        const reviews = await Review.find({ dishId: dish._id });
        const reviewCount = reviews.length;
        const star =
          reviewCount === 0
            ? 0
            : reviews.reduce((sum, r) => sum + r.star, 0) / reviewCount;

        return {
          ...dish._doc,
          reviewCount,
          star: Number(star.toFixed(1)),
        };
      })
    );

    return res.status(200).json({ count, dishs: dishsWithReviews });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const getDishbyId = async (req, res) => {
  const { id } = req.params;
  try {
    const dish = await Dish.findById(id);
    if (!dish)
      return res.status(404).json({ message: "không tìm thấy món ăn" });
    return res.status(200).json({ dish });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getDish,
  getDishbyId,
};
