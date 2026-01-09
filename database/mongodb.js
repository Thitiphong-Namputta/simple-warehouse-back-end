import mongoose from "mongoose";
import { DB_URI } from "../config/env.js";

const connectToDatabase = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log("Connected to MongoDB database");
  } catch (error) {
    console.error("Error connecting to MongoDB database:", error);
    process.exit(1);
  }
};

export default connectToDatabase;
