const Address = require("../model/address.model.js");
const { findUserById } = require("./user.service.js");

const create_address = async (userId, reqData) => {
  const user = await findUserById(userId);

  const address = await new Address({
    user: user._id,
    mobile: reqData.mobile,
    state: reqData.state,
    lastname: reqData.lastname,
    firstname: reqData.firstname,
    country: reqData.country,
    city: reqData.city,
    apartment: reqData.apartment,
    streetAddress: reqData.streetAddress,
    deliInstruction: reqData.deliInstruction,
  }).save();

  user.address.push(address);

  await user.save();

  return address;
};

const update_address = async (idAddress, reqData) => {
  const address = await Address.findByIdAndUpdate(idAddress, reqData);

  return await address.save();
};

const remove_address = async (idAddress) => {
  const address = await find_Address_By_Id(idAddress);

  await Address.findByIdAndDelete(address._id);

  return address;
};

const find_All_Address_ByUserId = async (userId) => {
  const addresses = await Address.find({ user: userId });

  return addresses;
};

const find_Address_By_Id = async (idAddress) => {
  const address = await Address.findById(idAddress);

  return address;
};

module.exports = {
  find_Address_By_Id,
  find_All_Address_ByUserId,
  update_address,
  create_address,
  remove_address,
};
