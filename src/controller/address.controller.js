const {
  create_address,
  update_address,
  remove_address,
  find_Address_By_Id,
  find_All_Address_ByUserId,
} = require("../service/address.service");
const { findUserById } = require("../service/user.service");

const createAddress = async (req, res) => {
  try {
    const { userId } = req.body;

    await create_address(userId, req.body);

    res
      .status(201)
      .json({ success: true, message: "create address successfully" });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ success: false, message: error.message });
  }
};

const updateAddress = async (req, res) => {
  try {
    const { userId } = req.body;

    const { id } = req.params;

    let address = await find_Address_By_Id(id);

    const user = await findUserById(address.user);

    if (user._id.toString() !== userId.toString()) {
      return res
        .status(400)
        .json({ success: false, message: "no authorization" });
    }

    await update_address(id, req.body);

    res
      .status(200)
      .json({ success: true, message: "update address successfully" });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ success: false, message: error.message });
  }
};

const removeAddress = async (req, res) => {
  try {
    const address = await find_Address_By_Id(req.body);

    await remove_address(address._id);

    res
      .status(200)
      .json({ success: true, message: "delete address successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const findAddressById = async (req, res) => {
  try {
    const {id}=req.params
    
    const address = await find_Address_By_Id(id);

    res.status(200).json({ success: true, address });
  } catch (error) {
    console.log(error);
    
    return res.status(500).json({ success: false, message: error.message });
  }
};

const findAllAddressByUserId = async (req, res) => {
  try {
    const { userId } = req.body;

    const addresses = await find_All_Address_ByUserId(userId);

    res.status(200).json({ success: true, addresses });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  findAddressById,
  findAllAddressByUserId,
  createAddress,
  removeAddress,
  updateAddress,
};
