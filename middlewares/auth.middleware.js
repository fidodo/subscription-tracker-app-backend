import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { JWT_SECRET_KEY } from "../config/env.js";

const authorize = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access, no token provided",
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET_KEY);

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access, user not found",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Unauthorized access",
      error: error.message || "An error occurred during authorization",
    });
  }
};

export default authorize;
