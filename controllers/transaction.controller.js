import Transaction from "../models/transaction.model.js";
import Order from "../models/order.model.js";

export const getTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find().sort({ created_at: -1 });

    res.status(200).json({
      count: transactions.length,
      results: transactions,
    });
  } catch (error) {
    next(error);
  }
};

export const getTransactionById = async (req, res, next) => {
  try {
    const transaction = await Transaction.findById(req.params.id).populate("order");

    if (!transaction) {
      const error = new Error("Transaction not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      data: transaction,
    });
  } catch (error) {
    next(error);
  }
};

export const createTransaction = async (req, res, next) => {
  try {
    const { amount, status, payment_method, email, order: orderId } = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
      const error = new Error("Order not found");
      error.statusCode = 404;
      throw error;
    }

    const existingTransaction = await Transaction.findOne({ order: orderId });
    if (existingTransaction) {
      const error = new Error("Transaction already exists for this order");
      error.statusCode = 409;
      throw error;
    }

    const transaction = await Transaction.create({
      amount,
      status,
      payment_method,
      email,
      order: orderId,
      user: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Transaction created successfully",
      data: transaction,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTransaction = async (req, res, next) => {
  try {
    const { amount, status, payment_method, email } = req.body;

    const transaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      { amount, status, payment_method, email },
      { new: true, runValidators: true }
    );

    if (!transaction) {
      const error = new Error("Transaction not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      message: "Transaction updated successfully",
      data: transaction,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.findByIdAndDelete(req.params.id);

    if (!transaction) {
      const error = new Error("Transaction not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      message: "Transaction deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
