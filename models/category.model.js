import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      unique: true,
      trim: true,
      minLength: [2, "Category name must be at least 2 characters"],
      maxLength: [50, "Category name must not exceed 50 characters"],
    },
    description: {
      type: String,
      trim: true,
      maxLength: [200, "Description must not exceed 200 characters"],
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const Category = mongoose.model("Category", categorySchema);

export default Category;
