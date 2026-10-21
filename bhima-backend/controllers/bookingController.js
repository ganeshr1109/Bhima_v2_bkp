import pool from "../config/db.js";

export const createBooking = async (req, res) => {
  try {
    const {
      vehicleName,
      vehiclePrice,
      fullName,
      mobile,
      email,
      aadhaarNumber,
      address,
      state,
      city,
      pincode,
    } = req.body;

    // ---------------------------------------------
    // VALIDATION
    // ---------------------------------------------
if (
  !vehicleName ||
  !fullName ||
  !mobile ||
  !address ||
  !state ||
  !city ||
  !pincode
) {
  return res.status(400).json({
    success: false,
    message: "Required booking details are missing",
  });
}

    // ---------------------------------------------
    // INSERT BOOKING
    // ---------------------------------------------
    const result = await pool.query(
      `
      INSERT INTO bhima.bookings (
        vehicle_name,
        vehicle_price,
        full_name,
        mobile,
        email,
        aadhaar_number,
        address,
        state,
        city,
        pincode
      )
      VALUES (
        $1, $2, $3, $4, $5,
        $6, $7, $8, $9, $10
      )
      RETURNING
        id,
        vehicle_name,
        vehicle_price,
        full_name,
        mobile,
        email,
        aadhaar_number,
        address,
        state,
        city,
        pincode,
        status,
        created_at
      `,
      [
        vehicleName,
        vehiclePrice || null,
        fullName,
        mobile,
        email || null,
       aadhaarNumber || null,
        address,
        state,
        city,
        pincode,
      ]
    );

    const booking = result.rows[0];

    // ---------------------------------------------
    // SUCCESS RESPONSE
    // ---------------------------------------------
    return res.status(201).json({
      success: true,
      message: "Booking submitted successfully",

     bookingId: `BKID${String(booking.id).padStart(5, '0')}`,
      status: booking.status,
      createdAt: booking.created_at,

booking: {
  bookingId: `BKID${String(booking.id).padStart(5, '0')}`,
  vehicleName: booking.vehicle_name,
  vehiclePrice: booking.vehicle_price,
  fullName: booking.full_name,
  mobile: booking.mobile,
  email: booking.email,
  address: booking.address,
  state: booking.state,
  city: booking.city,
  pincode: booking.pincode,
  status: booking.status,
  createdAt: booking.created_at,
},
    });

  } catch (error) {

    console.error("Create booking error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to submit booking",
    });
  }
};

// ---------------------------------------------
// FETCH ALL BOOKINGS
// ---------------------------------------------
export const getBookings = async (req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT
        id,
        vehicle_name,
        vehicle_price,
        full_name,
        mobile,
        email,
        aadhaar_number,
        address,
        state,
        city,
        pincode,
        status,
        created_at
      FROM bhima.bookings
      ORDER BY created_at DESC
      `
    );

    const bookings = result.rows.map((booking) => ({
      bookingId: `BKID${String(booking.id).padStart(5, "0")}`,
      vehicleName: booking.vehicle_name,
      vehiclePrice: booking.vehicle_price,
      fullName: booking.full_name,
      mobile: booking.mobile,
      email: booking.email,
      aadhaarNumber: booking.aadhaar_number,
      address: booking.address,
      state: booking.state,
      city: booking.city,
      pincode: booking.pincode,
      status: booking.status,
      createdAt: booking.created_at,
    }));

    return res.status(200).json({
      success: true,
      count: bookings.length,
      bookings,
    });

  } catch (error) {
    console.error("Fetch bookings error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch bookings",
    });
  }
};