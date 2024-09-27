const express = require("express");
const {
  createProduct,
  getAllProduct,
  getProductById,
  deleteProductById,
  updateProduct,
} = require("../controller/product.controller");
const Router = express.Router();
const { isAdmin } = require("../middleware/auth.js");
const upload = require("../middleware/multer.js");


// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./src/uploads");
//   },

//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "_" + file.originalname;
//     cb(null, file.fieldname + "-" + uniqueSuffix);
//   },
// });

// const upload = multer({ storage: storage });

Router.post("/createProduct", isAdmin, upload.single("image"), createProduct);
Router.get("/", getAllProduct);
Router.get("/:id", getProductById);
Router.delete("/delete", isAdmin, deleteProductById);
Router.patch("/update/:id", isAdmin, upload.single("image"), updateProduct);

module.exports = Router;
