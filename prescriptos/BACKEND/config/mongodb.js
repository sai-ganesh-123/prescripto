import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("DB CONNECTED");
    });
    await mongoose.connect(`${process.env.MONGODB_URI}/prescripto`);
  } catch (error) {
    console.error("Database connection error:", error);
  }
};

export default connectDB;
