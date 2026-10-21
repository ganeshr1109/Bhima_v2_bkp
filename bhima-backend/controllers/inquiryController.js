import pool from "../config/db.js";

export const createInquiry = async (req, res) => {
  try {
    const {
      fullName,
      phone,
      vehicle,
      inquiryType
    } = req.body;

    if (!fullName || !phone) {
      return res.status(400).json({
        success: false,
        message: "Full name and phone number are required"
      });
    }

    const result = await pool.query(
      `
      INSERT INTO bhima.inquiries
      (
        full_name,
        phone,
        vehicle,
        inquiry_type
      )
      VALUES ($1, $2, $3, $4)
      RETURNING id, created_at
      `,
      [
        fullName,
        phone,
        vehicle || null,
        inquiryType || null
      ]
    );

    res.status(201).json({
      success: true,
      message: "Inquiry submitted successfully",
      inquiryId: result.rows[0].id,
      createdAt: result.rows[0].created_at
    });

  } catch (error) {
    console.error("Create inquiry error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to submit inquiry"
    });
  }
};