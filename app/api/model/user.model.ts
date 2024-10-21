import { Schema, models, model } from "mongoose";

const UserrSchema = new Schema(
  {
    name: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "member", "newmember"],
      default: "member",
    },
    contact: { type: String, required: false },

    capitalInvested: {
      total: {
        type: Number,
        default: 0,
      },
      portfolio1: {
        type: Number,
        default: 0,
      },
      portfolio2: {
        type: Number,
        default: 0,
      },
       portfolio3: {
        type: Number,
        default: 0,
      },
    },
    interestAccrued: {
      total: {
        type: Number,
        default: 0,
      },
      portfolio1: {
        type: Number,
        default: 0,
      },
      portfolio2: {
        type: Number,
        default: 0,
      },
      portfolio3: {
        type: Number,
        default: 0,
      },
    },
    equity: {
      portfolio1: {
        type: Number,
        default: 0,
      },
      portfolio2: {
        type: Number,
        default: 0,
      },
      portfolio3: {
        type: Number,
        default: 0,
      },
    },
    // Updated to store an array of uploaded reports
    uploadedReport: [
      {
        fileName: {
          type: String,
         
        },
        filePath: {
          type: String,
          
        },
      },
    ],
  },
  { timestamps: true }
);

const User = models.Userr || model("Userr", UserrSchema);
export default User;
