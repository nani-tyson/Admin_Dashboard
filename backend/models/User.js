import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 2,
      max: 100,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    city: String,
    state: String,
    country: String,
    occupation: String,
    phoneNumber: String,
    transactions: Array,
    role: {
      type: String,
      enum: ["user", "admin", "superadmin"],
      default: "admin",
    },
  },
  { timestamps: true }
);

// Check if the model already exists before defining it
const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;

// filepath: d:\University\3-2\software engineering\Project\Dashboard\backend\controllers\general.js
export const getUser = (req, res) => {
    res.status(200).json({ message: 'User data fetched successfully' });
};