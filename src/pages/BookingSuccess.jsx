
import { Link, useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function BookingSuccess() {
  const location = useLocation()
  const booking = location.state?.booking

  if (!booking) {
    return (
      <div className="pattern-body-bg min-h-screen flex flex-col text-stone-900">

        <Navbar
          transparent
          showRegister={false}
          showBackButton
        />

        <main className="flex-1 flex items-center justify-center px-4 py-8">
          <div className="glossy-card rounded-3xl p-8 text-center max-w-md w-full">

            <div className="mx-auto w-14 h-14 rounded-full bg-orange-50 border border-orange-200 flex items-center justify-center">
              <span className="text-2xl">!</span>
            </div>

            <h1 className="text-2xl font-black text-stone-900 mt-4">
              Booking Not Found
            </h1>

            <p className="text-sm text-stone-600 font-medium mt-2">
              We could not find your booking details.
            </p>

            <Link
              to="/"
              className="inline-flex mt-6 bg-[#E85A1C] hover:bg-orange-700 text-white font-black px-8 py-3 rounded-xl text-sm uppercase tracking-wide transition"
            >
              Back to Vehicles
            </Link>

          </div>
        </main>

        <Footer />

      </div>
    )
  }

  const bookingDate = booking.createdAt
    ? new Date(booking.createdAt).toLocaleString('en-IN', {
        dateStyle: 'medium',
        timeStyle: 'short',
      })
    : '-'

  return (
    <div className="pattern-body-bg min-h-screen flex flex-col text-stone-900">

      <Navbar
        transparent
        showRegister={false}
        showBackButton
      />

<main className="flex-1 max-w-6xl mx-auto w-full px-0 sm:px-5 py-2 sm:py-3">

        {/* ==================================================
            SUCCESS HEADER
        ================================================== */}
<section className="glass-section">
        
          <div className="px-4 sm:px-6 pt-2 text-center">

            {/* SUCCESS ICON */}
         <div className="mx-auto w-11 h-11 rounded-full bg-green-50 border-2 border-green-200 flex items-center justify-center">
         <span className="text-xl text-[#0D6832] font-black">
                ✓
              </span>
            </div>

       <h1 className="text-[2rem] font-black text-stone-900 mt-1">
              Booking Confirmed!
            </h1>

      <p className="text-xs sm:text-sm text-stone-600 font-medium mt-1 max-w-xl mx-auto leading-snug">
              Thank you for choosing BHIMA Mobility. Your booking has been
              received successfully.
            </p>

          <p className="text-xs sm:text-sm font-bold text-black mt-1">
              Someone from our team will contact you soon.
            </p>

          </div>


          {/* ==================================================
              MAIN CONTENT
          ================================================== */}
   <div className="p-2.5 sm:p-4 lg:p-5">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">


              {/* ==================================================
                  LEFT — BOOKING DETAILS
              ================================================== */}
<section className="lg:col-span-7 bg-white/50 backdrop-blur-md rounded-2xl border border-white/70 p-3 sm:p-4 min-w-0">
                {/* BOOKING INFORMATION */}
                <div>

                  <div className="flex items-center justify-between gap-3">

                   <h2 className="text-base sm:text-base font-black text-black tracking-tight">
                      Booking Information
                    </h2>

                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 border border-green-200 text-[#0D6832] text-[10px] font-black uppercase shrink-0">

                      <span className="w-1.5 h-1.5 rounded-full bg-[#0D6832]" />

                      {booking.status || 'CONFIRMED'}

                    </span>

                  </div>


                  {/* BOOKING ID + DATE */}
                  <div className="mt-2 space-y-1.5">

                    <div className="flex items-center">

                      <span className="w-32 sm:w-40 shrink-0 text-xs font-bold text-stone-500">
                        Booking ID
                      </span>

                      <span className="text-base font-black text-[#E85A1C] break-all">
                        {booking.bookingId}
                      </span>

                    </div>


                    <div className="flex items-center">

                      <span className="w-32 sm:w-40 shrink-0 text-xs font-bold text-stone-500">
                        Booking Date
                      </span>

                      <span className="text-sm font-black text-stone-900">
                        {bookingDate}
                      </span>

                    </div>

                  </div>

                </div>


                {/* DIVIDER */}
               <div className="border-t border-stone-300/60 my-3" />


                {/* ==================================================
                    CUSTOMER DETAILS
                ================================================== */}
                <div>

                  <h2 className="text-base font-black text-black tracking-tight">
                    Customer Details
                  </h2>


                  <div className="mt-4 space-y-3">

                    <div className="flex items-center">

                      <span className="w-32 sm:w-40 shrink-0 text-xs font-bold text-stone-500">
                        Full Name
                      </span>

                      <span className="text-sm font-black text-stone-900">
                        {booking.fullName}
                      </span>

                    </div>


                    <div className="flex items-center">

                      <span className="w-32 sm:w-40 shrink-0 text-xs font-bold text-stone-500">
                        Mobile Number
                      </span>

                      <span className="text-sm font-black text-stone-900">
                        {booking.mobile}
                      </span>

                    </div>


                    {booking.email && (
                      <div className="flex items-center">

                        <span className="w-32 sm:w-40 shrink-0 text-xs font-bold text-stone-500">
                          Email Address
                        </span>

                        <span className="text-sm font-black text-stone-900 break-all">
                          {booking.email}
                        </span>

                      </div>
                    )}

                  </div>

                </div>


                {/* DIVIDER */}
                <div className="border-t border-stone-300/60 my-5" />


                {/* ==================================================
                    DELIVERY LOCATION
                ================================================== */}
                <div>

                  <h2 className="text-base font-black text-black tracking-tight">
                    Delivery Location
                  </h2>

<div className="mt-3 flex items-start">

                    <span className="w-32 sm:w-40 shrink-0 text-xs font-bold text-stone-500">
                      Address
                    </span>

                    <div>

                      <p className="text-sm font-black text-stone-900 leading-snug">
                        {booking.address}
                      </p>

                      <p className="text-xs font-bold text-stone-600 mt-1">
                        {booking.city}, {booking.state} - {booking.pincode}
                      </p>

                    </div>

                  </div>

                </div>

              </section>


              {/* ==================================================
                  RIGHT — VEHICLE SUMMARY
              ================================================== */}
         <section className="lg:col-span-5 bg-white/50 backdrop-blur-md rounded-2xl border border-white/70 p-3 sm:p-5 min-w-0">

                <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[#E85A1C]">
                  Vehicle Selected
                </p>

                <h2 className="text-2xl sm:text-2xl font-black text-stone-900 mt-1">
                  {booking.vehicleName}
                </h2>

                <p className="text-xs font-bold text-stone-500 mt-1">
                  Commercial Electric Vehicle
                </p>


                {/* PRICE */}
             <div className="border-t border-stone-300/60 mt-4 pt-3 space-y-2">

                  <div className="flex items-center justify-between">

                    <span className="text-sm font-bold text-stone-600">
                      Vehicle Price
                    </span>

                    <span className="text-sm font-black text-stone-900">
                  ₹{Number(booking.vehiclePrice || 0).toLocaleString('en-IN', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})}
                    </span>

                  </div>

<div className="flex items-center justify-between pt-3 mt-1 border-t border-stone-300/60">

                    <span className="text-base font-black text-stone-900">
                      Booking Value
                    </span>

                    <span className="text-xl sm:text-2xl font-black text-[#E85A1C]">
                  ₹{Number(booking.vehiclePrice || 0).toLocaleString('en-IN', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})}
                    </span>

                  </div>

                </div>


                {/* CONTACT MESSAGE */}
               <div className="mt-4 rounded-xl bg-green-50/70 border border-green-200/70 p-3">

                  <p className="text-xs font-black text-[#0D6832] uppercase tracking-wide">
                    What happens next?
                  </p>

                  <p className="text-sm font-semibold text-stone-700 mt-1.5 leading-relaxed">
                    Our team will review your booking and contact you soon
                    to discuss the next steps.
                  </p>

                </div>

              </section>

            </div>


            {/* ==================================================
                SINGLE BUTTON
            ================================================== */}
            <div className="mt-3">

              <Link
                to="/"
                className="w-full sm:w-auto inline-flex items-center justify-center bg-[#E85A1C] hover:bg-orange-700 text-white font-black px-10 py-3 rounded-xl shadow-md text-sm uppercase tracking-wide transition"
              >
                Continue Shopping
              </Link>

            </div>

          </div>

        </section>

      </main>

      <Footer />

    </div>
  )
}
