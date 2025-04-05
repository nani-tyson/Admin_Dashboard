import express from "express";
import {
  getProducts,
  getCustomers,
  getTransactions,
  getGeoLocation,
} from "../controllers/client.js";
const router = express.Router();

router
  .get("/products", getProducts)
  .get("/customers", getCustomers)
  .get("/transactions", getTransactions)
  .get("/GeoLocation", getGeoLocation)
export default router;
