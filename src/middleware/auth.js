const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(404).json({ success: false, message: "Please login" });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    req.body.userId = decode.id;

    req.body.role = decode.role;

    next();
  } catch (error) {
    console.log(error);

    return res.status(500).json({ success: false, message: "Error token" });
  }
};

const isAdmin = async (req, res, next) => {
  await authMiddleware(req, res, () => {
    if (req.body.role === "ADMIN") {
      next();
    } else {
      return res
        .status(400)
        .json({ success: false, message: "no authorization" });
    }
  });
};

module.exports = { authMiddleware, isAdmin };
