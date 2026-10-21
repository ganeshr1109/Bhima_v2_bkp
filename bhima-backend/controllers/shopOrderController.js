import pool from "../config/db.js";

export const createShopOrder = async (req, res) => {
  try {
    const {
      fullName,
      mobile,
      email,
      address,
      state,
      city,
      pincode,
      items,
      totalItems,
      subtotal
    } = req.body;

    // Validation
    if (
      !fullName ||
      !mobile ||
      !address ||
      !state ||
      !city ||
      !pincode ||
      !items ||
      items.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Required order details are missing"
      });
    }

    // Generate Order ID
    const orderId = `BHIMA-${Date.now()}`;

    const query = `
      INSERT INTO bhima.orders (
        order_id,
        full_name,
        mobile,
        email,
        address,
        state,
        city,
        pincode,
        items,
        total_items,
        subtotal,
        status
      )
      VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8,
        $9, $10, $11, 'PLACED'
      )
    RETURNING *
    `;

    const values = [
      orderId,
      fullName,
      mobile,
      email || null,
      address,
      state,
      city,
      pincode,
      JSON.stringify(items),
      totalItems,
      subtotal
    ];

    const result = await pool.query(query, values);

return res.status(201).json({
  success: true,
  message: "Order placed successfully",
  order: result.rows[0]
});

  } catch (error) {
    console.error("Create shop order error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to place order"
    });
  }
};