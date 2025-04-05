import { get } from "mongoose";
import Product from "../models/product.js";
import ProductStat from "../models/productStat.js";
import Transaction from "../models/transaction.js";
import Users from "../models/User.js"; 
import iso2ToIso3 from "country-iso-2-to-3"; // Import the correct library


export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    const productWithStats = await Promise.all(
      products.map(async (product) => {
        const stat = await ProductStat.find({ productId: product._id });
        return {
          ...product._doc,
          stat,
        };
      })
    );

    res.status(200).json(productWithStats);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getCustomers = async (req, res) => {
  try {
    const customers = await Users.find({ role: "user" }).select("-password");
    res.status(200).json(customers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getTransactions = async (req, res) => {
  try {
    // sort should look like this: { "field": "userId", "sort": "desc"}
    const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;

    // formatted sort should look like { userId: -1 }
    const generateSort = () => {
      const sortParsed = JSON.parse(sort);
      const sortFormatted = {
        [sortParsed.field]: (sortParsed.sort = "asc" ? 1 : -1),
      };

      return sortFormatted;
    };
    const sortFormatted = Boolean(sort) ? generateSort() : {};

    const transactions = await Transaction.find({
      $or: [
        { cost: { $regex: new RegExp(search, "i") } },
        { userId: { $regex: new RegExp(search, "i") } },
      ],
    })
      .sort(sortFormatted)
      .skip(page * pageSize)
      .limit(pageSize);

    const total = await Transaction.countDocuments({
      name: { $regex: search, $options: "i" },
    });

    res.status(200).json({
      transactions,
      total,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getGeoLocation = async (req, res) => {
  try {
    const users = await Users.find(); // Fetch all users from the database

    // Map user locations to ISO3 country codes and count occurrences
    const mappedLocations = users.reduce((acc, { country }) => {
      const countryISO3 = iso2ToIso3(country); // Convert ISO2 to ISO3
      if (!countryISO3) {
        console.warn(`Country "${country}" could not be converted to ISO3.`);
        return acc; // Skip if conversion fails
      }
      if (!acc[countryISO3]) {
        acc[countryISO3] = 0;
      }
      acc[countryISO3]++;
      return acc;
    }, {});

    // Format the mapped locations into an array of objects
    const formattedLocations = Object.entries(mappedLocations).map(
      ([country, count]) => {
        return { id: country, value: count };
      }
    );

    res.status(200).json(formattedLocations); // Send the formatted locations as a response
  } catch (error) {
    console.error("Error in getGeoLocation:", error); // Log the error for debugging
    res.status(404).json({ message: error.message }); // Send an error response
  }
};
