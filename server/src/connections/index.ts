import mongoose from "mongoose";

const { MONGODB_URI } = process.env;

export function dbConnection() {
  try {
    if (!MONGODB_URI) {
      console.error("mongodb uri missing!");
    }
    mongoose.connect(MONGODB_URI as string);
    console.log("mongodb connection established!");
  } catch (error) {
    console.log("database connection error!", error);
  }
}
