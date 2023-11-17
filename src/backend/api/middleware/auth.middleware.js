import jwt from "jsonwebtoken";
import { User } from "../models/user.js";
import dotenv from "dotenv";
dotenv.config();

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({ _id: decoded._id });

    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;

    next();
  } catch (e) {
    res.status(401).send({ message: "Por favor, faça login para continuar." });
  }
};

export const adminMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({ _id: decoded._id, admin: true });

    if (!user) {
      throw new Error("You are not the admin");
    }

    req.token = token;
    req.user = user;

    next();
  } catch (e) {
    res.status(401).send({ message: "Por favor, faça login para continuar." });
  }
};
