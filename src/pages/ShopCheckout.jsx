import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Select from 'react-select'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useCart } from '../context/CartContext'
import { STATE_CITY_DATA } from '../components/Cities'

export default function ShopCheckout() {
  const navigate = useNavigate()

  const {
    cart,
    cartTotal,
    clearCart,
  } = useCart()

  const [selectedState, setSelectedState] = useState('')
  const [selectedCity, setSelectedCity] = useState('')

  const [submitting, setSubmitting] = useState(false)

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  )

  const searchableSelectStyles = {
    control: (base, state) => ({
      ...base,
      width: '100%',
      minHeight: '48px',
      height: '48px',
      background: 'rgba(255,255,255,0.6)',
      backdropFilter: 'blur(4px)',
      border: state.isFocused
        ? '1px solid #E85A1C'
        : '1px solid rgba(255,255,255,0.7)',
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

const handleSubmit = async (e) => {
  e.preventDefault()

  if (cart.length === 0) {
    alert('Your cart is empty.')
    navigate('/shop')
    return
  }

  const form = e.target

  // Get normal form values
  const formData = new FormData(form)
  const data = Object.fromEntries(formData.entries())

  // -----------------------------
  // MANDATORY FIELD VALIDATION
  // -----------------------------

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
    alert('Please enter your delivery address.')
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

  setSubmitting(true)

  const orderId = `BHIMA-${Date.now()}`

  const order = {
    order_id: orderId,
    full_name: data.fullName,
    mobile: data.mobile,
    email: data.email || '',
    address: data.address,
    state: selectedState,
    city: selectedCity,
    pincode: data.pincode,

   items: cart.map((item) => ({
  id: item.id,
  name: item.name,
  image: Array.isArray(item.images)
    ? item.images[0]
    : item.images || item.image,
  price: item.price,
  quantity: item.quantity,
  total: item.price * item.quantity,
})),
    totalItems,
    subtotal: cartTotal,
  }

  // -----------------------------
  // BACKEND SUBMISSION
  // -----------------------------

  try {
const response = await fetch(
  `${import.meta.env.VITE_API_URL}/api/shop-orders`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: data.fullName,
          mobile: data.mobile,
          email: data.email || '',
          address: data.address,
          state: selectedState,
          city: selectedCity,
          pincode: data.pincode,

   items: cart.map((item) => ({
  id: item.id,
  name: item.name,
  image: Array.isArray(item.images)
    ? item.images[0]
    : item.images || item.image,
  price: item.price,
  quantity: item.quantity,
  total: item.price * item.quantity,
})),
          totalItems,
          subtotal: cartTotal,
        }),
      }
    )

    const result = await response.json()

    // -----------------------------
    // BACKEND FAILED
    // -----------------------------

    if (!response.ok || !result.success) {
      alert(
        result.message ||
        'Order could not be placed. Please try again.'
      )
      return
    }

    // -----------------------------
    // BACKEND SUCCESS
    // -----------------------------

    clearCart()

    navigate('/shop/order-success', {
      state: {
        order,
      },
    })

  } catch (error) {
    console.error('Shop order API error:', error)

    alert(
      'Unable to place the order. Please check the server and try again.'
    )

    return

  } finally {
    setSubmitting(false)
  }
}
  /* EMPTY CART */
  if (cart.length === 0) {
    return (
      <div className="pattern-body-bg min-h-screen flex flex-col text-stone-900">

        <Navbar
          transparent
          showRegister={false}
          showBackButton
        />

        <main className="flex-1 flex items-center justify-center px-4 py-12">

          <div className="glossy-card rounded-3xl p-10 md:p-16 text-center max-w-lg w-full">

            <div className="text-5xl mb-5">
              🛒
            </div>

            <h1 className="text-2xl font-black">
              Your cart is empty
            </h1>

            <p className="text-sm font-bold text-stone-600 mt-2">
              Add products to your cart before checkout.
            </p>

            <Link
              to="/shop"
              className="
                inline-flex
                mt-6
                bg-[#E85A1C]
                hover:bg-stone-900
                text-white
                font-black
                px-7
                py-3
                rounded-xl
                text-sm
                uppercase
                tracking-wide
                transition
              "
            >
              Explore Products
            </Link>

          </div>

        </main>

        <Footer />

      </div>
    )
  }

  return (
    <div className="pattern-body-bg min-h-screen flex flex-col text-stone-900">

      <Navbar
        transparent
        showRegister={false}
        showBackButton
      />

     <main className="flex-1 max-w-6xl mx-auto px-3 sm:px-5 md:px-6 py-3 sm:py-5 w-full">

        {/* MAIN GLASS CONTAINER */}
     <div className="glossy-card rounded-3xl p-4 sm:p-5 lg:p-6">

          {/* HEADER */}
        <div className="pb-4 mb-5 border-b border-white/50">

            <div className="flex items-start gap-3 sm:gap-4">

              <Link
                to="/cart"
                className="
                  flex-shrink-0
                  flex
                  items-center
                  justify-center
                  w-10
                  h-10
                  rounded-xl
                  bg-white/60
                  border
                  border-white/70
                  text-[#E85A1C]
                  text-xl
                  font-black
                  hover:bg-white/80
                  transition
                "
                aria-label="Back to Cart"
              >
                ←
              </Link>

              <div className="min-w-0">

                <h1 className="text-2xl md:text-3xl font-black text-gray-900">
                  Complete Your Order
                </h1>

                <p className="text-sm text-gray-600 font-bold mt-1">
                  Enter your delivery details and review your products.
                </p>

              </div>

            </div>

          </div>


         <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6">

            {/* ======================================= */}
            {/* CUSTOMER FORM */}
            {/* ======================================= */}

            <div className="lg:col-span-7 text-stone-900">

            <form
  onSubmit={handleSubmit}
  className="space-y-4 text-xs font-bold"
>

                {/* BUYER INFORMATION */}
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
                          w-full
                          bg-white/60
                          backdrop-blur-sm
                          border
                          border-white/70
                          rounded-xl
                          p-3
                          text-sm
                          text-gray-900
                          placeholder:text-gray-400
                          focus:outline-none
                          focus:border-[#E85A1C]
                        "
                      />

                    </div>


                    {/* MOBILE + EMAIL */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

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
      w-full
      bg-white/60
      backdrop-blur-sm
      border
      border-white/70
      rounded-xl
      p-3
      text-sm
      text-gray-900
      placeholder:text-gray-400
      focus:outline-none
      focus:border-[#E85A1C]
    "
  />
</div>


                      <div>

                        <label className="block text-gray-700 mb-1">
                          Email Address
                        </label>

                        <input
                          type="email"
                          name="email"
                          placeholder="ramesh@gmail.com"
                          className="
                            w-full
                            bg-white/60
                            backdrop-blur-sm
                            border
                            border-white/70
                            rounded-xl
                            p-3
                            text-sm
                            text-gray-900
                            placeholder:text-gray-400
                            focus:outline-none
                            focus:border-[#E85A1C]
                          "
                        />

                      </div>

                    </div>


                 

                  </div>

                </div>


                {/* DELIVERY LOCATION */}
                <div className="border-b border-gray-100 pb-6">

                  <h2 className="text-sm font-black text-[#0D6832] uppercase tracking-wider mb-3">
                    2. Delivery Location
                  </h2>

                  <div className="space-y-4">

                    {/* ADDRESS */}
                    <div>

                      <label className="block text-gray-700 mb-1">
                        Street Address / Delivery Address *
                      </label>

                      <input
                        type="text"
                        name="address"
                        required
                        placeholder="House No., Street, Area"
                        className="
                          w-full
                          bg-white/60
                          backdrop-blur-sm
                          border
                          border-white/70
                          rounded-xl
                          p-3
                          text-sm
                          text-gray-900
                          placeholder:text-gray-400
                          focus:outline-none
                          focus:border-[#E85A1C]
                        "
                      />

                    </div>


                    {/* STATE + CITY */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                      {/* STATE */}
                      <div>

                        <label className="block text-gray-700 mb-1">
                          State *
                        </label>

                        <Select
                          options={Object.keys(STATE_CITY_DATA).map(
                            (state) => ({
                              value: state,
                              label: state,
                            })
                          )}
                          value={
                            selectedState
                              ? {
                                  value: selectedState,
                                  label: selectedState,
                                }
                              : null
                          }
                          onChange={(option) => {
                            setSelectedState(
                              option?.value || ''
                            )
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
                          required
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
                              ? (
                                  STATE_CITY_DATA[
                                    selectedState
                                  ] || []
                                ).map((city) => ({
                                  value: city,
                                  label: city,
                                }))
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
                            setSelectedCity(
                              option?.value || ''
                            )
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
                          required
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
                          w-full
                          bg-white/60
                          backdrop-blur-sm
                          border
                          border-white/70
                          rounded-xl
                          p-3
                          text-sm
                          text-gray-900
                          placeholder:text-gray-400
                          focus:outline-none
                          focus:border-[#E85A1C]
                        "
                      />

                    </div>

                  </div>

                </div>


                {/* SUBMIT */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="
                    w-full
                    bg-[#E85A1C]
                    hover:bg-orange-700
                    disabled:opacity-60
                    disabled:cursor-not-allowed
                    text-white
                    font-black
                    py-4
                    rounded-xl
                    shadow-xl
                    text-sm
                    uppercase
                    transition
                    tracking-wide
                  "
                >
                  {submitting
                    ? 'Processing Order...'
                    : 'Place Order'}
                </button>

              </form>

            </div>


            {/* ======================================= */}
            {/* ORDER SUMMARY */}
            {/* ======================================= */}

         {/* ======================================= */}
{/* ORDER SUMMARY */}
{/* ======================================= */}

<div
  className="
    lg:col-span-5
    text-stone-900
    min-w-0
    lg:pl-8
    lg:border-l
    lg:border-white/60
  "
>
  <div
    className="
      w-full
      bg-white/35
      backdrop-blur-md
      rounded-2xl
      border
      border-white/60
      p-5
      sm:p-6
      shadow-sm
    "
  >

    {/* HEADER */}
    <span className="text-xs font-black uppercase text-[#E85A1C] tracking-wider">
      Order Summary
    </span>

    <h2 className="text-2xl md:text-3xl font-black mt-1 text-stone-900">
      Your Products
    </h2>

    <p className="text-xs text-stone-600 font-bold mt-1">
      {totalItems} item{totalItems !== 1 ? 's' : ''} in your cart
    </p>


    {/* PRODUCTS */}
    <div className="mt-4 border-t border-stone-300/60 pt-4 space-y-3">

      {cart.map((item) => (

        <div
          key={item.id}
          className="
            flex
            items-center
            gap-3
            min-w-0
            py-1
          "
        >

          {/* PRODUCT IMAGE */}
          <div
            className="
              w-16
              h-16
              rounded-xl
              bg-white/80
              border
              border-white/70
              flex
              items-center
              justify-center
              overflow-hidden
              shrink-0
            "
          >
          <img
  src={
    Array.isArray(item.images)
      ? item.images[0]
      : item.images || item.image
  }
  alt={item.name}
  className="max-h-14 max-w-14 object-contain"
/>
          </div>


          {/* PRODUCT DETAILS */}
          <div className="flex-1 min-w-0">

            <p className="text-sm font-black text-stone-900 truncate">
              {item.name}
            </p>

            <p className="text-[10px] font-bold text-stone-600 mt-0.5">
              Qty: {item.quantity}
            </p>

          </div>


          {/* ITEM TOTAL */}
        <div
  className="
    shrink-0
    text-sm
    font-black
    text-stone-900
    whitespace-nowrap
    text-right
  "
>
  ₹{(
    item.price * item.quantity
  ).toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}
</div>

        </div>

      ))}

    </div>


    {/* PRICE BREAKDOWN */}
    <div className="border-t border-stone-300/60 mt-4 pt-4 space-y-3">

      {/* PRODUCTS */}
      <div className="flex items-center justify-between gap-4">

        <span className="text-sm font-black text-stone-800">
          Products
        </span>

        <span className="text-sm font-black text-stone-900">
          {totalItems}
        </span>

      </div>


      {/* SUBTOTAL */}
      <div className="flex items-center justify-between gap-4">

        <span className="text-sm font-black text-stone-800">
          Subtotal
        </span>

     <span className="text-sm font-black text-stone-900 whitespace-nowrap">
  ₹{cartTotal.toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}
</span>

      </div>


      {/* DELIVERY */}
   <div className="flex items-start justify-between gap-4 mt-4 px-3 py-2.5 rounded-lg bg-stone-100/70 border border-stone-200">
  <p className="text-xs font-semibold text-stone-600 leading-relaxed">
    <span className="font-black text-[#E85A1C]">Note:</span>{' '}
    No payment is required at the time of placing the order. Once submitted,
    our representative will contact you to confirm the order.
  </p>
</div>

    </div>


    {/* FINAL TOTAL */}
    <div className="border-t border-stone-300/70 mt-4 pt-4">

      <div className="flex items-center justify-between gap-4">

        <span className="text-base font-black text-stone-900">
          Total
        </span>

 <span className="text-xl md:text-2xl font-black text-[#E85A1C] whitespace-nowrap">
  ₹{cartTotal.toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}
</span>

      </div>

    </div>

  </div>
</div>
          </div>

        </div>

      </main>

      <Footer />

    </div>
  )
}