const Rating = require("../model/rating.model.js");
const Product = require("../model/product.model.js");
const { findProductById } = require("./product.service");

const create_rating = async (reqData, userId) => {
  const product = await findProductById(reqData.productId);
   
  const rating = await new Rating({
    user: userId,
    product: product._id,
    rating: reqData.rating,
  }).save();

  product.ratings.push(rating._id);

  await product.save();

  return rating;
};

const findAllRating = async (productId) => {
  const product = await findProductById(productId);
  const ratings = await Rating.find({ product: productId }).populate("user");
  product.numberRating =
    ratings.reduce((sum, rating) => sum + rating.rating, 0) / ratings.length;
  await product.save();

  return ratings;
};

module.exports = { create_rating, findAllRating };
