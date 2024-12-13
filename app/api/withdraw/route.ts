/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectToDB } from "@/lib/connect";
import { NextResponse } from "next/server";
import Withdrawall from "../model/withdrawal.model"; // Assuming you have the Withdrawal model

// Function to fetch all withdrawals
export const GET = async (req: any) => {
  try {
    // Connect to MongoDB database
    await connectToDB();

    // Retrieve all withdrawals from the database
    const withdrawals = await Withdrawall.find().exec();

    // Prevent caching
    const response = NextResponse.json(withdrawals);
    response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");
    response.headers.set("Surrogate-Control", "no-store");

    return response;
  } catch (error) {
    // Handle errors
    console.error("Error retrieving withdrawals:", error);
    return NextResponse.json(
      { message: "Failed to retrieve withdrawals" },
      { status: 500 }
    );
  }
};

// Function to create a new withdrawal
export const POST = async (req: any) => {
  try {
    // Parse request body
    const { userId, amount, portfolio, period, comments } = await req.json();

    // Validate required fields
    if (!userId || !amount || !portfolio || !period) {
      return NextResponse.json(
        { message: "All required fields (userId, amount, portfolio, period) must be provided" },
        { status: 400 }
      );
    }

    // Connect to MongoDB database
    await connectToDB();

    // Create new withdrawal
    const newWithdrawal = new Withdrawall({
      userId,
      amount,
      portfolio,
      period,
      comments, // Optional
    });

    // Save to the database
    await newWithdrawal.save();

    return NextResponse.json(
      { message: "Withdrawal created successfully", withdrawal: newWithdrawal },
      { status: 201 }
    );
  } catch (error) {
    // Handle errors
    console.error("Error creating withdrawal:", error);
    return NextResponse.json(
      { message: "Failed to create withdrawal" },
      { status: 500 }
    );
  }
};
