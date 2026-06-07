import jwt from "jsonwebtoken";
import User from "../models/User.js";

/**
 * Protect routes by requiring a valid Bearer JWT. Attaches the authenticated
 * user (without password) to req.user.
 */
const protect = async (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  }

  if (!token) {
    res.status(401);
    return next(new Error("Not authorized, no token provided"));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      res.status(401);
      return next(new Error("Not authorized, user not found"));
    }
    req.user = user;
    return next();
  } catch {
    res.status(401);
    return next(new Error("Not authorized, token failed"));
  }
};

export default protect;
