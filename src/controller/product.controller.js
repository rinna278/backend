const {
  create_product,
  findAllProduct,
  findProductById,
  delete_product,
  update_product,
} = require("../service/product.service.js");
const cloudinary = require("cloudinary").v2;

const createProduct = async (req, res) => {
  try {
    const imagePath = req.file.path;
    await create_product(req.body, imagePath);

    res
      .status(201)
      .json({ success: true, message: "create product successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Error" });
  }
};

const getAllProduct = async (req, res) => {
  try {
    const products = await findAllProduct();
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Error" });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await findProductById(id);

    res.status(200).json({ success: true, product });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ success: false, message: "Error" });
  }
};

const deleteProductById = async (req, res) => {
  try {
    await delete_product(req.body._id);
    res
      .status(200)
      .json({ success: true, message: "delete product successfully" });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ success: false, message: "Error" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await findProductById(id);
    let imageUrl;
    if (req.file) {
      const imagePath = req.file.path; 
      const result = await cloudinary.uploader.upload(imagePath); 
      imageUrl = result.secure_url; 
    } else {
      imageUrl = product.image; 
    }

    await update_product(id, req.body, imageUrl);
    res
      .status(200)
      .json({ success: true, message: "update product successfully" });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ success: false, message: error.message });
  }
};
module.exports = {
  createProduct,
  getAllProduct,
  getProductById,
  updateProduct,
  deleteProductById,
};
