import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the User model
    plan: { type: String, enum: ["free", "premium"], default: "free" }, // Subscription plan
    startDate: { type: Date, default: Date.now }, // Subscription start date
    endDate: { type: Date }, // Subscription end date (for premium plans)
    status: { type: String, enum: ["active", "inactive"], default: "inactive" }, // Subscription status
  },
  { timestamps: true }  
);

const Subscription = mongoose.model("Subscription", subscriptionSchema);
export default Subscription;