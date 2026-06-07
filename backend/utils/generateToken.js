import jwt from "jsonwebtoken";

/**
 * Sign a JWT for the given user id.
 */
const generateToken = (userId) =>
  jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });

export default generateToken;
