import { useEffect, useMemo, useState } from 'react'
import { useCart } from '../context/CartContext'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { shopProducts } from '../data/vehicles'

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState('All')
const [cartMessage, setCartMessage] = useState('')
  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(
        shopProducts.map(
          (product) => product.category || 'Other'
        )
      ),
    ]

    return ['All', ...uniqueCategories]
  }, [])

  const filteredProducts =
    selectedCategory === 'All'
      ? shopProducts
      : shopProducts.filter(
          (product) =>
            (product.category || 'Other') === selectedCategory
        )

  return (
    <div className="pattern-body-bg min-h-screen flex flex-col text-stone-900">

      <Navbar
        transparent
        showRegister
      />
{cartMessage && (
  <div className="fixed top-[20px] right-5 z-[10000]">
    <div className="relative overflow-hidden flex items-center gap-3 with:

bg-white/50 backdrop-blur-[8px] border border-white/35 rounded-xl shadow-lg px-4 py-3 min-w-[240px]">

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
<main className="flex-1 pb-10 pt-0.5 md:pt-8 md:pb-10">

        <section className="glass-section w-[95%] max-w-[1350px] mx-auto px-5 sm:px-6 md:px-10 py-8 md:py-7">

          {/* HEADER */}
          <div className="text-center max-w-3xl mx-auto">

            <span className="inline-block bg-[#E85A1C] text-white text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-sm">
              BHIMA Store
            </span>

            <h1 className="text-3xl md:text-4xl font-black text-stone-900 mt-3">
              Official Shop & Merchandise
            </h1>

         <p className="text-stone-600 font-bold text-sm md:text-[0.85rem] mt-2">
              Explore official BHIMA merchandise, charging equipment,
              spare parts and accessories.
            </p>

          </div>

          {/* CATEGORY BUTTONS */}
          <div className="flex flex-wrap justify-center gap-3 mt-3">

            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`
                  px-5 py-2.5
                  rounded-full
                  text-xs
                  font-black
                  uppercase
                  tracking-wide
                  border
                  transition
                  ${
                    selectedCategory === category
                      ? 'bg-[#E85A1C] text-white border-[#E85A1C] shadow-md'
                      : 'bg-white/70 text-stone-800 border-white/80 hover:bg-[#E85A1C]/10 hover:border-[#E85A1C]/40'
                  }
                `}
              >
                {category}
              </button>
            ))}

          </div>

          {/* PRODUCT HEADER */}
          <div className="flex items-center justify-between mb-5">

          

           
          </div>

          {/* PRODUCTS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

{filteredProducts.map((product) => (
  <ShopProductCard
    key={product.id}
    product={product}
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

          {/* EMPTY STATE */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-lg font-black text-stone-700">
                No products available in this category.
              </p>
            </div>
          )}

        </section>

      </main>

      <Footer />

    </div>
  )
}
function ShopProductCard({ product, onAdded }) {
  const { addToCart } = useCart()

  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [dragStartX, setDragStartX] = useState(null)

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
  // MOUSE DRAG
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
          IMAGE — SWIPEABLE GLASS SECTION
          ================================ */}
      <div
        className="
          h-52
          bg-white/30
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
            absolute
            inset-0
            w-full
            h-full
            p-4
            object-contain
            transition-opacity
            duration-300
            pointer-events-none
          "
        />

{/* LEFT ARROW */}
{images.length > 1 && (
  <button
    type="button"
    aria-label="Previous image"
    onClick={(e) => {
      e.stopPropagation()
      showPreviousImage()
    }}
    className="
      absolute left-3 top-1/2 -translate-y-1/2 z-10
      group
      flex items-center justify-center
      w-8 h-8
      rounded-full
      bg-white/55
      backdrop-blur-lg
      border border-white/70
      shadow-[0_2px_8px_rgba(0,0,0,0.10)]
      text-stone-700
      hover:bg-[#E85A1C]
      hover:text-white
      hover:border-[#E85A1C]
      hover:shadow-md
      active:scale-90
      transition-all duration-200 ease-out
    "
  >
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="w-4 h-4"
      aria-hidden="true"
    >
      <path
        d="M14.5 5L7.5 12L14.5 19"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </button>
)}

{/* RIGHT ARROW */}
{images.length > 1 && (
  <button
    type="button"
    aria-label="Next image"
    onClick={(e) => {
      e.stopPropagation()
      showNextImage()
    }}
    className="
      absolute right-3 top-1/2 -translate-y-1/2 z-10
      group
      flex items-center justify-center
      w-8 h-8
      rounded-full
      bg-white/55
      backdrop-blur-lg
      border border-white/70
      shadow-[0_2px_8px_rgba(0,0,0,0.10)]
      text-stone-700
      hover:bg-[#E85A1C]
      hover:text-white
      hover:border-[#E85A1C]
      hover:shadow-md
      active:scale-90
      transition-all duration-200 ease-out
    "
  >
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="w-4 h-4"
      aria-hidden="true"
    >
      <path
        d="M9.5 5L16.5 12L9.5 19"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </button>
)}

        {/* IMAGE INDICATORS */}
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
          DETAILS — WHITE SECTION
          ================================ */}
      <div className="bg-white flex-1 flex flex-col rounded-b-3xl">

        <div className="p-5 flex-1">

          {/* CATEGORY */}
          <span className="inline-block bg-[#E85A1C]/10 text-[#E85A1C] border border-[#E85A1C]/20 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider">
            {product.category || 'Other'}
          </span>

          {/* NAME */}
          <h3 className="font-black text-stone-800 mt-3">
            {product.name}
          </h3>

          {/* DESCRIPTION */}
          <p className="text-xs font-bold text-stone-600 mt-1 leading-relaxed">
            {product.description}
          </p>

          {/* PRICE */}

{/* PRICE */}
<div className="flex items-baseline gap-x-2 gap-y-1 mt-3 flex-wrap">

  {/* Current Price */}
  <span className="inline-flex items-baseline gap-1 text-xl font-black text-[#E85A1C] whitespace-nowrap">
    ₹{product.price.toLocaleString('en-IN')}
    <span className="text-xs font-medium text-stone-500">
      / unit
    </span>
  </span>

  {/* Original Price */}
  <span className="text-sm font-semibold text-stone-400 line-through whitespace-nowrap">
    ₹{Math.round(product.price / 0.95).toLocaleString('en-IN')}
  </span>

  {/* Discount */}
  <span className="text-xs font-bold text-[#0D6832] whitespace-nowrap">
    5% off
  </span>

</div>


        </div>

        {/* ================================
            CART
            ================================ */}
        <div className="px-5 pb-5 flex items-center gap-2">

          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) =>
              setQuantity(
                Math.max(1, Number(e.target.value))
              )
            }
            className="
              w-16
              bg-white
              border
              border-stone-200
              rounded-xl
              p-2.5
              text-center
              text-sm
              font-black
              text-stone-900
              focus:outline-none
              focus:border-[#E85A1C]
            "
          />

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