import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const dbConnect = async () => {
  try {
    const mongoconnection = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      "MongoDB successfully connected:",
      mongoconnection.connection.host
    );
  } catch (error) {
    console.log("Something went wrong", error);
    process.exit(1);
  }
};

export default dbConnect;
