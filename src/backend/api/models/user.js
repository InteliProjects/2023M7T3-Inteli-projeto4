import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import mongoose, { Schema } from "mongoose";
import validator from "validator";
dotenv.config();

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
      validator(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid.");
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minLenght: 6,
      maxLenght: 18,
    },
    department: {
      type: String,
      required: true,
      enum: ["Sales", "Marketing", "Technology"],
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
      required: false,
    },
    sexualIdentity: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      enum: ["Created", "Pending"],
      required: false,
    },
    admin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.methods.generateAuthToken = async function () {
  const user = this;

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: 2 * 60 * 60,
  });

  await user.save();

  return token;
};

userSchema.statics.findByCredentials = async function (email, password) {
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new Error("Não foi possivel entrar");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Não foi possivel entrar");
  }

  return user;
};

userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }

  next();
});

export const User = mongoose.model("User", userSchema);
