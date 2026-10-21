import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function ShopOrderSuccess() {
  const location = useLocation()
  const [order, setOrder] = useState(null)

  useEffect(() => {
    if (location.state?.order) {
      setOrder(location.state.order)
    }
  }, [location.state])

  if (!order) {
    return (
      <div className="pattern-body-bg min-h-screen flex flex-col">
        <Navbar transparent showRegister={false} showBackButton />

        <main className="flex-1 flex items-center justify-center px-4 py-10">
          <div className="glossy-card w-full max-w-md rounded-3xl p-8 text-center">
            <div className="text-5xl mb-4">📦</div>

            <h1 className="text-2xl font-black text-stone-950">
              Order Not Found
            </h1>

            <p className="text-sm text-stone-600 mt-2">
              We could not find the order details. Please return to the shop.
            </p>

            <Link
              to="/shop"
              className="inline-flex mt-6 px-7 py-3 rounded-xl bg-[#E85A1C] text-white font-black hover:bg-[#d94d12] transition"
            >
              Continue Shopping
            </Link>
          </div>
        </main>

        <Footer />
      </div>
    )
  }

  const items = Array.isArray(order.items) ? order.items : []

  const createdAt = order.created_at
    ? new Date(order.created_at).toLocaleString('en-IN', {
        dateStyle: 'medium',
        timeStyle: 'short',
      })
    : new Date().toLocaleString('en-IN', {
        dateStyle: 'medium',
        timeStyle: 'short',
      })

  const totalAmount =
    Number(order.subtotal) > 0
      ? Number(order.subtotal)
      : items.reduce(
          (sum, item) =>
            sum +
            Number(
              item.total ??
                Number(item.price || 0) * Number(item.quantity || 0)
            ),
          0
        )

  const totalItems = order.total_items || items.length

  return (
    <div className="pattern-body-bg min-h-screen flex flex-col text-stone-950">

      <Navbar transparent showRegister={false} showBackButton />

 <main className="flex-1 max-w-6xl mx-auto w-full px-0 sm:px-5 py-2 sm:py-3">

        {/* ================= MAIN GLASS ================= */}
<section className="glass-section text-stone-900 p-4 md:p-5">

          {/* ================= SUCCESS HEADER ================= */}
     <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

  {/* LEFT */}
  <div className="flex items-center gap-3 sm:gap-4 min-w-0">

    <div
      className="
        w-12 h-12
        sm:w-16 sm:h-16
        shrink-0
        rounded-full
        bg-white/65
        backdrop-blur-xl
        border border-white/90
        flex items-center justify-center
        shadow-lg
      "
    >
      <div
        className="
          w-8 h-8
          sm:w-11 sm:h-11
          rounded-full
          bg-green-100
          border border-green-200
          flex items-center justify-center
        "
      >
        <span className="text-lg sm:text-2xl font-black text-[#0D6832]">
          ✓
        </span>
      </div>
    </div>

    <div className="min-w-0 flex-1">

      <p className="text-[10px] sm:text-xs font-black uppercase tracking-[0.18em] text-[#0D6832]">
        Success
      </p>

      <h1 className="text-xl sm:text-3xl lg:text-[34px] font-black leading-tight text-stone-950 break-words">
        Your order is confirmed!
      </h1>

      <p className="text-xs sm:text-sm text-stone-700 font-semibold mt-1 leading-relaxed">
        Thank you for shopping with us.
      </p>

    </div>

  </div>

  {/* ORDER NUMBER */}
  <div className="sm:text-right min-w-0 pl-[60px] sm:pl-0">

    <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-stone-600">
      Order #
    </p>

    <p className="text-xs sm:text-base font-black text-stone-950 mt-1 break-all">
      {order.order_id}
    </p>

  </div>

</div>

          {/* ================= DIVIDER ================= */}
         <div className="border-t border-white/80 my-4" />

          {/* ================= SECTION TITLES ================= */}
      
          {/* ================= MAIN CONTENT ================= */}
          <div className="grid lg:grid-cols-5 gap-3">

            {/* ================================================= */}
            {/* CUSTOMER + DELIVERY                               */}
            {/* ================================================= */}
            <div
              className="
                lg:col-span-3
                rounded-2xl
                overflow-hidden
                bg-white/60
                backdrop-blur-2xl
                border border-white/90
                shadow-[0_8px_30px_rgba(0,0,0,0.08)]
              "
            >

              {/* ================= CUSTOMER ================= */}
         <div className="p-3 sm:p-5">
<div className="mb-4">
  <h2 className="text-lg sm:text-xl font-black text-stone-950">
    Customer & Delivery
  </h2>

  <p className="text-xs font-semibold text-stone-600 mt-1">
    Your personal and delivery information
  </p>
</div>
                <div className="flex items-center gap-3 mb-3">

                  <div
                    className="
                      w-10 h-10
                      shrink-0
                      rounded-xl
                      bg-white/70
                      border border-white/90
                      flex items-center justify-center
                      text-lg
                      shadow-sm
                    "
                  >
                    👤
                  </div>

                  <div>

                    <h3 className="text-base sm:text-lg font-black text-stone-950">
                      Customer Information
                    </h3>

                    <p className="text-xs font-semibold text-stone-600 mt-0.5">
                      Contact details
                    </p>

                  </div>

                </div>

        <div className="grid sm:grid-cols-2 gap-x-5 gap-y-3">

  {/* FULL NAME */}
  <div className="flex items-center justify-between sm:block">
    <p className="text-[11px] font-bold text-stone-600">
      Full Name
    </p>

    <p className="text-xs sm:text-sm font-extrabold text-stone-950 sm:mt-1 text-right sm:text-left break-words">
      {order.full_name || '-'}
    </p>
  </div>

  {/* MOBILE */}
  <div className="flex items-center justify-between sm:block">
    <p className="text-[11px] font-bold text-stone-600">
      Mobile Number
    </p>

    <p className="text-xs sm:text-sm font-extrabold text-stone-950 sm:mt-1 text-right sm:text-left">
      {order.mobile || '-'}
    </p>
  </div>

  {/* EMAIL */}
  {order.email && (
    <div className="sm:col-span-2 flex items-center justify-between sm:block">
      <p className="text-[11px] font-bold text-stone-600">
        Email Address
      </p>

      <p className="text-xs sm:text-sm font-extrabold text-stone-950 sm:mt-1 text-right sm:text-left break-all">
        {order.email}
      </p>
    </div>
  )}

</div>
              </div>

              {/* ================= DIVIDER ================= */}
              <div className="border-t border-white/90" />

              {/* ================= DELIVERY ================= */}
<div className="p-3 sm:p-5">

                <div className="flex items-center gap-3 mb-3">

                  <div
                    className="
                      w-10 h-10
                      shrink-0
                      rounded-xl
                      bg-white/70
                      border border-white/90
                      flex items-center justify-center
                      text-lg
                      shadow-sm
                    "
                  >
                    📍
                  </div>

                  <div>

                    <h3 className="text-base sm:text-lg font-black text-stone-950">
                      Delivery Address
                    </h3>

                    <p className="text-xs font-semibold text-stone-600 mt-0.5">
                      Where your order will be delivered
                    </p>

                  </div>

                </div>

                <div
                  className="
                    rounded-xl
                    bg-white/55
                    border border-white/80
                    p-3
                    shadow-sm
                  "
                >

                  <p className="text-sm font-extrabold text-stone-950 leading-relaxed">
                    {order.address || '-'}
                  </p>

                  <p className="text-sm font-bold text-stone-700">
                    {order.city || '-'}, {order.state || '-'}
                  </p>

                  <div className="flex items-center gap-2 mt-2">

                    <span className="text-[11px] font-bold text-stone-600">
                      PIN Code
                    </span>

                    <span className="text-xs font-black text-stone-950">
                      {order.pincode || '-'}
                    </span>

                  </div>

                </div>

              </div>

            </div>

            {/* ================================================= */}
            {/* ORDER SUMMARY                                     */}
            {/* ================================================= */}
            <div
              className="
                lg:col-span-2
                rounded-2xl
                overflow-hidden
                bg-white/60
                backdrop-blur-2xl
                border border-white/90
                shadow-[0_8px_30px_rgba(0,0,0,0.08)]
              "
            >

           <div className="p-3 sm:p-5">
<div className="mb-4">
  <h2 className="text-lg sm:text-xl font-black text-stone-950">
    Order Summary
  </h2>

  <p className="text-xs font-semibold text-stone-600 mt-1">
    Details of your purchase
  </p>

</div>
                {/* ================= DATE / PAYMENT ================= */}
         <div className="pb-5 border-b border-stone-900/10">
  <p className="text-[10px] font-black uppercase tracking-wider text-stone-600">
    Order Date
  </p>

  <p className="text-sm font-extrabold text-stone-950 mt-1">
    {createdAt}
  </p>
</div>

                {/* ================= PRODUCTS ================= */}
              <div className="py-5 space-y-4">

                  {items.map((item, index) => {

                    const itemTotal =
                      item.total ??
                      Number(item.price || 0) * Number(item.quantity || 0)

                    return (
                      <div
                        key={item.id || index}
                        className="flex items-center gap-3"
                      >

                        {/* PRODUCT IMAGE */}
                        <div
                          className="
                            w-14 h-14 sm:w-16 sm:h-16
                            shrink-0
                            rounded-xl
                            bg-white/70
                            border border-white/90
                            flex items-center justify-center
                            overflow-hidden
                            shadow-sm
                          "
                        >

                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-12 h-12 sm:w-14 sm:h-14 object-contain"
                            />
                          ) : (
                            <span className="text-xl">
                              📦
                            </span>
                          )}

                        </div>

                        {/* PRODUCT DETAILS */}
                        <div className="flex-1 min-w-0">

                        <p className="text-xs sm:text-sm font-extrabold text-stone-950 leading-tight break-words">
                            {item.name}
                          </p>

                          <p className="text-xs font-semibold text-stone-600 mt-1">
                            Qty: {item.quantity}
                          </p>

                          <p className="text-xs font-semibold text-stone-600 mt-0.5">
                        ₹{Number(item.price || 0).toLocaleString('en-IN', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})}
                            {' × '}
                            {item.quantity}
                          </p>

                        </div>

                        {/* PRODUCT TOTAL */}
                        <p className="text-sm font-black text-stone-950 whitespace-nowrap">
                        ₹{Number(itemTotal).toLocaleString('en-IN', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})}
                        </p>

                      </div>
                    )
                  })}

                </div>

                {/* ================= PRICE BREAKDOWN ================= */}
                <div className="border-t border-stone-900/10 pt-5 space-y-3">

                  <div className="flex justify-between text-sm">

                    <span className="font-semibold text-stone-600">
                      Total Items
                    </span>

                    <span className="font-black text-stone-950">
                      {totalItems}
                    </span>

                  </div>

                  <div className="flex justify-between text-sm">

                    <span className="font-semibold text-stone-600">
                      Subtotal
                    </span>

                    <span className="font-black text-stone-950">
                  ₹{totalAmount.toLocaleString('en-IN', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})}
                    </span>

                  </div>

                </div>

                {/* ================= TOTAL ================= */}
                <div className="border-t border-stone-900/20 mt-5 pt-5">

               <div className="flex items-end justify-between gap-2 sm:gap-3">

                    <div>

                      <p className="text-[10px] font-black uppercase tracking-widest text-stone-600">
                        Total Amount
                      </p>

                   <p className="text-xl sm:text-3xl font-black text-[#E85A1C] mt-1">
                   ₹{totalAmount.toLocaleString('en-IN', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})}
                      </p>

                    </div>

                    <span className="text-xs font-black text-[#0D6832]">
                      ✓ Confirmed
                    </span>

                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* ================= CONTINUE SHOPPING ================= */}
 <div className="mt-3">
  <Link
    to="/shop"
    className="
      w-full
      sm:w-auto
      inline-flex
      items-center
      justify-center
      bg-[#E85A1C]
      hover:bg-orange-700
      text-white
      font-black
      px-10
      py-3
      rounded-xl
      shadow-md
      text-sm
      uppercase
      tracking-wide
      transition
    "
  >
    Continue Shopping
  </Link>
</div>

        </section>

      </main>

      <Footer />

    </div>
  )
}