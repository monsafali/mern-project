import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connted ${conn.connection.host}`);
  } catch (error) {
    console.log("Something went wrong while makeing conneciton", error.message);
    process.exit(1);
  }
};
