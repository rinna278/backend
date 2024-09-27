const { create_rating, findAllRating } = require("../service/rating.service");


const createRating = async (req, res) => {
  try {
    const { userId } = req.body;

    await create_rating(req.body, userId);

    res
      .status(201)
      .json({ success: true, message: "create rating successfully" });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ success: false, message: error.message });
  }
};

const getAllRating= async (req, res) => {
  try {
    const {id}=req.params
    const ratings = await findAllRating(id);

    res.status(200).json({ success: true, ratings });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createRating, getAllRating };
