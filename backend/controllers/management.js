import mongoose from "mongoose";
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";

export const getAdmin = async (req, res) => {
  try {
    const admins = await User.find({ role: "admin" }).select("-password");
    res.status(200).json(admins);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getUserPerformance = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("ID:", id); // Log the ID to check its value

    // Validate the ObjectId
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    const userWithStats = await User.aggregate([
      { $match: { _id:new mongoose.Types.ObjectId(id) } }, // Directly use id
      {
        $lookup: {
          from: "affiliatestats",
          localField: "_id",
          foreignField: "userId",
          as: "affiliateStats",
        },
      },
      { $unwind: "$affiliateStats" },
    ]);

    if (!userWithStats.length) {
      return res.status(404).json({ message: "User not found or no stats available" });
    }

    const saleTransactions = await Promise.all(
      userWithStats[0].affiliateStats.affiliateSales.map((saleId) => {
        return Transaction.findById(saleId);
      })
    );

    const filteredSaleTransactions = saleTransactions.filter(
      (transaction) => transaction !== null
    );

    res.status(200).json({
      user: userWithStats[0],
      sales: filteredSaleTransactions,
    });
  } catch (error) {
    console.error("Error in getUserPerformance:", error);
    res.status(500).json({ message: error.message });
  }
};