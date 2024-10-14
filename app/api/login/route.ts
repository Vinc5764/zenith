/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectToDB } from "@/lib/connect";
import User from "@/app/api/model/user.model";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY || "your-secret-key"; // Replace with your actual secret key

export const POST = async (req: any) => {
  try {
    // Parse incoming JSON data from the request body
    const { email, password } = await req.json();

    // Connect to MongoDB database
    await connectToDB();

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Create a JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      SECRET_KEY,
      {
        expiresIn: "1h", // Token expires in 1 hour
      }
    );

    // Respond with success message and the token
    return NextResponse.json({ message: "Login successful",token,  user });
  } catch (error) {
    // Handle errors
    console.error("Error logging in user:", error);
    return NextResponse.json(
      { message: "Failed to log in user" },
      { status: 500 }
    );
  }
};