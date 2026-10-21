import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useCart } from '../context/CartContext'

export default function Cart() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    cartTotal,
  } = useCart()

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  )

  return (
    <div className="pattern-body-bg min-h-screen flex flex-col text-stone-900">

      <Navbar
        transparent
        showRegister
      />
<main className="flex-1 pt-2 md:pt-8 pb-6 md:pb-8">

      <section className="glass-section w-[95%] max-w-[1200px] mx-auto px-5 sm:px-6 md:px-10 py-5 md:py-7">

          {/* HEADER */}
          <div className="mb-5">

            <span className="inline-block bg-[#E85A1C] text-white text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-sm">
              BHIMA Store
            </span>

            <h1 className="text-3xl md:text-4xl font-black text-stone-900 mt-3">
              Shopping Cart
            </h1>

            <p className="text-sm font-bold text-stone-600 mt-1">
              Review your selected products before checkout.
            </p>

          </div>

          {/* EMPTY CART */}
          {cart.length === 0 ? (

            <div className="glossy-card rounded-3xl p-10 md:p-16 text-center">

              <div className="text-5xl mb-5">
                🛒
              </div>

              <h2 className="text-2xl font-black text-stone-900">
                Your cart is empty
              </h2>

              <p className="text-sm font-bold text-stone-600 mt-2">
                Add some BHIMA products to your cart.
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
                  shadow-md
                "
              >
                Explore Products
              </Link>

            </div>

          ) : (

            /* MAIN CART LAYOUT */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">

              {/* ========================================= */}
              {/* CART ITEMS */}
              {/* ========================================= */}

              <div className="lg:col-span-8 space-y-4">

                {cart.map((item) => (

                  <div
                    key={item.id}
                    className="
                      glossy-card
                      rounded-3xl
                      p-5
                      md:p-6
                    "
                  >

                    <div className="flex flex-col md:flex-row gap-5 md:gap-6">

                      {/* PRODUCT IMAGE */}
                   <div
  className="
    w-full
    md:w-[140px]
    h-[140px]
    bg-white/50
    backdrop-blur-[8px]
    rounded-2xl
    flex
    items-center
    justify-center
    overflow-hidden
    border
    border-white/35
    shadow-[0_10px_30px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.6)]
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
  className="
    max-h-[120px]
    max-w-[120px]
    object-contain
  "
/>
                      </div>


                      {/* PRODUCT INFORMATION */}
                      <div className="flex-1 min-w-0">

                        {/* CATEGORY */}
                        <span
                          className="
                            inline-block
                            text-[9px]
                            font-black
                            uppercase
                            tracking-wider
                            text-[#E85A1C]
                            bg-[#E85A1C]/10
                            px-2.5
                            py-1
                            rounded-full
                          "
                        >
                          {item.category || 'Other'}
                        </span>


                        {/* NAME */}
                        <h3 className="text-lg md:text-xl font-black text-stone-900 mt-2">
                          {item.name}
                        </h3>


                        {/* DESCRIPTION */}
                        <p
                          className="
                            text-xs
                            md:text-sm
                            font-bold
                            text-stone-600
                            mt-1
                            leading-relaxed
                            max-w-xl
                          "
                        >
                          {item.description}
                        </p>


                   {/* UNIT PRICE */}
<div className="flex items-center gap-2 mt-3 flex-wrap">

  {/* Current Price */}
  <span className="text-lg font-black text-[#E85A1C]">
    ₹{item.price.toLocaleString('en-IN')}
    <span className="text-[0.75rem] leading-5 font-normal text-stone-500">
      {' '}/ unit
    </span>
  </span>

  {/* Original Price */}
  <span className="text-sm font-semibold text-stone-400 line-through">
    ₹{Math.round(item.price / 0.95).toLocaleString('en-IN')}
  </span>

  {/* Discount */}
  <span className="text-xs font-semibold text-[#0D6832]">
    5% off
  </span>

</div>


                        {/* QUANTITY + REMOVE */}
                        <div className="flex flex-wrap items-center gap-3 mt-4">

                          {/* QUANTITY */}
                          <div
                            className="
                              flex
                              items-center
                              bg-white/90
                              border
                              border-stone-200
                              rounded-xl
                              overflow-hidden
                              shadow-sm
                            "
                          >

                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(
                                  item.id,
                                  item.quantity - 1
                                )
                              }
                              disabled={item.quantity <= 1}
                              className="
                                w-9
                                h-9
                                flex
                                items-center
                                justify-center
                                font-black
                                text-lg
                                text-stone-900
                                hover:bg-stone-100
                                disabled:opacity-30
                                transition
                              "
                            >
                              −
                            </button>

                            <span
                              className="
                                w-10
                                text-center
                                text-sm
                                font-black
                                text-stone-900
                              "
                            >
                              {item.quantity}
                            </span>

                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(
                                  item.id,
                                  item.quantity + 1
                                )
                              }
                              className="
                                w-9
                                h-9
                                flex
                                items-center
                                justify-center
                                font-black
                                text-lg
                                text-stone-900
                                hover:bg-stone-100
                                transition
                              "
                            >
                              +
                            </button>

                          </div>


                          {/* REMOVE */}
                          <button
                            type="button"
                            onClick={() =>
                              removeFromCart(item.id)
                            }
                            className="
                              text-xs
                              font-black
                              text-red-600
                              hover:text-red-800
                              uppercase
                              tracking-wide
                              transition
                            "
                          >
                            Remove
                          </button>

                        </div>

                      </div>


                      {/* ================================= */}
                      {/* ITEM TOTAL */}
                      {/* ================================= */}

                      <div
                        className="
                          md:w-[145px]
                          shrink-0
                          md:border-l
                          md:border-stone-200/60
                          md:pl-5
                          flex
                          md:flex-col
                          items-center
                          md:items-end
                          justify-between
                          md:justify-start
                          border-t
                          md:border-t-0
                          border-stone-200/60
                          pt-4
                          md:pt-0
                        "
                      >

                        <p
                          className="
                            text-[10px]
                            font-black
                            uppercase
                            tracking-wider
                            text-stone-500
                          "
                        >
                          Item Total
                        </p>

                        <p
                          className="
                            text-xl
                            font-black
                            text-stone-900
                            md:mt-2
                            whitespace-nowrap
                          "
                        >
                          ₹{(
                            item.price * item.quantity
                          ).toLocaleString('en-IN')}
                        </p>

                      </div>

                    </div>

                  </div>

                ))}

              </div>


              {/* ========================================= */}
              {/* ORDER SUMMARY */}
              {/* ========================================= */}

              <div className="lg:col-span-4 self-start">

                <div
                  className="
                    glossy-card
                    rounded-3xl
                    p-6
                    w-full
                  "
                >

                  {/* SUMMARY HEADER */}
                  <div className="flex items-center justify-between gap-3">

                    <h2 className="text-xl font-black text-stone-900">
                      Order Summary
                    </h2>

                    <span
                      className="
                        text-[10px]
                        font-black
                        uppercase
                        tracking-wide
                        text-stone-500
                        whitespace-nowrap
                      "
                    >
                      {totalItems} Items
                    </span>

                  </div>


                  {/* SUMMARY DETAILS */}
                  <div
                    className="
                      border-t
                      border-stone-300/60
                      mt-5
                      pt-5
                      space-y-4
                    "
                  >

                    {/* PRODUCTS */}
                    <div className="flex items-center justify-between gap-4">

                      <span className="text-sm font-bold text-stone-600">
                        Products
                      </span>

                      <span className="text-sm font-black text-stone-900">
                        {totalItems}
                      </span>

                    </div>


                    {/* SUBTOTAL */}
                    <div className="flex items-center justify-between gap-4">

                      <span className="text-sm font-bold text-stone-600">
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
                    <div className="flex items-start justify-between gap-4">

                      <span className="text-sm font-bold text-stone-600">
                        Delivery
                      </span>

                      <span className="text-xs font-black text-[#0D6832] text-right">
                        Calculated at checkout
                      </span>

                    </div>

                  </div>


                  {/* TOTAL */}
                  <div
                    className="
                      border-t
                      border-stone-300/70
                      mt-5
                      pt-5
                    "
                  >

                    <div className="flex items-center justify-between gap-4">

                      <span className="text-base font-black text-stone-900">
                        Total
                      </span>

                    <span
  className="
    text-2xl
    font-black
    text-[#E85A1C]
    whitespace-nowrap
  "
>
  ₹{cartTotal.toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}
</span>

                    </div>

                  </div>


                  {/* CHECKOUT BUTTON */}
                 <Link
  to="/shop-checkout"
  className="
    block
    w-full
    text-center
    bg-[#E85A1C]
    hover:bg-stone-900
    text-white
    font-black
    py-4
    rounded-xl
    mt-6
    text-sm
    uppercase
    tracking-wide
    transition
    shadow-md
  "
>
  Proceed to Checkout
</Link>


                  {/* CONTINUE SHOPPING */}
                  <Link
                    to="/shop"
                    className="
                      block
                      w-full
                      text-center
                      text-stone-900
                      font-black
                      py-3
                      rounded-xl
                      mt-2
                      text-xs
                      uppercase
                      tracking-wide
                      hover:text-[#E85A1C]
                      transition
                    "
                  >
                    ← Continue Shopping
                  </Link>

                </div>

              </div>

            </div>

          )}

        </section>

      </main>

      <Footer />

    </div>
  )
}