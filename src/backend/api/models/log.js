import mongoose from "mongoose";
import { Schema } from "mongoose";

const logSchema = new Schema(
  {
    ip: {
      type: String,
      required: true,
    },
    method: {
      type: String,
      required: true,
    },
    responseCode: {
      type: Number,
      required: false,
    },
    url: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Log = mongoose.model("Log", logSchema);