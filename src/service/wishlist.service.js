const Wishlist = require("../model/wishlist.model.js");

const addWishlist = async (userId, reqData) => {
  const wish = new Wishlist({
    user: userId,
    product: reqData.product,
    color: reqData.color,
    size: reqData.size,
  });
  return await wish.save();
};

const findAllWish = async (userId) => {
  const wishlist = await Wishlist.find({ user: userId }).populate("product");
  return wishlist;
};

const deleWish = async (id) => {
  return await Wishlist.findByIdAndDelete(id);
};
module.exports = { addWishlist, findAllWish, deleWish };
