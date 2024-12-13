import { Schema, models, model } from "mongoose";

const WithdrawalSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the user making the withdrawal
    amount: { type: Number, required: true }, // Amount being withdrawn
    portfolio: {
      type: String,
       // The portfolio from which the withdrawal is made
      
    },
     // Period associated with the withdrawal (e.g., "monthly", "quarterly")
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending", // Tracks withdrawal approval status
    },
     // Unique transaction ID for the withdrawal
    comments: { type: String, required: false }, // Optional admin or user comments
  },
  { timestamps: true }
);

const Withdrawall = models.Withdrawal || model("Withdrawal", WithdrawalSchema);
export default Withdrawall;
