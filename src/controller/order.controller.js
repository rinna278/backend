const {
  place_order,
  find_orderById,
  shipped_order,
  delivered_order,
  inprogress_order,
  find_allOrderByUser,
  find_all_order,
  cancelled_order,
  update_orderStatus,
} = require("../service/order.service");

const placeOrder = async (req, res) => {
  try {
    const { userId } = req.body;

    await place_order(userId, req.body);

    res
      .status(200)
      .json({ success: true, message: "place order successfully" });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ success: false, message: "Error" });
  }
};

const findAllOrder = async (req, res) => {
  try {
    const orders = await find_all_order();

    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Error" });
  }
};

const findOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await find_orderById(id);

    res.status(200).json({ success: true, order });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ success: false, message: "Error" });
  }
};

const findAllOrderByUser = async (req, res) => {
  try {
    const { userId } = req.body;

    const orders = await find_allOrderByUser(userId);

    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ success: false, message: "Error" });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { id } = req.body;
    await update_orderStatus(id, req.body);
    res.status(200).json({ success: true, message: "update successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error" });
  }
};

module.exports = {
  placeOrder,
  findOrderById,
  findAllOrderByUser,

  findAllOrder,
  updateStatus,
};
