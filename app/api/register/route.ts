/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectToDB } from "@/lib/connect";
import User from "@/app/api/model/user.model";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import axios from "axios";

export const POST = async (req: any) => {
  try {
    // Parse incoming JSON data from the request body
    const { email, contact, name, password } =
      await req.json();
    console.log(email);
    


    // Connect to MongoDB database
    await connectToDB();

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

   
    // Create a new user instance
    const newUser = new User({
      email,
      contact,
      name,
      password: hashedPassword,
      role: "newmember",
    });

    // SMS message content
    const url = "https://kanassetmanagement.com/";
    const message = `Hello ${name},\n\nYour account has been successfully created.Visit ${url} to signin with your email:${email}  password:${password} . Thank you for joining our mission\n\nRegards,\nTeam,`;
  

    // Send SMS using mNotify
    const apiKey = "OY5gUf0v1vwiGGzvUMtYIv3U9";
    const senderId = "KAN";

    const mNotifyUrl = `https://apps.mnotify.net/smsapi?key=${apiKey}&to=${contact}&msg=${encodeURIComponent(
      message
    )}&sender_id=${senderId}`;

    try {
      const response = await axios.post(mNotifyUrl);
      if (response.data.status === "1000") {
        console.log("SMS sent successfully");
      } else {
        console.log(`Failed to send SMS: ${response.data.status}`);
      }
    } catch (error) {
      console.error("Error sending SMS:", error);
    }

    // Save the new user to the database
    await newUser.save();

    // Respond with success message
    return NextResponse.json({ message: "User created successfully", newUser });
  } catch (error) {
    // Handle errors
    console.error("Error creating user:", error);
    return NextResponse.json(
      { message: "Failed to create user" },
      { status: 500 }
    );
  }
};

export const GET = async (req: any) => {
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