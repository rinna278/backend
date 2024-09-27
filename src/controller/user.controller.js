const {
  findAllUser,
  findUserById,
  update_User,
  delete_User,
  admin_update,
} = require("../service/user.service.js");

const getAllUser = async (req, res) => {
  try {
    const users = await findAllUser();

    res.status(200).json({ success: true, users });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ success: false, message: "Error" });
  }
};

const getInfo = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await findUserById(userId);
    res.status(200).json({ success: true, user });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error" });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await findUserById(id);

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ success: false, message: "Error" });
  }
};

const updateUser = async (req, res) => {
  try {
    const { userId } = req.body;

    await update_User(userId, req.body);

    res.status(200).json({ success: true, message: "update successfully" });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ success: false, message: error.message });
  }
};
const adminUpdate = async (req, res) => {
  try {
    const { id } = req.params;

    await admin_update(id, req.body);

    res.status(200).json({ success: true, message: "Updated" });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ success: false, message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.body;

    await delete_User(id);

    res.status(200).json({ success: true, message: "Deleted" });
  } catch (error) {
    console.log(error);

    res.status(500).json({ success: false, message: "Error" });
  }
};

module.exports = { getAllUser, getUserById, getInfo, updateUser, deleteUser ,adminUpdate};
