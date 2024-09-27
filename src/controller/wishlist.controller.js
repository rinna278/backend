const {
  addWishlist,
  findAllWish,
  deleWish,
} = require("../service/wishlist.service.js");

const add_wishlish = async (req, res) => {
  try {
    const { userId } = req.body;
    await addWishlist(userId, req.body);
    res.status(201).json({ success: true, message: "Added" });
  } catch (error) {
    console.log(error);
  }
};

const getAllWish = async (req, res) => {
  try {
    const { userId } = req.body;
    const wishlist = await findAllWish(userId);
    res.status(200).json({ success: true, wishlist });
  } catch (error) {
    console.log(error);
  }
};

const deleteWish = async (req, res) => {
  try {
    const { id } = req.body;
    await deleWish(id);
    res.status(200).json({ success: true, message:"Deleted" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { add_wishlish, getAllWish ,deleteWish};
