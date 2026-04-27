import jwt from "jsonwebtoken";
import { createError } from "../middleware/errorHandling.js";

export const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw createError(401, "No token");
  }

  if (!authHeader.startsWith("Bearer ")) {
    throw createError(401, "Bearer token required");
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    throw createError(401, "Invalid token format");
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch (e) {
    if (e.name === "TokenExpiredError") {
      throw createError(401, "Token expired");
    }
    throw createError(403, "Invalid token");
  }
};
