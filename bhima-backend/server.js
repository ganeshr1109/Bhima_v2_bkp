import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import pool from "./config/db.js";
import inquiryRoutes from "./routes/inquiryRoutes.js";
import registrationRoutes from "./routes/registrationRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import shopOrderRoutes from "./routes/shopOrderRoutes.js";
dotenv.config();

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://192.168.1.25:5173",
    "https://uat2.yalamanchili.in",
    "https://tradeshowservices.in"
  ],
  credentials: true
}));

app.use(express.json());

app.use("/api/inquiries", inquiryRoutes);
app.use("/api/registrations", registrationRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/shop-orders", shopOrderRoutes);
app.get("/api/health", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");

    res.json({
      success: true,
      message: "BHIMA backend is running",
      database: "connected",
      time: result.rows[0].now
    });

  } catch (error) {
    console.error("Database error:", error);

    res.status(500).json({
      success: false,
      message: "Backend running but database connection failed"
    });
  }
});

const PORT = process.env.PORT || 4001;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`BHIMA backend running on port ${PORT}`);
});