import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { createError } from "../middleware/errorHandling.js";

const genrateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE,
    },
  );
};

export const register = async (req, res) => {
  const { userName, email, password, role } = req.body;

  if (!userName || !email || !password) {
    throw createError(400, "User name, email, and password are required");
  }

  const usr = await User.findOne({ email });

  if (usr) {
    throw createError(409, "User already exists");
  }

  const user = await User.create({ userName, email, password, role });
  const token = genrateToken(user);

  const { password: _, ...userWithoutPassword } = user.toObject();

  res
    .status(201)
    .json({ success: true, user: userWithoutPassword, token, role });
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw createError(400, "Email and password are required");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw createError(401, "Invalid email or password");
  }

  const isPassR = await user.comparePassword(password);

  if (!isPassR) {
    throw createError(401, "Invalid email or password");
  }

  const token = genrateToken(user);

  res
    .status(200)
    .json({ success: true, user, token, message: "Login successfully" });
};
