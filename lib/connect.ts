/* eslint-disable @typescript-eslint/no-explicit-any */

import mongoose from "mongoose";

const MONGODB_URL = "mongodb+srv://simonadjei70:ZHGEos0zxxZVNcBJ@cluster0.zjh2f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
console.log(MONGODB_URL);


const cached = (global as any).mongoose || { conn: null, promise: null }

export const connectToDB = async () => {
  if (cached.conn) return cached.conn;

  if (!MONGODB_URL) throw new Error("MONGODB_URL is missing")

  cached.promise =
    cached.promise ||
    mongoose.connect(MONGODB_URL, {
      dbName: "testing-mentee",
      bufferCommands: false,
      connectTimeoutMS: 40000,
    });

  cached.conn = await cached.promise;

  return cached.conn;
};