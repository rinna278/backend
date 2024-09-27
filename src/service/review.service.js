const Review = require("../model/review.model.js");
const { findProductById } = require("./product.service");

const create_review = async (reqData, userId) => {
  const product = await findProductById(reqData.productId);

  const review = await new Review({
    user: userId,
    product: product._id,
    review: reqData.review,
  }).save();

  product.reviews.push(review._id);

  await product.save();

  return review;
};

const findAllReview = async (productId) => {
  const reviews = await Review.find({product:productId}).populate("user");

  return reviews;
};

module.exports = { create_review, findAllReview };
