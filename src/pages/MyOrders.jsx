const orders = [
  {
    id: 'ORD-00001',
    name: 'BHIMA Fleet T-Shirt',
    category: 'Merchandise',
    price: 550,
    date: '16 Oct 2026',
    status: 'Order placed',
    description: 'Durable cotton-blend BHIMA T-shirt',
    image: `${import.meta.env.BASE_URL}assets/shop/bhima-t-shirt.webp`,
  },
]

const formatPrice = (price) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price)

export default function MyOrders() {
  return (
    <div>
      <div className="flex flex-col justify-between gap-3 border-b border-stone-200/80 pb-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-[#E85A1C]">
            Shop purchases
          </p>
          <h2 className="mt-1 text-xl font-black sm:text-2xl">My Shop Orders</h2>
          <p className="mt-1 text-sm text-stone-600">
            View your merchandise, accessories, and spare-parts purchases.
          </p>
        </div>
        <span className="w-fit rounded-full bg-white/60 px-3 py-1 text-xs font-bold text-stone-600">
          {orders.length}   order
        </span>
      </div>

      <div className="mt-4 space-y-3">
        {orders.length ? orders.map((order) => (
          <article key={order.id} className="overflow-hidden rounded-2xl border border-white/70 bg-white/45 shadow-sm">
            <div className="flex flex-col gap-3 p-3 sm:flex-row sm:items-center sm:p-4">
              <div className="flex h-24 w-full shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white/70 p-2 sm:h-24 sm:w-28">
                <img
                  src={order.image}
                  alt={order.name}
                  className="max-h-full max-w-full object-contain"
                  onError={(event) => { event.currentTarget.style.display = 'none' }}
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-[#E85A1C]/10 px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-[#C94A15]">
                    {order.category}
                  </span>
                  <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-bold text-blue-800 ring-1 ring-blue-200">
                    {order.status}
                  </span>
                </div>
                <h3 className="mt-2 break-words text-base font-black text-stone-900 sm:text-lg">
                  {order.name}
                </h3>
                <p className="mt-1 text-xs text-stone-600">{order.description}</p>
                <p className="mt-2 text-xs text-stone-500">
                  Order reference: <strong className="text-stone-700">{order.id}</strong>
                  <span className="mx-2">•</span>{order.date}
                </p>
              </div>
              <div className="flex items-center justify-between border-t border-stone-200/70 pt-3 sm:min-w-[125px] sm:flex-col sm:items-end sm:justify-center sm:border-l sm:border-t-0 sm:pl-4 sm:pt-0">
                <span className="text-xs font-semibold text-stone-500">Order amount</span>
                <span className="text-lg font-black text-stone-900">{formatPrice(order.price)}</span>
              </div>
            </div>
          </article>
        )) : (
          <div className="rounded-2xl border border-dashed border-stone-300 bg-white/30 p-8 text-center">
            <h3 className="font-black">No shop orders yet</h3>
            <p className="mt-1 text-sm text-stone-600">Your shop purchases will appear here.</p>
          </div>
        )}
      </div>

      <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50/80 p-3 text-xs leading-relaxed text-amber-900">
        Order history will update when your purchases are available.
      </p>
    </div>
  )
}