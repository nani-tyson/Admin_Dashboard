import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    userId: String,
    cost: String,
    products: {
        type: [mongoose.Types.ObjectId],
        of: Number,
    },
}, { timestamps: true });

// Check if the model already exists before defining it
const Transaction = mongoose.models.Transaction || mongoose.model("Transaction", transactionSchema);

export default Transaction;