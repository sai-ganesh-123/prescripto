import jwt from "jsonwebtoken";

const authDoc = async (req, res, next) => {
  try {
    const { dtoken } = req.headers; // Check spelling (case-sensitive)
    if (!dtoken) {
      return res.json({ success: false, message: "No token provided" });
    }
    const token_decode = jwt.verify(dtoken, process.env.JWT_SECRET);
    req.body.docId = token_decode.id;
    next();
  } catch (error) {
    console.log("Error authenticating Doctor:", error.message); // Log error
    res.json({ success: false, message: error.message });
  }
};

export default authDoc;
