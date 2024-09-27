const Cart = require("../model/cart.model.js");
const CartItem = require("../model/cartItem.model.js");
const Product = require("../model/product.model.js");
const create_cart = async (userId) => {
  return await new Cart({ user: userId }).save();
};
const findUserCart = async (userId) => {
  let cart = await Cart.findOne({ user: userId }).populate({
    path: "cartItem",
    populate: {
      path: "product",
    },
  });

  let totalPrice = 0;
  let totalItem = 0;

  for (let cartItem of cart.cartItem) {
    totalItem += cartItem.quantity;
    totalPrice += cartItem.price*cartItem.quantity;
  }

  cart.totalPrice = totalPrice;
  cart.totalItem = totalItem;

  return await cart.save();
};

const addCartItem = async (userId, reqData) => {
  let cart = await Cart.findOne({ user: userId });

  const product = await Product.findById(reqData.productId);

  const isExistCart = await CartItem.findOne({
    product: reqData.productId,
    size: reqData.size,
    color: reqData.color,
    cart: cart._id,
  });

  if (isExistCart) {
    isExistCart.quantity += 1;

    await isExistCart.save();
  } else {
    let cartItem = await new CartItem({
      userId: userId,
      cart: cart._id,
      product: product,
      size: reqData.size,
      color: reqData.color,
      quantity: 1,
      price: product.price-product.discount,
    }).save();
    
    cart.cartItem.push(cartItem);
  }

  return await cart.save();
};

module.exports = { create_cart, findUserCart, addCartItem };
