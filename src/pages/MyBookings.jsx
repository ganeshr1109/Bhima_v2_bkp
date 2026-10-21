const bookings = [
  {
    id: 'BKID00001',
    name: 'BHIMA C310 Cargo Loader',
    category: 'Cargo Loader',
    price: 190000,
    date: '16 Oct 2026',
    status: 'Booking requested',
    description: 'Commercial electric cargo vehicle',
    image: `${import.meta.env.BASE_URL}assets/bhima-c310.webp`,
  },
]

const formatPrice = (price) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price)

export default function MyBookings() {
  return (
    <div>
      <div className="flex flex-col justify-between gap-3 border-b border-stone-200/80 pb-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-[#E85A1C]">
            Vehicle reservations
          </p>
          <h2 className="mt-1 text-xl font-black sm:text-2xl">My Vehicle Bookings</h2>
          <p className="mt-1 text-sm text-stone-600">
            Review your vehicle reservation details and booking status.
          </p>
        </div>
        <span className="w-fit rounded-full bg-white/60 px-3 py-1 text-xs font-bold text-stone-600">
          {bookings.length}  booking
        </span>
      </div>

      <div className="mt-4 space-y-3">
        {bookings.length ? bookings.map((booking) => (
          <article key={booking.id} className="overflow-hidden rounded-2xl border border-white/70 bg-white/45 shadow-sm">
            <div className="flex flex-col gap-3 p-3 sm:flex-row sm:items-center sm:p-4">
              <div className="flex h-24 w-full shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white/70 p-2 sm:h-24 sm:w-28">
                <img
                  src={booking.image}
                  alt={booking.name}
                  className="max-h-full max-w-full object-contain"
                  onError={(event) => { event.currentTarget.style.display = 'none' }}
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-[#E85A1C]/10 px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-[#C94A15]">
                    {booking.category}
                  </span>
                  <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-bold text-amber-800 ring-1 ring-amber-200">
                    {booking.status}
                  </span>
                </div>
                <h3 className="mt-2 break-words text-base font-black text-stone-900 sm:text-lg">
                  {booking.name}
                </h3>
                <p className="mt-1 text-xs text-stone-600">{booking.description}</p>
                <p className="mt-2 text-xs text-stone-500">
                  Booking reference: <strong className="text-stone-700">{booking.id}</strong>
                  <span className="mx-2">•</span>{booking.date}
                </p>
              </div>
              <div className="flex items-center justify-between border-t border-stone-200/70 pt-3 sm:min-w-[125px] sm:flex-col sm:items-end sm:justify-center sm:border-l sm:border-t-0 sm:pl-4 sm:pt-0">
                <span className="text-xs font-semibold text-stone-500">Vehicle price</span>
                <span className="text-lg font-black text-stone-900">{formatPrice(booking.price)}</span>
              </div>
            </div>
          </article>
        )) : (
          <div className="rounded-2xl border border-dashed border-stone-300 bg-white/30 p-8 text-center">
            <h3 className="font-black">No vehicle bookings yet</h3>
            <p className="mt-1 text-sm text-stone-600">Your vehicle reservations will appear here.</p>
          </div>
        )}
      </div>

      <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50/80 p-3 text-xs leading-relaxed text-amber-900">
        Your bookings will appear here when a vehicle reservation has been made.
      </p>
    </div>
  )
}