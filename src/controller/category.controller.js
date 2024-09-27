const {
  create_category,
  findAllCategory,
  delete_Category,
  findCategoryById,
  updataCategory,
} = require("../service/category.service");

const createCategory = async (req, res) => {
  try {
    await create_category(req.body);
    res.status(201).json({ success: true, message: "Created" });
  } catch (error) {
    console.log(error);
  }
};
const getCategory = async (req, res) => {
  try {
    const category = await findAllCategory();
    res.status(200).json({ success: true, category });
  } catch (error) {
    console.log(error);
  }
};

const getCategoryById = async (req, res) => {
  try {
    const category = await findCategoryById(req.params.id);
    res.status(200).json({ success: true, category });
  } catch (error) {
    console.log(error);
  }
};

const update_category = async (req, res) => {
  try {
    const { id } = req.params;
    await updataCategory(id, req.body);
    res.status(200).json({ success: true, message: "Updated" });
  } catch (error) {
    console.log(error);
  }
};

const deleteCategory = async (req, res) => {
  try {
    await delete_Category(req.body.id);
    res.status(200).json({ success: true, message: "Deleted" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getCategoryById,
  createCategory,
  update_category,
  getCategory,
  deleteCategory,
};
