import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const dbconnection = async () => {
  try {
    const makeconnection = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      "Mongodb successfuly connected",
      makeconnection.connection.host
    );
  } catch (error) {
    console.log("Somethign went wrong", error);
    process.exit(1);
  }
};

export default dbconnection;
