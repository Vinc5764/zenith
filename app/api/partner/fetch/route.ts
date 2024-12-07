/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectToDB } from "@/lib/connect";
import { NextResponse } from "next/server";
import User from "../../model/user.model";


export const GET = async (req: any, { params }: any) => {
  try {
    // Connect to MongoDB database
    await connectToDB();

    // Retrieve all users from the database
    const users = await User.find(); // Use appropriate query if needed

    // Respond with list of users
    return NextResponse.json(users);
  } catch (error) {
    // Handle errors
    console.error("Error retrieving users:", error);
    return NextResponse.json(
      { message: "Failed to retrieve users" },
      { status: 500 }
    );
  }
};
