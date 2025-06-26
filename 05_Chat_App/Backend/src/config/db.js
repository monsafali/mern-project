import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config();
export const conntectDb = async () => {
  try {
    const dbconnection = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      `MongoDB conntected successfuly at ${dbconnection.connection.host}`
    );
  } catch (error) {
    console.log("Mongdb Connted error ", error);
    process.exit(1);
  }
};
