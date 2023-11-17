import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDb = () => {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log("Connected to MongoDB!");
    })
    .catch((error) => {
      console.log("Error: ", error);
    });
};

export default connectDb;
