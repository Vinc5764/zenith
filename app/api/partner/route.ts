/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// pages/api/partner/index.ts
import { connectToDB } from "@/lib/connect";
import { NextResponse } from "next/server";
import User from "../model/user.model";
 // Assuming the Partner schema is in model/partner.model

export const POST = async (req: any) => {
  try {
    const {
      partnerId,
      capitalInvested,
      interestAccrued,
      equity,
      uploadedReport,
    } = await req.json();
    
    // Connect to the database
    await connectToDB();

    // Find the partner by ID
    const partner = await User.findById(partnerId);
    if (!partner) {
      return NextResponse.json({ message: "Partner not found" });
    }

    // Update capital invested (total, portfolio1, portfolio2)
    if (capitalInvested) {
      partner.capitalInvested.total = capitalInvested.total 
      partner.capitalInvested.portfolio1 = capitalInvested.portfolio1 || partner.capitalInvested.portfolio1;
      partner.capitalInvested.portfolio2 = capitalInvested.portfolio2 || partner.capitalInvested.portfolio2;
    }

    // Update interest accrued (total, portfolio1, portfolio2)
    if (interestAccrued) {
      partner.interestAccrued.total = interestAccrued.total || partner.interestAccrued.total;
      partner.interestAccrued.portfolio1 = interestAccrued.portfolio1 || partner.interestAccrued.portfolio1;
      partner.interestAccrued.portfolio2 = interestAccrued.portfolio2 || partner.interestAccrued.portfolio2;
    }

    // Update equity (portfolio1, portfolio2)
    if (equity) {
      partner.equity.portfolio1 = equity.portfolio1 || partner.equity.portfolio1;
      partner.equity.portfolio2 = equity.portfolio2 || partner.equity.portfolio2;
    }

    // Update uploaded report (fileName, filePath)
    if (uploadedReport) {
      partner.uploadedReport.fileName = uploadedReport.fileName || partner.uploadedReport.fileName;
      partner.uploadedReport.filePath = uploadedReport.filePath || partner.uploadedReport.filePath;
    }

    // Save the updated partner details
    await partner.save();

    return NextResponse.json(partner, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};




// import bcrypt from "bcryptjs";

export const GET = async (req: any, { params }: any) => {
  try {
    // Connect to MongoDB database
    await connectToDB();

    // const { mymembers } = params;

    // const { searchParams } = new URL(req.url);
    // const partner = searchParams.get("partner");
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