import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    const mongoURI =
      // "mongodb+srv://vishesh:GxlcOW6dF7teBrgD@cluster0.5s1tgsv.mongodb.net/?retryWrites=true&w=majority";
       "mongodb+srv://backslashsc:e0iGWiNjV3DrTaZh@bcs.b0wcftl.mongodb.net/?retryWrites=true&w=majority"
      // "mongodb+srv://Vaibhav_sun:ePYr2cxDTD3CtVb6@cluster0.vbtftbr.mongodb.net/?retryWrites=true&w=majority";
      mongoose.connect(mongoURI);

    const connection = mongoose.connection;
    connection.on(
      "error",
      console.error.bind(console, "MongoDB connection error:")
    );
    connection.once("open", () => {
      console.log("Connected to MongoDB Atlas");
    });
  } catch (error) {
    console.error("MONGODB Connection error", error);
    process.exit(1);
  }
};

export default connectDB;
