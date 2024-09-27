const express = require("express");
const {
  getAllUser,
  getUserById,
  updateUser,
  deleteUser,
  getInfo,
  adminUpdate,
} = require("../controller/user.controller");
const Router = express.Router();
const { authMiddleware, isAdmin } = require("../middleware/auth.js");

Router.get("/", isAdmin, getAllUser);
Router.get("/info", authMiddleware, getInfo);
Router.get("/:id", isAdmin, getUserById);
Router.patch("/update", authMiddleware, updateUser);
Router.patch("/update/:id", isAdmin, adminUpdate);
Router.delete("/delete", isAdmin, deleteUser);

module.exports = Router;
