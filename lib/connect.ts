/* eslint-disable @typescript-eslint/no-explicit-any */

import mongoose from "mongoose";

const MONGODB_URL = "mongodb+srv://simonadjei70:kanasset@cluster0.zn12f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
console.log(MONGODB_URL);


let isConnected = false; // Track connection status

export const connectToDB = async () => {
  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  if (!MONGODB_URL) {
    throw new Error("MONGODB_URL is missing");
  }

  try {
    const connection = await mongoose.connect(MONGODB_URL, {
      dbName: "testing-mentee",
     
      
    });

    isConnected = true; // Set the connection status
    console.log(`MongoDB connected to ${connection.connection.host}`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    throw new Error("Failed to connect to MongoDB");
  }
};
