import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: [true, "Amount is required"],
      min: [0, "Amount must be a positive number"],
    },
    status: {
      type: String,
      enum: {
        values: ["pending", "processing", "success", "failed"],
        message: "Status must be one of: pending, processing, success, failed",
      },
      default: "pending",
    },
    payment_method: {
      type: String,
      required: [true, "Payment method is required"],
      enum: {
        values: ["cash", "credit_card", "bank_transfer", "promptpay"],
        message: "Payment method must be one of: cash, credit_card, bank_transfer, promptpay",
      },
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: [true, "Order reference is required"],
      index: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
      index: true,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
