import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      minLength: [2, "Product name must be at least 2 characters"],
      maxLength: [100, "Product name must not exceed 100 characters"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price must be a positive number"],
    },
    stock: {
      type: Number,
      required: [true, "Stock is required"],
      min: [0, "Stock must be a positive number"],
      default: 0,
    },
    description: {
      type: String,
      trim: true,
      maxLength: [500, "Description must not exceed 500 characters"],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category is required"],
      index: true,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
