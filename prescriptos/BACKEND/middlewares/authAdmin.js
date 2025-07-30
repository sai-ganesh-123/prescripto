import jwt from "jsonwebtoken";

// admin authentication middleware

const authAdmin = async (req, res, next) => {
  try {
    const { atoken } = req.headers;
    if (!atoken) {
      return res
        .status(400)
        .json({ success: false, message: "No token provided" });
    }
    const token_decode = jwt.verify(atoken, process.env.JWT_SECRET);
    if (token_decode === process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      next();
    } else {
      return res.status(400).json({ success: false, message: "Invalid token" });
    }
  } catch (error) {
    console.log("Error authenticating admin:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
export default authAdmin;
