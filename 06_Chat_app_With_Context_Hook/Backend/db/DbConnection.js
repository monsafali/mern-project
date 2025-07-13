import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    const makeConnection = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      "Mongodb Succesfuly connection to the project at ",
      makeConnection.connection.host
    );
  } catch (error) {
    console.log(`Error accured while making connection on db`, error.message);
    process.exit(1);
  }
};

export default dbConnection;
