import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import Transaction from "../models/transaction.model.js";

export const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().sort({ created_at: -1 });

    res.status(200).json({
      count: orders.length,
      results: orders,
    });
  } catch (error) {
    next(error);
  }
};

export const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "items.product",
      "name price"
    );

    if (!order) {
      const error = new Error("Order not found");
      error.statusCode = 404;
      throw error;
    }

    const transaction = await Transaction.findOne({ order: req.params.id });

    res.status(200).json({
      success: true,
      data: { ...order.toObject(), transaction },
    });
  } catch (error) {
    next(error);
  }
};

export const createOrder = async (req, res, next) => {
  try {
    const { customer_name, items, status } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      const error = new Error("Order must contain at least one item");
      error.statusCode = 400;
      throw error;
    }

    const resolvedItems = [];
    let total_amount = 0;

    for (const item of items) {
      const product = await Product.findById(item.product);

      if (!product) {
        const error = new Error(`Product with id ${item.product} not found`);
        error.statusCode = 404;
        throw error;
      }

      const unit_price = product.price;
      const quantity = item.quantity;

      resolvedItems.push({
        product: product._id,
        quantity,
        unit_price,
      });

      total_amount += quantity * unit_price;
    }

    const order = await Order.create({
      customer_name,
      items: resolvedItems,
      total_amount,
      status,
      user: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

export const updateOrder = async (req, res, next) => {
  try {
    const { customer_name, status } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { customer_name, status },
      { new: true, runValidators: true }
    );

    if (!order) {
      const error = new Error("Order not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      message: "Order updated successfully",
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
      const error = new Error("Order not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
