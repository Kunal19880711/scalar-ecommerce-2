import jwt from "jsonwebtoken";

const validateJWTToken = (req, res, next) => {
  try {
    const token = req.cookies[process.env.SESSION_COOKIE_NAME];
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "No Token Found" });
    }
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const currentTime = Math.floor(Date.now() / 1000);
    if (decodedToken.exp < currentTime) {
      return res.status(401).json({ success: false, message: "Token Expired" });
    }
    req.body.user = decodedToken;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ success: false, message: "Invalid/Expired Token" });
  }
};

export default validateJWTToken;
