import pool from "../config/db.js";

export const createRegistration = async (req, res) => {
  try {
    const {
      registrationType,
      fullName,
      phone,
      aadhaarNumber,
      email,
      city,
      vehicleOfInterest,
      requirementMessage,
      preferredRegion,
      currentOccupation,
      evSalesExperience,
      companyName,
      contactPerson,
      gstin,
      distributionTerritory,
      showroomCapacity,
    } = req.body;

    if (!registrationType) {
      return res.status(400).json({
        success: false,
        message: "Registration type is required",
      });
    }

    const validTypes = ["customer", "agent", "distributor"];

    if (!validTypes.includes(registrationType)) {
      return res.status(400).json({
        success: false,
        message: "Invalid registration type",
      });
    }

// Validate phone number - mandatory for all registration types
if (!phone || !/^[6-9]\d{9}$/.test(phone)) {
  return res.status(400).json({
    success: false,
    message: "Phone number must be a valid 10-digit mobile number",
  });
}

// Customer and Agent -> Full Name is mandatory
if (
  (registrationType === "customer" || registrationType === "agent") &&
  !fullName
) {
  return res.status(400).json({
    success: false,
    message: "Full name and mobile number are required",
  });
}

// Dealer -> Contact Person is mandatory
if (registrationType === "distributor" && !contactPerson) {
  return res.status(400).json({
    success: false,
    message: "Contact person name and mobile number are required",
  });
}

// Aadhaar is optional
if (aadhaarNumber && !/^\d{12}$/.test(aadhaarNumber)) {
  return res.status(400).json({
    success: false,
    message: "Aadhaar number must be exactly 12 digits",
  });
}

    const result = await pool.query(
      `
      INSERT INTO bhima.registrations (
        registration_type,
        full_name,
        phone,
        aadhaar_number,
        email,
        city,
        vehicle_of_interest,
        requirement_message,
        preferred_region,
        current_occupation,
        ev_sales_experience,
        company_name,
        contact_person,
        gstin,
        distribution_territory,
        showroom_capacity
      )
      VALUES (
        $1, $2, $3, $4, $5,
        $6, $7, $8, $9, $10,
        $11, $12, $13, $14, $15,
        $16
      )
      RETURNING id, created_at
      `,
      [
        registrationType,
        fullName || null,
        phone || null,
        aadhaarNumber || null,
        email || null,
        city || null,
        vehicleOfInterest || null,
        requirementMessage || null,
        preferredRegion || null,
        currentOccupation || null,
        evSalesExperience || null,
        companyName || null,
        contactPerson || null,
        gstin || null,
        distributionTerritory || null,
        showroomCapacity || null,
      ]
    );

    res.status(201).json({
      success: true,
      message: "Registration submitted successfully",
      registrationId: result.rows[0].id,
      createdAt: result.rows[0].created_at,
    });

  } catch (error) {
    console.error("Create registration error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to submit registration",
    });
  }
};
