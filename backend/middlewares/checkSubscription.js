import User from "../models/User.js";

export const checkSubscription = async (req, res, next) => {
  try {
    const { userId } = req.body; // Assume userId is sent in the request body or headers
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.subscription !== "premium") {
      return res.status(403).json({ message: "Access restricted to premium users only" });
    }

    next(); // User is premium, proceed to the next middleware or route handler
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};