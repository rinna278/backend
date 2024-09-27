const { create_review, findAllReview } = require("../service/review.service");

const createReview = async (req, res) => {
  try {
    const { userId } = req.body;

    await create_review(req.body, userId);

    res
      .status(201)
      .json({ success: true, message: "create review successfully" });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ success: false, message: error.message });
  }
};

const getAllReview = async (req, res) => {
  try {
    const {id}=req.params
    const reviews = await findAllReview(id);

    res.status(200).json({ success: true, reviews });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createReview, getAllReview };
