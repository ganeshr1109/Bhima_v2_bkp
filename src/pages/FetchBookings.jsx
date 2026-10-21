import React, { useEffect, useState } from "react";

const FetchBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/bookings`
      );

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        setBookings(data.bookings || []);
      } else {
        setError(data.message || "Failed to fetch bookings");
      }
    } catch (error) {
      console.error("Fetch bookings error:", error);
      setError("Unable to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-[1400px] mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Booking Details
            </h1>

            <p className="text-gray-500 mt-1">
              Total Bookings: {bookings.length}
            </p>
          </div>

          <button
            onClick={fetchBookings}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Refresh
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="bg-white rounded-xl p-10 text-center shadow">
            <p className="text-gray-500">
              Loading bookings...
            </p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="bg-white rounded-xl p-10 text-center shadow">
            <p className="text-red-600">
              {error}
            </p>
          </div>
        )}

        {/* No bookings */}
        {!loading && !error && bookings.length === 0 && (
          <div className="bg-white rounded-xl p-10 text-center shadow">
            <p className="text-gray-500">
              No bookings found.
            </p>
          </div>
        )}

        {/* Bookings table */}
        {!loading && !error && bookings.length > 0 && (
          <div className="bg-white rounded-xl shadow overflow-x-auto">

            <table className="w-full text-sm">

              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="px-4 py-3 text-left">Booking ID</th>
                  <th className="px-4 py-3 text-left">Vehicle</th>
                  <th className="px-4 py-3 text-left">Price</th>
                  <th className="px-4 py-3 text-left">Full Name</th>
                  <th className="px-4 py-3 text-left">Mobile</th>
                  <th className="px-4 py-3 text-left">Email</th>
                  <th className="px-4 py-3 text-left">Address</th>
                  <th className="px-4 py-3 text-left">State</th>
                  <th className="px-4 py-3 text-left">City</th>
                  <th className="px-4 py-3 text-left">Pincode</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Created At</th>
                </tr>
              </thead>

              <tbody>
                {bookings.map((booking) => (
                  <tr
                    key={booking.bookingId}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="px-4 py-3 font-semibold whitespace-nowrap">
                      {booking.bookingId}
                    </td>

                    <td className="px-4 py-3 whitespace-nowrap">
                      {booking.vehicleName}
                    </td>

                    <td className="px-4 py-3 whitespace-nowrap">
                      ₹
                      {Number(
                        booking.vehiclePrice || 0
                      ).toLocaleString("en-IN")}
                    </td>

                    <td className="px-4 py-3 whitespace-nowrap">
                      {booking.fullName}
                    </td>

                    <td className="px-4 py-3 whitespace-nowrap">
                      {booking.mobile}
                    </td>

                    <td className="px-4 py-3">
                      {booking.email || "-"}
                    </td>

                    <td className="px-4 py-3 min-w-[220px]">
                      {booking.address}
                    </td>

                    <td className="px-4 py-3">
                      {booking.state}
                    </td>

                    <td className="px-4 py-3">
                      {booking.city}
                    </td>

                    <td className="px-4 py-3">
                      {booking.pincode}
                    </td>

                    <td className="px-4 py-3 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          booking.status === "CONFIRMED"
                            ? "bg-green-100 text-green-700"
                            : booking.status === "CANCELLED"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </td>

                    <td className="px-4 py-3 whitespace-nowrap">
                      {booking.createdAt
                        ? new Date(
                            booking.createdAt
                          ).toLocaleString("en-IN")
                        : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        )}

      </div>
    </div>
  );
};

export default FetchBookings;