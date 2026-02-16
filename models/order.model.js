import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    order_number: {
      type: String,
      unique: true,
      trim: true,
    },
    customer_name: {
      type: String,
      required: [true, "Customer name is required"],
      trim: true,
      minLength: [2, "Customer name must be at least 2 characters"],
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: [1, "Quantity must be at least 1"],
        },
        unit_price: {
          type: Number,
          required: true,
          min: [0, "Unit price must be a positive number"],
        },
      },
    ],
    total_amount: {
      type: Number,
      min: [0, "Total amount must be a positive number"],
      default: 0,
    },
    status: {
      type: String,
      enum: {
        values: ["pending", "confirmed", "processing", "shipped", "delivered", "cancelled"],
        message: "Status must be one of: pending, confirmed, processing, shipped, delivered, cancelled",
      },
      default: "pending",
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

orderSchema.pre("save", function () {
  if (!this.order_number) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    this.order_number = Array.from({ length: 8 }, () =>
      chars[Math.floor(Math.random() * chars.length)]
    ).join("");
  }
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
