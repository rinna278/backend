const Category = require("../model/category.model.js");
const Product = require("../model/product.model.js");
const { delete_product, findAllProduct } = require("./product.service.js");
const create_category = async (reqData) => {
  let firstLevel = await Category.findOne({ name: reqData.firstLevelCategory });

  if (!firstLevel) {
    firstLevel = await new Category({
      name: reqData.firstLevelCategory,
      level: 1,
    }).save();
  }

  let secondLevel = await Category.findOne({
    name: reqData.secondLevelCategory,
    parentCategory: firstLevel._id,
  });

  if (!secondLevel) {
    secondLevel = await new Category({
      name: reqData.secondLevelCategory,
      level: 2,
      parentCategory: firstLevel._id,
    }).save();
  }
  return secondLevel;
};

const findAllCategory = async () => {
  const category = await Category.find().populate("parentCategory");
  return category;
};

const findCategoryById = async (id) => {
  const category = await Category.findById(id).populate("parentCategory");
  return category;
};

const updataCategory = async (id, reqData) => {
  const category = await findCategoryById(id);

  category.name = reqData.name;
  category.parentCategory = reqData.parentCategory;

  const newCategory = await category.save();
  console.log(newCategory);

  return newCategory;
};

const delete_Category = async (id) => {
  const category = await Category.findById(id);
  console.log(JSON.stringify(category._id));

  const products = await findAllProduct();
  const product = products.filter(
    (item) => JSON.stringify(item.category._id) === JSON.stringify(category._id)
  );
  console.log(product);

  product.forEach((element) => {
    delete_product(element._id);
  });
  await Category.findByIdAndDelete(category._id)
};
module.exports = {
  create_category,
  findCategoryById,
  findAllCategory,
  delete_Category,
  updataCategory,
};
