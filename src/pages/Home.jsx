import { Link } from 'react-router-dom'
import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import FuelSavingsCalculator from '../components/FuelSavingsCalculator'
import EMICalculator from '../components/EMICalculator'
import { vehicleList, shopProducts } from '../data/vehicles'

import { useCart } from '../context/CartContext'
export default function Home() {
const [cartMessage, setCartMessage] = useState('')
  const scrollToFleet = () => {
    document.getElementById('fleet')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }


  return (
        <div className="text-stone-900 antialiased pattern-body-bg min-h-screen ">
 <header className="relative pt-1 md:pt-8">
  <Navbar transparent fixedOnScroll />
<Navbar transparent fixedOnScroll />

{cartMessage && (
  <div className="fixed top-[20px] right-5 z-[10000]">
    <div className="relative overflow-hidden flex items-center gap-3 bg-white/50 backdrop-blur-[8px] border border-white/35 rounded-xl shadow-lg px-4 py-3 min-w-[240px]">

      {/* Success Icon */}
      <div className="w-9 h-9 shrink-0 rounded-full bg-[#138808]/10 border border-[#138808]/20 flex items-center justify-center">
        <span className="text-[#138808] text-xl font-black leading-none">
          ✓
        </span>
      </div>

      {/* Message */}
      <span className="text-sm font-bold text-stone-800 whitespace-nowrap">
        {cartMessage}
      </span>

      {/* Progress Bar */}
      <div
        className="
          absolute
          bottom-0
          left-0
          h-[3px]
          bg-[#138808]
          animate-[cartProgress_2s_linear_forwards]
        "
      />
    </div>
  </div>
)}
  {/* HERO SECTION */}
 <div className="glass-section w-[95%] max-w-[1350px] mx-auto
                px-4 sm:px-5 md:px-10 lg:px-12
                py-6 sm:py-8 md:py-16 lg:py-8">

  <div className="max-w-7xl mx-auto
                  grid grid-cols-1 lg:grid-cols-12
                  gap-6 sm:gap-9 md:gap-10 lg:gap-12
                  items-center">

    {/* ================= LEFT CONTENT ================= */}
    <div className="lg:col-span-7
                    space-y-4 sm:space-y-5 md:space-y-6
                    text-center lg:text-left">

      {/* BADGE */}
      <div className="inline-flex items-center justify-center
                      gap-2
                      bg-[#E85A1C]/10
                      border border-[#E85A1C]/30
                      px-3 sm:px-4
                      py-1.5
                      rounded-full
                      shadow-sm
                      max-w-full">

        <span className="w-2.5 h-2.5
                         bg-[#E85A1C]
                         rounded-full
                         animate-ping
                         shrink-0">
        </span>

        <span className="text-[10px] sm:text-xs
                         font-black
                         uppercase
                         tracking-wide sm:tracking-wider
                         text-stone-800
                         whitespace-nowrap">
          Next-Gen Commercial Mobility
        </span>
      </div>


      {/* MAIN HEADING */}
   <h1 className="
  text-[2rem]
  leading-[1.25]
  sm:text-4xl
  sm:leading-[1.15]
  md:text-6xl
  md:leading-[1.1]
  font-black
  tracking-tight
  text-stone-900
">

        Power Your Fleet With High Payload{" "}
        <span className="text-[#E85A1C]">
          Electric Vehicles
        </span>

      </h1>


      {/* HINDI TAGLINE */}
      <p className="hindi-text
                    text-xl sm:text-2xl
                    leading-tight
                    font-extrabold
                    text-[#E85A1C]">

        मेरी गाड़ी, मेरा देश, मेरा गर्व

      </p>


      {/* DESCRIPTION */}
      <p className="text-stone-700
                    font-bold
                    text-sm sm:text-base md:text-lg
                    leading-relaxed
                    max-w-2xl
                    mx-auto lg:mx-0">

        Engineered for Indian commercial logistics. Enjoy up to 80%
        operational cost savings, robust mild-steel ladder frame
        construction, and ICAT-certified performance.

      </p>


      {/* BUTTONS */}
      <div className="flex flex-col sm:flex-row
                      items-stretch sm:items-center
                      justify-center lg:justify-start
                      gap-3 sm:gap-4
                      pt-1 sm:pt-2">

        <button
          type="button"
          onClick={scrollToFleet}
          className="w-full sm:w-auto
                     bg-[#E85A1C]
                     hover:bg-stone-900
                     text-white
                     font-black
                     px-6 sm:px-8
                     py-3.5 sm:py-4
                     rounded-full
                     shadow-lg
                     text-xs sm:text-sm
                     uppercase
                     tracking-wider
                     transition"
        >
          Explore Vehicles
        </button>


        <button
          type="button"
          onClick={() => {
            document.getElementById('calculators')?.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            })
          }}
          className="w-full sm:w-auto
                     bg-[#E85A1C]/15
                     hover:bg-[#E85A1C]/25
                     text-stone-900
                     font-black
                     px-6 sm:px-8
                     py-3.5 sm:py-4
                     rounded-full
                     text-xs sm:text-sm
                     uppercase
                     tracking-wider
                     border border-[#E85A1C]/30
                     transition"
        >
          Calculate Savings & EMI
        </button>

      </div>
    </div>

            <div className="lg:col-span-5 relative">
             <div className="bg-white/30 p-4 rounded-3xl shadow-sm overflow-hidden backdrop-blur-md border border-white/40">
                <img src={`${import.meta.env.BASE_URL}assets/bhima-c310.jpg`} alt="BHIMA C310 Commercial Vehicle" className="w-full h-auto object-contain rounded-2xl transform hover:scale-105 transition duration-500" />
                <div className="bg-white/70 p-4 rounded-2xl mt-4  flex justify-between items-center shadow-inner">
                  <div>
                    <p className="text-xs text-stone-500 font-bold uppercase">Featured Flagship</p>
                    <h3 className="text-lg font-black text-stone-900">BHIMA C310 Cargo Loader</h3>
                  </div>
                  <Link to="/vehicles/c310" className="bg-[#E85A1C] text-white text-xs font-black py-2 px-4 rounded-xl hover:bg-stone-900 transition shadow-sm">
                    Specs & Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* FLEET SHOWCASE */}
<main className="pt-12 pb-12">
  <div className="max-w-[1400px] mx-auto">

    <div
      id="fleet"
   className="glass-section scroll-mt-[5.42rem] md:scroll-mt-[7.8rem] w-[95%] max-w-[1350px] mx-auto px-4 md:px-4 py-7"
    >
 
            <div className="text-center max-w-3xl mx-auto mb-5">
              <span className="bg-[#E85A1C] text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">Our Fleet</span>
              <h2 className="text-3xl md:text-4xl font-black text-stone-900 tracking-tight mt-2">Commercial Electric Vehicles</h2>
           <p className="text-stone-600 font-bold mt-2 text-[0.85rem]">
  Instantly calculate your daily fuel savings and customize your vehicle loan financing structure.
</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {vehicleList.map((v) => (
               <Link
      key={v.slug}
      to={`/vehicles/${v.slug}`}
    className="group rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col overflow-hidden h-full">

      {/* ================================
          TOP — GLASS VEHICLE IMAGE
          ================================ */}
 <div className="h-60 bg-white/30 p-4 overflow-hidden backdrop-blur-md border border-white/40 shadow-sm flex items-center justify-center relative rounded-t-3xl">

        {/* Vehicle Tag */}
        <span
          className={`absolute top-3 left-3 ${v.tagColor} text-white text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider z-10 shadow-sm`}
        >
          {v.tag}
        </span>

        {/* Vehicle Image */}
        <img
          src={v.images?.[0] || v.image}
          alt={v.name}
          className="max-h-full max-w-full object-contain rounded-2xl"
        />

      </div>

      {/* ================================
          BOTTOM — ONE CONTINUOUS WHITE SECTION
          ================================ */}
   <div className="bg-white rounded-b-3xl flex-1 flex flex-col">

  {/* DETAILS */}
  <div className="p-6">
    <h3 className="text-2xl font-black text-stone-900 group-hover:text-[#E85A1C] transition">
      {v.name}
    </h3>

    <p className="text-xs font-bold text-stone-600 mt-1 line-clamp-2">
      {v.tagline}
    </p>

    <div className="flex items-center gap-2 flex-wrap mt-4">
      {v.badges.map((b) => (
        <span
          key={b}
          className="bg-white border border-stone-200 text-stone-800 text-[12px] font-black px-2.5 py-1 rounded-lg shadow-sm"
        >
          {b}
        </span>
      ))}
    </div>
  </div>

  {/* VIEW SPECS */}
  <div className="px-8 py-6 flex items-center justify-between text-xs font-black text-stone-900">
    <span>View Specs</span>

    <svg
      className="w-4 h-4 group-hover:translate-x-1 transition-transform"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth="2.5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 5l7 7-7 7"
      />
    </svg>
  </div>

</div>

    </Link>

              ))}
            </div>
          </div>
        </div>
      </main>

      {/* CALCULATORS SECTION */}
<section
  id="calculators"
  className="scroll-mt-[5.42rem] md:scroll-mt-[7.8rem]  pt-0 pb-12 relative overflow-hidden"
>
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#E85A1C]/5 rounded-full blur-3xl pointer-events-none"></div>

  <div className="glass-section w-[95%] max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-10 py-4 md:py-6 lg:py-7 relative z-10">

    <div className="text-center w-full flex flex-col items-center mb-5">

      <span className="bg-[#E85A1C] text-white text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-md">
        Financial Power Tools
      </span>

      <h2 className="text-3xl sm:text-4xl lg:text-4xl font-black text-stone-900 tracking-tight mt-2 text-center leading-normal lg:whitespace-nowrap">
        Smart Savings & EMI Calculator
      </h2>

      <p className="text-stone-600 font-bold text-[0.85rem] mt-2">
        Instantly calculate your daily fuel savings and customize your vehicle loan financing structure.
      </p>

    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
      <FuelSavingsCalculator />
      <EMICalculator />
    </div>

  </div>
</section>

      {/* SHOP & MERCHANDISE */}
{/* SHOP & MERCHANDISE */}
<section id="shop" className="pt-0 pb-16">
  <div className="glass-section w-[95%] max-w-[1350px] mx-auto px-6 py-8 md:py-7">

    <div className="flex justify-center mb-5">
      <div className="text-center max-w-[46rem] w-full">

        <span className="inline-block bg-[#E85A1C] text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">
          BHIMA Store
        </span>

        <h2 className="text-3xl md:text-4xl font-black text-stone-900 mt-4">
          Official Shop & Apparel
        </h2>

     <p className="text-stone-600 font-bold text-sm md:text-[0.850rem] mt-2">
  Buy official BHIMA merchandise, charging hardware, and spare components.
</p>

      </div>
    </div>

    {/* FEATURED 4 PRODUCTS */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
   {shopProducts.slice(0, 4).map((p) => (
  <ShopCard
    key={p.id}
    product={p}
    onAdded={(quantity) => {
      setCartMessage(
        `${quantity} ${quantity === 1 ? 'item' : 'items'} added in cart`
      )

      setTimeout(() => {
        setCartMessage('')
      }, 1000)
    }}
  />
))}
    </div>

    {/* EXPLORE ALL PRODUCTS */}
    <div className="flex justify-center mt-8">

      <Link
        to="/shop"
        className="
          inline-flex
          items-center
          gap-2
          bg-stone-900
          hover:bg-[#E85A1C]
          text-white
          font-black
          px-7
          py-3.5
          rounded-xl
          shadow-md
          text-sm
          uppercase
          tracking-wide
          transition
        "
      >
        Explore All Products

        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </Link>

    </div>

  </div>
</section>

      {/* INQUIRY FORM */}


      <Footer />
    </div>
  )
}

function ShopCard({ product, onAdded }) {
  const { addToCart } = useCart()

const [quantity, setQuantity] = useState(1)
const [selectedImage, setSelectedImage] = useState(0)
const [dragStartX, setDragStartX] = useState(null)


  // Supports both:
  // images: "single-image.webp"
  // images: ["image1.webp", "image2.webp"]
  const images = Array.isArray(product.images)
    ? product.images
    : [product.images]

  const showNextImage = () => {
    setSelectedImage((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    )
  }

  const showPreviousImage = () => {
    setSelectedImage((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    )
  }

  // ================================
  // TOUCH SWIPE
  // ================================
  const handleTouchStart = (e) => {
    setDragStartX(e.touches[0].clientX)
  }

  const handleTouchEnd = (e) => {
    if (dragStartX === null) return

    const endX = e.changedTouches[0].clientX
    const difference = dragStartX - endX

    if (Math.abs(difference) > 40) {
      if (difference > 0) {
        showNextImage()
      } else {
        showPreviousImage()
      }
    }

    setDragStartX(null)
  }

  // ================================
  // MOUSE SWIPE
  // ================================
  const handleMouseDown = (e) => {
    setDragStartX(e.clientX)
  }

  const handleMouseUp = (e) => {
    if (dragStartX === null) return

    const difference = dragStartX - e.clientX

    if (Math.abs(difference) > 40) {
      if (difference > 0) {
        showNextImage()
      } else {
        showPreviousImage()
      }
    }

    setDragStartX(null)
  }

  const handleMouseLeave = () => {
    setDragStartX(null)
  }

const handleAddToCart = () => {
  addToCart(product, quantity)
  onAdded(quantity)
}

  return (
    <div className="rounded-3xl overflow-hidden flex flex-col h-full">

      {/* ================================
          IMAGE — SWIPEABLE GLASS
          ================================ */}
      <div
        className="
          h-56
          bg-white/30
          p-4
          flex
          items-center
          justify-center
          relative
          backdrop-blur-md
          border
          border-white/40
          shadow-sm
          rounded-t-3xl
          overflow-hidden
          cursor-grab
          active:cursor-grabbing
          select-none
        "
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >

        {/* MAIN IMAGE */}
        <img
          src={images[selectedImage]}
          alt={product.name}
          draggable="false"
          className="
            max-h-full
            max-w-full
            object-contain
            transition-opacity
            duration-300
            pointer-events-none
          "
        />

        {/* CIRCULAR INDICATORS */}
        {images.length > 1 && (
          <div
            className="
              absolute
              bottom-3
              left-1/2
              -translate-x-1/2
              flex
              items-center
              gap-1.5
              px-2.5
              py-1.5
              rounded-full
              bg-white/50
              backdrop-blur-md
              border
              border-white/50
              shadow-sm
            "
          >
            {images.map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Show image ${index + 1}`}
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedImage(index)
                }}
                className={`
                  rounded-full
                  transition-all
                  duration-200
                  ${
                    selectedImage === index
                      ? 'w-2.5 h-2.5 bg-[#E85A1C] scale-110'
                      : 'w-2 h-2 bg-stone-400/70 hover:bg-stone-600'
                  }
                `}
              />
            ))}
          </div>
        )}

      </div>

      {/* ================================
          DETAILS — WHITE
          ================================ */}
      <div className="bg-white flex-1 flex flex-col p-5">

        {/* NAME */}
        <h3 className="font-black text-stone-900 text-base">
          {product.name}
        </h3>

        {/* DESCRIPTION */}
        <p className="text-xs font-bold text-stone-600 mt-1 leading-relaxed">
          {product.description}
        </p>

        {/* PRICE */}
        <div className="flex items-center gap-2 mt-3 flex-wrap">

          <span className="text-xl font-black text-[#E85A1C]">
            ₹ {product.price.toLocaleString('en-IN')}

            <span className="text-[0.75rem] leading-5 font-normal text-stone-500">
              {' '}/ unit
            </span>
          </span>

          <span className="text-sm font-semibold text-stone-400 line-through">
            ₹ {Math.round(
              product.price / 0.95
            ).toLocaleString('en-IN')}
          </span>

          <span className="text-xs font-semibold text-[#0D6832]">
            5% off
          </span>

        </div>

        {/* CART */}
        <div className="mt-auto pt-4 border-t border-stone-100 flex items-center gap-2">

          {/* QUANTITY */}
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => {
              const value = Number(e.target.value)
              setQuantity(value < 1 ? 1 : value)
            }}
            className="
              w-16
              bg-white
              border
              border-stone-200
              rounded-xl
              p-2
              text-center
              text-sm
              font-black
              text-stone-900
              focus:outline-none
              focus:border-[#E85A1C]
            "
          />

          {/* ADD TO CART */}
          <button
            type="button"
            onClick={handleAddToCart}
            className="
              flex-1
              bg-stone-900
              hover:bg-[#E85A1C]
              text-white
              font-black
              py-2.5
              rounded-xl
              text-xs
              uppercase
              tracking-wider
              transition
              shadow-sm
            "
          >
            Add To Cart
          </button>

        </div>

      </div>

    </div>
  )
}


function InquiryForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    vehicle: '',
    inquiryType: '',
  })

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)
    setMessage('')

    try {
      const response = await fetch('http://localhost:4001/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit inquiry')
      }

      setMessage('Thank you for your inquiry! Our team will call you shortly.')

      setFormData({
        fullName: '',
        phone: '',
        vehicle: '',
        inquiryType: '',
      })

    } catch (error) {
      console.error('Inquiry submission error:', error)
      setMessage('Unable to submit inquiry. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 text-left"
      onSubmit={handleSubmit}
    >
      <div>
        <label className="text-[12px] font-black uppercase text-stone-800 block mb-1">
          Full Name
        </label>

        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="John Doe"
          required
          className="w-full bg-white/80 border border-stone-200 text-stone-900 rounded-xl p-3 text-sm focus:outline-none focus:border-[#E85A1C] placeholder:text-stone-400"
        />
      </div>

      <div>
        <label className="text-[12px] font-black uppercase text-stone-800 block mb-1">
          Phone Number
        </label>

        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+91 98765 43210"
          required
          className="w-full bg-white/80 border border-stone-200 text-stone-900 rounded-xl p-3 text-sm focus:outline-none focus:border-[#E85A1C] placeholder:text-stone-400"
        />
      </div>

      <div>
        <label className="text-[12px] font-black uppercase text-stone-800 block mb-1">
          Select Vehicle
        </label>

        <select
          name="vehicle"
          value={formData.vehicle}
          onChange={handleChange}
          required
          className="w-full bg-white/80 border border-stone-200 text-stone-900 rounded-xl p-3 text-sm focus:outline-none focus:border-[#E85A1C]"
        >
          <option value="">Select Vehicle</option>
          <option value="c310">BHIMA C310 (Cargo Loader)</option>
          <option value="px4">BHIMA PX4 (Passenger)</option>
          <option value="lowbed">Low Bed Carrier (Industrial)</option>
          <option value="trolley">Tractor Trolley (Agri/Utility)</option>
        </select>
      </div>

      <div>
        <label className="text-[12px] font-black uppercase text-stone-800 block mb-1">
          Inquiry Type
        </label>

        <select
          name="inquiryType"
          value={formData.inquiryType}
          onChange={handleChange}
          required
          className="w-full bg-white/80 border border-stone-200 text-stone-900 rounded-xl p-3 text-sm focus:outline-none focus:border-[#E85A1C]"
        >
          <option value="">Select Inquiry Type</option>
          <option value="testdrive">Book Test Drive</option>
          <option value="purchase">Vehicle Purchase</option>
          <option value="dealership">Dealership / Partner Inquiry</option>
        </select>
      </div>

      <div className="md:col-span-2">
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-stone-900 hover:bg-[#E85A1C] disabled:opacity-60 disabled:cursor-not-allowed text-white font-black py-4 rounded-xl shadow-md transition text-sm tracking-wider uppercase mt-2"
        >
          {loading ? 'Submitting...' : 'Submit Inquiry'}
        </button>

        {message && (
          <p className="text-center text-sm font-bold mt-4 text-[#0D6832]">
            {message}
          </p>
        )}
      </div>
    </form>
  )
}


