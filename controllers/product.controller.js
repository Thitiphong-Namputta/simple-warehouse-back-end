import Product from "../models/product.model.js";
import Category from "../models/category.model.js";

export const getProducts = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.category) {
      filter.category = req.query.category;
    }

    const products = await Product.find(filter)
      .populate("category", "name")
      .sort({ created_at: -1 });

    res.status(200).json({
      count: products.length,
      results: products,
    });
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).populate("category", "name description");

    if (!product) {
      const error = new Error("Product not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const { name, price, stock, description, category } = req.body;

    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      const error = new Error("Category not found");
      error.statusCode = 404;
      throw error;
    }

    const product = await Product.create({ name, price, stock, description, category });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const { name, price, stock, description, category } = req.body;

    if (category) {
      const categoryExists = await Category.findById(category);
      if (!categoryExists) {
        const error = new Error("Category not found");
        error.statusCode = 404;
        throw error;
      }
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, stock, description, category },
      { new: true, runValidators: true }
    ).populate("category", "name");

    if (!product) {
      const error = new Error("Product not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      const error = new Error("Product not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
