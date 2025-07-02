import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) {
      return res.status(401).json({ success: false, message: "Access Denied. No token provided." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRETS);
    req.user = decoded; // Add user info to request
    next(); // Allow access
  } catch (error) {
    res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};
