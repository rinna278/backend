const express = require("express");
const { authMiddleware, isAdmin } = require("../middleware/auth.js");
const {
  placeOrder,
  findOrderById,
  findAllOrderByUser,
  findAllOrder,
  updateStatus
} = require("../controller/order.controller.js");

const Router = express.Router();

Router.post("/placeOrder", authMiddleware, placeOrder);
Router.get("/allOrder", isAdmin, findAllOrder);
Router.get("/:id", authMiddleware, findOrderById);
Router.get("/", authMiddleware, findAllOrderByUser);
Router.post("/updateStatus", authMiddleware, updateStatus);

module.exports = Router;
