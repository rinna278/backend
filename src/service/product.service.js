const Product = require("../model/product.model.js");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;

const create_product = async (reqData, imagePath) => {
  reqData.stock = JSON.parse(reqData.stock);
  
  const sizes = reqData.stock?.map((item) => item.size);
  const colors = reqData.stock?.map((item) => item.color);
  const quantity = reqData.stock?.reduce((acc, cur) => {
    return acc + parseFloat(cur.quantity);
  }, 0);

  const imageUrl = await cloudinary.uploader.upload(imagePath, {
    resource_type: "image",
  });
  
  const product = new Product({
    title: reqData.title,
    description: reqData.description,
    price: reqData.price,
    quantity: quantity,
    brand: reqData.brand,
    colors: colors,
    stock: reqData.stock,
    image: imageUrl.secure_url,
    sizes: sizes,
    category: reqData.category,
  });
  return await product.save();
};

const delete_product = async (productId) => {
  const product = await Product.findById(productId);

  fs.unlink(`src/uploads/${product.image}`, () => {});

  return await Product.findByIdAndDelete(productId);
};

const update_product = async (productId, reqData, image) => {
  reqData.stock = JSON.parse(reqData.stock);

  const product = await Product.findById(productId);
  const newProduct = await Product.findByIdAndUpdate(product._id, {
    ...reqData,
    image: image,
  });
  return newProduct;
};  

const findProductById = async (productId) => {
  return await Product.findById(productId).populate({
    path: "category",
    populate: {
      path: "parentCategory",
    },
  });
};

const findAllProduct = async () => {
  return await Product.find().populate({
    path: "category",
    populate: {
      path: "parentCategory",
    },
  });
};

module.exports = {
  create_product,
  delete_product,
  update_product,
  findProductById,
  findAllProduct,
};
