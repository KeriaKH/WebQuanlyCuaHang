const Review = require("../models/review");

const getReview = async (req, res) => {
  const { id } = req.params;
  const { page = 1, limit = 5, star } = req.query;
  try {
    const filter = {};
    if (star > 0) filter.star = star;
    filter.dishId = id;
    const skip = (page - 1) * limit;

    const reviews = await Review.find(filter)
      .select("-_id")
      .populate("userId", "name email avatar -_id")
      .skip(skip)
      .limit(parseInt(limit));
    const count = await Review.countDocuments(filter);
    const allReviews = await Review.find({ dishId: id });
    const starCount = {};
    for (let i = 1; i <= 5; i++) {
      starCount[i] = allReviews.filter((r) => r.star === i).length;
    }
    const totalStar = allReviews.reduce((sum, r) => sum + r.star, 0);
    return res.status(200).json({
      data: reviews,
      count: count,
      star: totalStar / count,
      starCount,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const addReview = async (req, res) => {
  const reviewData = req.body;
  try {
    const review = await Review.create(reviewData);
    if (!review) return res.status(404).json({ message: "thất bại" });
    return res.status(200).json(review);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getReview,addReview };
