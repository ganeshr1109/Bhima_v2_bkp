import express from "express";
import { createShopOrder } from "../controllers/shopOrderController.js";

const router = express.Router();

router.post("/", createShopOrder);

export default router;