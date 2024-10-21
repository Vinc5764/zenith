/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// pages/api/partner/index.ts
import { connectToDB } from "@/lib/connect";
import { NextResponse } from "next/server";
import User from "../model/user.model";

export const POST = async (req: any) => {
  try {
    const {
      partnerId,
      capitalInvested,
      interestAccrued,
      equity,
      uploadedFile,  // Expecting this to be an array of URLs
    } = await req.json();
    
    // Connect to the database
    await connectToDB();

    // Find the partner by ID
    const partner = await User.findById(partnerId);
    if (!partner) {
      return NextResponse.json({ message: "Partner not found" });
    }

    // Update capital invested (total, portfolio1, portfolio2, portfolio3)
    if (capitalInvested) {
      partner.capitalInvested.total = capitalInvested.total;
      partner.capitalInvested.portfolio1 = capitalInvested.portfolio1 || partner.capitalInvested.portfolio1;
      partner.capitalInvested.portfolio2 = capitalInvested.portfolio2 || partner.capitalInvested.portfolio2;
      partner.capitalInvested.portfolio3 = capitalInvested.portfolio3 || partner.capitalInvested.portfolio3;
    }

    // Update interest accrued (total, portfolio1, portfolio2, portfolio3)
    if (interestAccrued) {
      partner.interestAccrued.total = interestAccrued.total || partner.interestAccrued.total;
      partner.interestAccrued.portfolio1 = interestAccrued.portfolio1 || partner.interestAccrued.portfolio1;
      partner.interestAccrued.portfolio2 = interestAccrued.portfolio2 || partner.interestAccrued.portfolio2;
      partner.interestAccrued.portfolio3 = interestAccrued.portfolio3 || partner.interestAccrued.portfolio3;
    }

    // Update equity (portfolio1, portfolio2, portfolio3)
    if (equity) {
      partner.equity.portfolio1 = equity.portfolio1 || partner.equity.portfolio1;
      partner.equity.portfolio2 = equity.portfolio2 || partner.equity.portfolio2;
      partner.equity.portfolio3 = equity.portfolio3 || partner.equity.portfolio3;
    }

    // Handle multiple uploaded files and update the uploadedReport array
    if (uploadedFile && Array.isArray(uploadedFile)) {
      uploadedFile.forEach((fileUrl: string) => {
        const urlParts = fileUrl.split("/");
        const fullFileName = urlParts[urlParts.length - 1];
        const fileName = fullFileName.split("_")[0]; // Extract the name

        // Ensure fileName and filePath are not empty or invalid
        if (fileName && fileUrl) {
          // Push each file entry into the uploadedReport array
          partner.uploadedReport.push({
            fileName,
            filePath: fileUrl,
          });
        } else {
          console.log("Invalid file name or URL", fileName, fileUrl);
        }
      });
    }

    // Save the updated partner details
    await partner.save();

    return NextResponse.json(partner, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

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
