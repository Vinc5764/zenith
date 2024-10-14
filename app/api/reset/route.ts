/* eslint-disable @typescript-eslint/no-explicit-any */
// pages/api/news/index.ts
import { connectToDB } from "@/lib/connect";

import { NextResponse } from "next/server";
import User from "../model/user.model";
import bcrypt from "bcryptjs";
// Handler to create a new news article
export const POST = async (req: any) => {
  try {
    const { userId, password } = await req.json();
    await connectToDB();
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: "User not found" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.role = "member";
    await user.save();
    return NextResponse.json(user, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};