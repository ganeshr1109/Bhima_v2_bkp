
import { useMemo, useState } from 'react'
import { useSearchParams, useNavigate, Link } from 'react-router-dom'
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Select from 'react-select'
import { STATE_CITY_DATA } from '../components/Cities'
import { vehicles } from '../data/vehicles'
export default function Checkout() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const [selectedState, setSelectedState] = useState('')
  const [selectedCity, setSelectedCity] = useState('')

 const vehicleName = searchParams.get('vehicle') || 'BHIMA C310'

const vehicle = Object.values(vehicles).find(
  (v) => v.name === vehicleName
)

const price = vehicle?.price || 0

  const totalPrice = useMemo(() => price + 2500, [price])

  // ==================================================
  // BOOKING SUBMIT
  // ==================================================
const handleSubmit = async (e) => {
  e.preventDefault()

  const form = e.target
  const formData = new FormData(form)
  const data = Object.fromEntries(formData.entries())

  // ==============================
  // MANDATORY FIELD VALIDATION
  // ==============================

  if (!data.fullName?.trim()) {
    alert('Please enter your full name.')
    return
  }

  if (!data.mobile?.trim()) {
    alert('Please enter your mobile number.')
    return
  }

  if (!/^[6-9][0-9]{9}$/.test(data.mobile)) {
    alert('Please enter a valid 10-digit mobile number.')
    return
  }

  if (!data.address?.trim()) {
    alert('Please enter your street address / factory plot.')
    return
  }

  if (!selectedState) {
    alert('Please select a state.')
    return
  }

  if (!selectedCity) {
    alert('Please select a city.')
    return
  }

  if (!data.pincode?.trim()) {
    alert('Please enter your pincode.')
    return
  }

  if (!/^[0-9]{6}$/.test(data.pincode)) {
    alert('Please enter a valid 6-digit pincode.')
    return
  }

  // ==============================
  // GENERATE BOOKING
  // ==============================



  // ==============================
  // SAVE TO BACKEND
  // ==============================

// ==============================
// SAVE TO BACKEND
// ==============================

try {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/bookings`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        vehicleName,
        vehiclePrice: totalPrice,
        fullName: data.fullName,
        mobile: data.mobile,
        email: data.email || '',
        aadhaarNumber: data.aadhaarNumber || '',
        address: data.address,
        state: selectedState,
        city: selectedCity,
        pincode: data.pincode,
      }),
    }
  )

  const result = await response.json()

  // Backend failed
  if (!response.ok || !result.success) {
    alert(result.message || 'Booking failed. Please try again.')
    return
  }

  // ==============================
  // GO TO SUCCESS PAGE
  // ==============================

  navigate('/booking-success', {
    state: {
      booking: result.booking,
    },
  })

} catch (error) {
  console.error('Booking API error:', error)

  alert('Unable to submit booking. Please check the server and try again.')
  return
}

}


  // ==================================================
  // REACT SELECT STYLES
  // ==================================================
  const searchableSelectStyles = {
    control: (base, state) => ({
      ...base,
      width: '100%',
      minHeight: '48px',
      height: '48px',
      background: 'rgba(255, 255, 255, 0.6)',
      backdropFilter: 'blur(4px)',
      border: state.isFocused
        ? '1px solid #E85A1C'
        : '1px solid rgba(255, 255, 255, 0.7)',
      borderRadius: '0.75rem',
      boxShadow: 'none',
      padding: '0 6px',

      '&:hover': {
        borderColor: '#E85A1C',
      },
    }),

    valueContainer: (base) => ({
      ...base,
      padding: '0 8px',
    }),

    input: (base) => ({
      ...base,
      margin: 0,
      padding: 0,
      color: '#111827',
      fontWeight: 600,
    }),

    singleValue: (base) => ({
      ...base,
      color: '#111827',
      fontWeight: 600,
    }),

    placeholder: (base) => ({
      ...base,
      color: '#9CA3AF',
    }),

    indicatorSeparator: () => ({
      display: 'none',
    }),

    menu: (base) => ({
      ...base,
      borderRadius: '0.75rem',
      overflow: 'hidden',
      zIndex: 100,
    }),
  }


  // ==================================================
  // PAGE
  // ==================================================
  return (
    <div className="pattern-body-bg min-h-screen flex flex-col">

      {/* TOP BAR */}
      <Navbar
        transparent
        showRegister={false}
        showBackButton
      />


<main className="flex-1 max-w-6xl mx-auto px-2 sm:px-5 py-2 sm:py-4 w-full">

  <div className="glossy-card rounded-3xl p-3 sm:p-5 lg:p-6">


          {/* ==================================================
              PAGE HEADER
          ================================================== */}
   <div className="pb-4 mb-5 border-b border-white/50">

  <div className="flex items-start gap-3 sm:items-center sm:gap-4">

    <Link
      to="/"
      className="
        flex-shrink-0 flex items-center justify-center
        w-9 h-9 sm:w-10 sm:h-10
        rounded-xl
        bg-white/60
        border border-white/70
        text-[#E85A1C]
        text-lg sm:text-xl
        font-black
        hover:bg-white/80
        transition
      "
      aria-label="Back to Vehicles"
    >
      ←
    </Link>

    <div className="min-w-0">

<h1 className="text-2xl sm:text-2xl md:text-3xl font-black text-gray-900 leading-tight">
        Complete Your Order
      </h1>

      <p className="text-xs sm:text-sm text-gray-600 font-bold mt-1 leading-relaxed">
        Review vehicle specs, price breakdown & enter delivery details.
      </p>

    </div>

  </div>

</div>

          {/* ==================================================
              MAIN CONTENT
          ================================================== */}
<div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 lg:gap-10">


            {/* ==================================================
                LEFT — CUSTOMER FORM
            ================================================== */}
            <div className="lg:col-span-7 text-stone-900">

    <form
  id="booking-form"
  onSubmit={handleSubmit}
  className="space-y-4 text-xs font-bold"
>


                {/* ==================================================
                    BUYER INFORMATION
                ================================================== */}
                <div className="border-b border-gray-100 pb-4">

                  <h2 className="text-base font-black text-[#0D6832] uppercase tracking-wider mb-4">
                    1. Buyer Information
                  </h2>


            <div className="space-y-4">


                    {/* FULL NAME */}
                    <div>

                      <label className="block text-gray-700 mb-1">
                        Full Name *
                      </label>

                      <input
                        type="text"
                        name="fullName"
                        required
                        placeholder="Ramesh Kumar"
                        className="
                          w-full bg-white/60 backdrop-blur-sm
                          border border-white/70 rounded-xl
                          p-2.5 text-sm text-gray-900
                          placeholder:text-gray-400
                          focus:outline-none focus:border-[#E85A1C]
                        "
                      />

                    </div>


                    {/* MOBILE + EMAIL */}
     
{/* MOBILE + EMAIL */}
<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

  {/* MOBILE */}
  <div>
    <label className="block text-gray-700 mb-1">
      Mobile Number *
    </label>

    <input
      type="tel"
      name="mobile"
      required
      maxLength="10"
      inputMode="numeric"
      pattern="[6-9][0-9]{9}"
      onInput={(e) => {
        e.target.value = e.target.value
          .replace(/\D/g, '')
          .slice(0, 10)
      }}
      title="Enter a valid 10-digit mobile number starting with 6, 7, 8, or 9"
      placeholder="98765 43210"
      className="
        w-full bg-white/60 backdrop-blur-sm
        border border-white/70 rounded-xl
        p-2.5 text-sm text-gray-900
        placeholder:text-gray-400
        focus:outline-none focus:border-[#E85A1C]
      "
    />
  </div>


  {/* EMAIL */}
  <div>
    <label className="block text-gray-700 mb-1">
      Email Address
    </label>

    <input
      type="email"
      name="email"
      placeholder="ramesh@gmail.com"
      className="
        w-full bg-white/60 backdrop-blur-sm
        border border-white/70 rounded-xl
        p-2.5 text-sm text-gray-900
        placeholder:text-gray-400
        focus:outline-none focus:border-[#E85A1C]
      "
    />
  </div>


  {/* AADHAAR */}
  <div>
    <label className="block text-gray-700 mb-1">
      Aadhaar Number
    </label>

    <input
      type="text"
      name="aadhaarNumber"
      maxLength="12"
      inputMode="numeric"
      pattern="[0-9]{12}"
      onInput={(e) => {
        e.target.value = e.target.value
          .replace(/\D/g, '')
          .slice(0, 12)
      }}
      title="Aadhaar number must contain exactly 12 digits"
      placeholder="Enter 12-digit Aadhaar number"
      className="
        w-full bg-white/60 backdrop-blur-sm
        border border-white/70 rounded-xl
        p-2.5 text-sm text-gray-900
        placeholder:text-gray-400
        focus:outline-none focus:border-[#E85A1C]
      "
    />
  </div>

</div>


                  </div>

                </div>


                {/* ==================================================
                    DELIVERY LOCATION
                ================================================== */}
                <div className="border-b border-gray-100 pb-4">

                  <h2 className="text-base font-black text-[#0D6832] uppercase tracking-wider mb-4">
                    2. Delivery Location
                  </h2>


                  <div className="space-y-4">


                    {/* ADDRESS */}
                    <div>

                      <label className="block text-gray-700 mb-1">
                        Street Address / Factory Plot *
                      </label>

                      <input
                        type="text"
                        name="address"
                        required
                        placeholder="Plot No. 12, MIDC Area"
                        className="
                          w-full bg-white/60 backdrop-blur-sm
                          border border-white/70 rounded-xl
                          p-2.5 text-sm text-gray-900
                          placeholder:text-gray-400
                          focus:outline-none focus:border-[#E85A1C]
                        "
                      />

                    </div>


                    {/* STATE + CITY */}
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">


                      {/* STATE */}
                      <div>

                        <label className="block text-gray-700 mb-1">
                          State *
                        </label>

                        <Select
                          options={Object.keys(STATE_CITY_DATA).map((state) => ({
                            value: state,
                            label: state,
                          }))}

                          value={
                            selectedState
                              ? {
                                  value: selectedState,
                                  label: selectedState,
                                }
                              : null
                          }

                          onChange={(option) => {
                            setSelectedState(option?.value || '')
                            setSelectedCity('')
                          }}

                          placeholder="Select State"
                          isSearchable
                          isClearable
                          styles={searchableSelectStyles}
                        />

                        <input
                          type="hidden"
                          name="state"
                          value={selectedState}
                        />

                      </div>


                      {/* CITY */}
                      <div>

                        <label className="block text-gray-700 mb-1">
                          City *
                        </label>

                        <Select
                          options={
                            selectedState
                              ? (STATE_CITY_DATA[selectedState] || []).map(
                                  (city) => ({
                                    value: city,
                                    label: city,
                                  })
                                )
                              : []
                          }

                          value={
                            selectedCity
                              ? {
                                  value: selectedCity,
                                  label: selectedCity,
                                }
                              : null
                          }

                          onChange={(option) => {
                            setSelectedCity(option?.value || '')
                          }}

                          placeholder={
                            selectedState
                              ? 'Select City'
                              : 'Select State First'
                          }

                          isSearchable
                          isClearable
                          isDisabled={!selectedState}
                          styles={searchableSelectStyles}
                        />

                        <input
                          type="hidden"
                          name="city"
                          value={selectedCity}
                        />

                      </div>

                    </div>


                    {/* PINCODE */}
                    <div>

                      <label className="block text-gray-700 mb-1">
                        Pincode *
                      </label>

                      <input
                        type="text"
                        name="pincode"
                        required
                        maxLength="6"
                        inputMode="numeric"
                        pattern="[0-9]{6}"
                        placeholder="441122"
                        className="
                          w-full bg-white/60 backdrop-blur-sm
                          border border-white/70 rounded-xl
                          p-2.5 text-sm text-gray-900
                          placeholder:text-gray-400
                          focus:outline-none focus:border-[#E85A1C]
                        "
                      />

                    </div>

                  </div>

                </div>


                {/* ==================================================
                    BOOK NOW
                ================================================== */}
            
              </form>

            </div>


            {/* ==================================================
                RIGHT — VEHICLE SUMMARY
            ================================================== */}
          <div className="lg:col-span-5 text-stone-900 flex flex-col justify-between lg:border-l lg:border-white/60 lg:pl-8">

  <div className="w-full">

    <span className="text-xs font-black uppercase text-[#E85A1C] tracking-wider">
      Vehicle Selected
    </span>

    <h2 className="text-2xl sm:text-3xl font-black mt-1 break-words">
      {vehicleName}
    </h2>

    <p className="text-xs text-gray-600 font-bold mt-1">
      Commercial Electric Vehicle
    </p>

    {/* PRICE DETAILS */}
    <div className="mt-5 sm:mt-8 space-y-3 sm:space-y-4 border-t border-stone-300/60 pt-4 sm:pt-6">

      {/* EX-SHOWROOM */}
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs sm:text-sm font-bold text-stone-600">
          Ex-Showroom Price
        </span>

        <span className="text-base sm:text-base font-black text-stone-900 whitespace-nowrap">
       ₹{price.toLocaleString('en-IN', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})}
        </span>
      </div>

      {/* LOGISTICS */}
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs sm:text-sm font-bold text-stone-600">
          Logistics & Insurance
        </span>

        <span className="text-base sm:text-base font-black text-stone-900 whitespace-nowrap">
        ₹2,500.00
        </span>
      </div>

      {/* TOTAL */}
      <div className="flex items-start justify-between gap-3 pt-4 sm:pt-5 mt-2 border-t border-stone-300/70">

        <span className="text-base sm:text-base font-black text-stone-900 leading-tight">
          Total On-Road Estimated
        </span>

        <span className="text-lg sm:text-xl md:text-2xl font-black text-[#E85A1C] whitespace-nowrap">
    ₹{totalPrice.toLocaleString('en-IN', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})}
        </span>

      </div>

    </div>

  </div>

</div>

          </div>
{/* NOTE + BOOK NOW — BOTTOM */}
<div className="mt-5 space-y-3 w-full lg:w-[56.7%]">

  {/* NOTE */}
<div className="px-3 sm:px-4 py-3 rounded-xl bg-stone-100/70 border border-stone-200/80 shadow-sm w-full">
  <p className="text-[0.67rem] font-semibold text-stone-600 leading-relaxed flex items-start gap-1">
    <span className="font-black text-[#E85A1C] shrink-0">Note:</span>

    <span>
      No payment is required to confirm your booking. Once you click{' '}
      <span className="font-black text-stone-800">Book Now</span>, our representative
      will contact you shortly to confirm your booking.
    </span>
  </p>
</div>

  {/* BOOK NOW */}
  <button
    type="submit"
    form="booking-form"
    className="
      w-full
      bg-[#E85A1C]
      hover:bg-orange-700
      text-white
      font-black
      py-3
      rounded-xl
      shadow-xl
      text-sm
      uppercase
      transition
      tracking-wide
    "
  >
    Book Now
  </button>

</div>
        </div>

      </main>


      <Footer />

    </div>
  )
}
