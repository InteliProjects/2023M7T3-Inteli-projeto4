import { connect } from "mongoose";
import { Log } from "../models/log.js";
import dotenv from "dotenv";
dotenv.config();

// Data array containing seed data - documents organized by Model
var data = [
  {
    ip: "177.92.77.170",
    method: "/POST",
    responseCode: 200,
    url: "/url-test",
    location: "São Paulo",
  },
];

const addLog = async () => {
  for (let i in data) {
    try {
      const log = new Log(data[i]);
      await log.save();
      console.log("Log adicionado ao banco de dados");
    } catch (err) {
      console.log(err);
    }
  }
};

addLog()
