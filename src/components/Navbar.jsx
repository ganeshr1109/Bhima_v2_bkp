import { useEffect, useRef, useState } from 'react'
import { useCart } from '../context/CartContext'
import { Link } from 'react-router-dom'
import { vehicles } from '../data/vehicles'
import { useAuth } from '../context/AuthContext'
const onRoad = [vehicles.c310, vehicles.px4]
const offRoad = [vehicles.lowbed, vehicles.trolley]

/**
 * Shared site navigation. `transparent` renders the glassy variant used
 * on the home page (over the patterned hero); otherwise a solid white bar
 * is used, matching the original spec / checkout / register pages.
 */
export default function Navbar({
  
   transparent = false,
  showRegister = true,
  showBackButton = false,
  fixedOnScroll = true,
}



) {

   const { isAuthenticated } = useAuth()
  const profilePath = isAuthenticated ? '/profile' : '/login'

  const { cartCount } = useCart()
const [mobileOpen, setMobileOpen] = useState(false)
const navRef = useRef(null)

useEffect(() => {
  if (!navRef.current) return

  const updateNavbarHeight = () => {
const height = navRef.current.getBoundingClientRect().height

document.documentElement.style.setProperty(
  '--navbar-height',
  `${height - 1}px`
)
  }

  updateNavbarHeight()

  const observer = new ResizeObserver(updateNavbarHeight)
  observer.observe(navRef.current)

  window.addEventListener('resize', updateNavbarHeight)

  return () => {
    observer.disconnect()
    window.removeEventListener('resize', updateNavbarHeight)
  }
}, [])
const scrollToSection = (id) => {
  setMobileOpen(false)

  document.getElementById(id)?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  })
}

const navBg = transparent
  ? 'truck-nav-bg text-stone-900 !shadow-none !border-0'
  : 'bg-white shadow-md border-b border-gray-100'
 

  return (
<nav
  ref={navRef}
  className={`${navBg} ${
    fixedOnScroll
      ? 'fixed top-0 left-0 right-0 w-full z-[9999]'
      : 'sticky top-0 z-50'
  }`}
>
      <div className="max-w-[87.3rem] mx-auto px-6 py-4 flex justify-between items-center relative z-10">
        <Link
          to="/"
          className={
            transparent
              ? 'flex items-center bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-white/80 shadow-sm'
              : 'flex items-center'
          }
        >
          <img
              src={`${import.meta.env.BASE_URL}assets/bhima-mobility-logo.png`}
            alt="BHIMA Mobility Logo"
            className="h-10 md:h-12 object-contain drop-shadow-sm"
          />
        </Link>

        {/* DESKTOP MENU */}
  {/* DESKTOP MENU */}
<div className="desktop-menu hidden md:flex items-center absolute left-1/2 -translate-x-1/2">

  {/* NAVBAR GLASS */}
  <div
    className={
      transparent
        ? 'flex items-center space-x-6 font-extrabold text-stone-800 text-base bg-white/50 backdrop-blur-md px-8 py-2.5 rounded-full border border-white/60 shadow-md'
        : 'flex space-x-10 font-extrabold text-gray-900 text-base items-center'
    }
  >

    <Link
      to="/"
      className="hover:text-[#E85A1C] transition"
    >
      Home
    </Link>

    {/* VEHICLES */}

<div className="vehicles-trigger py-1 relative">
  <button
   
    className="flex items-center space-x-1.5 hover:text-[#E85A1C] transition focus:outline-none"
  >
    <span>Vehicles</span>

    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
        d="M19 9l-7 7-7-7"
      />
    </svg>
  </button>
</div>
    <Link
      to="/shop"
      className="hover:text-[#E85A1C] transition flex items-center gap-1"
    >
      <span>Shop</span>

      <span className="bg-[#E85A1C] text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
        Store
      </span>
    </Link>

    <Link
      to="/register"
      className="hover:text-[#E85A1C] transition"
    >
      Contact Us
    </Link>

  </div>

  {/* VEHICLES DROPDOWN */}
<div
  className={`
    dropdown-menu
    absolute left-1/2 -translate-x-1/2
    top-[calc(100%+8px)]
    w-[950px]
    bg-white/50
    backdrop-blur-[8px]
    rounded-3xl
    border border-white/60
    p-8
opacity-0 invisible translate-y-[-8px]
    transition-all duration-300
    z-[10000]
    grid grid-cols-2 gap-8
    text-black
    shadow-[0_20px_40px_rgba(0,0,0,0.08)]
  `}
>

    {/* ON ROAD */}
    <div>
      <h3 className="text-sm font-black text-[#E85A1C] uppercase tracking-wider mb-4 pb-2 border-b border-stone-200">
        RTO Certified On Road Vehicles
      </h3>

      <div className="grid grid-cols-2 gap-4">
        {onRoad.map((v) => (
          <VehicleMenuCard
            key={v.slug}
            vehicle={v}
          />
        ))}
      </div>
    </div>

    {/* OFF ROAD */}
    <div>
      <h3 className="text-sm font-black text-stone-800 uppercase tracking-wider mb-4 pb-2 border-b border-stone-200">
        Off Road Indoor Vehicles
      </h3>

      <div className="grid grid-cols-2 gap-4">
        {offRoad.map((v) => (
          <VehicleMenuCard
            key={v.slug}
            vehicle={v}
          />
        ))}
      </div>
    </div>

  </div>

</div>
<div className="hidden md:flex items-center space-x-3">

<Link
  to="/cart"
  className="
    relative
    flex
    items-center
    gap-2
    bg-white/50
    backdrop-blur-md
    text-stone-800
    font-extrabold
    py-2.5
    px-5
    rounded-full
    border
    border-white/60
    shadow-md
    text-base
    hover:bg-white/55
    hover:text-[#E85A1C]
    transition
  "
>
<span className="text-black">
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    strokeWidth="2.5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 3h2l2.4 11.2a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 1.9-1.4L21 7H6"
    />
    <circle cx="10" cy="20" r="1.5" />
    <circle cx="18" cy="20" r="1.5" />
  </svg>
</span>
  <span>
    Cart
  </span>

  {cartCount > 0 && (
    <span
      className="
        absolute
        -top-2
        -right-1
        min-w-[21px]
        h-[21px]
        px-1
        flex
        items-center
        justify-center
        bg-[#E85A1C]
        text-white
        text-[10px]
        font-black
        rounded-full
        border-2
        border-white
      "
    >
      {cartCount}
    </span>
  )}
</Link>
{/* PROFILE BUTTON */}
<Link
 to={profilePath}
  className="
    flex items-center gap-2
    bg-white/50 backdrop-blur-md
    text-stone-800 font-extrabold
    py-2.5 px-5 rounded-full
    border border-white/60 shadow-md
    text-base
    hover:bg-white/55
    hover:text-[#E85A1C]
    transition
  "
>
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    strokeWidth="2.5"
  >
    <circle cx="12" cy="8" r="4" />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 21v-2a8 8 0 0116 0v2"
    />
  </svg>

  <span>Profile</span>
</Link>
  {/* REGISTER / BACK */}


</div>

        {/* MOBILE HAMBURGER */}
        <button
          onClick={() => setMobileOpen((o) => !o)}
          className="md:hidden text-stone-900 focus:outline-none bg-white/50 p-2 rounded-xl backdrop-blur-sm"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* MOBILE MENU */}
{mobileOpen && (
<div
  className="
    md:hidden
    absolute
    top-full
    left-0
    w-full
    bg-white/50
    backdrop-blur-[8px]
    border
    border-white/35
    px-6
    py-4
    space-y-4
    font-bold
    text-sm
    text-stone-900
    z-50
    shadow-[0_10px_30px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.6)]
  "
>
          <Link to="/" className="block text-stone-900 hover:text-[#E85A1C]" onClick={() => setMobileOpen(false)}>Home</Link>
        <Link
  to="/shop"
className="block text-stone-900 hover:text-[#E85A1C]"
  onClick={() => setMobileOpen(false)}
>
  Shop
</Link>
<Link
  to="/cart"
  className="
    flex
    items-center
    justify-between
    hover:text-[#E85A1C]
  "
  onClick={() => setMobileOpen(false)}
>
  <span className="flex items-center gap-2">

    {/* BLACK CART ICON */}
    <svg
      className="w-5 h-5 text-black shrink-0"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth="2.5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 3h2l2.4 11.2a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 1.9-1.4L21 7H6"
      />
      <circle cx="10" cy="20" r="1.5" />
      <circle cx="18" cy="20" r="1.5" />
    </svg>

    <span>
      Shopping Cart
    </span>

  </span>

  {cartCount > 0 && (
    <span
      className="
        bg-[#E85A1C]
        text-white
        text-[10px]
        font-black
        px-2
        py-1
        rounded-full
      "
    >
      {cartCount}
    </span>
  )}
</Link>
       <div className="border-t border-b border-white/35 py-2 space-y-2">
            <p className="text-xs uppercase font-black text-stone-400">Vehicles</p>
            {[...onRoad, ...offRoad].map((v) => (
              <Link
                key={v.slug}
                to={`/vehicles/${v.slug}`}
                className="block pl-3"
                onClick={() => setMobileOpen(false)}
              >
                {v.name}
              </Link>
            ))}
          </div>
          {/* MOBILE PROFILE */}
<Link
to={profilePath}
  className="
    flex items-center gap-2
    text-stone-900
    hover:text-[#E85A1C]
    transition
  "
  onClick={() => setMobileOpen(false)}
>
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    strokeWidth="2.5"
  >
    <circle cx="12" cy="8" r="4" />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 21v-2a8 8 0 0116 0v2"
    />
  </svg>

  <span>Profile</span>
</Link>
<Link
  to="/register"
className="block text-stone-900 hover:text-[#E85A1C]"
  onClick={() => setMobileOpen(false)}
>
  Contact Us
</Link>
          <Link
            to="/register"
            className="block bg-stone-900 text-white text-center font-black py-2.5 rounded-xl shadow-sm"
            onClick={() => setMobileOpen(false)}
          >
            Register
          </Link>
        </div>
      )}
    </nav>
  )
}

function VehicleMenuCard({ vehicle }) {
  return (
  <div className="bg-white/30 backdrop-blur-md border border-white/40 shadow-sm p-4 rounded-2xl text-center flex flex-col justify-between backdrop-blur-md border border-[#E85A1C]/30 transition hover:border-[#E85A1C]/50">

      <Link to={`/vehicles/${vehicle.slug}`} className="block">

        <div className="h-28 flex items-center justify-center mb-2 overflow-hidden">
          <img
            src={vehicle.images?.[0] || vehicle.image}
            alt={vehicle.name}
            className="max-h-full max-w-full object-contain"
          />
        </div>

        <h4 className="font-black text-stone-900 text-sm text-stone-900 hover:text-[#E85A1C]">
          {vehicle.name}
        </h4>

      </Link>

      <div className="mt-3">
        <Link
          to={`/vehicles/${vehicle.slug}`}
          className="bg-[#E85A1C] hover:bg-stone-900 text-white text-xs font-black py-2 px-3 rounded-xl transition block text-center"
        >
          Inquire / Book
        </Link>
      </div>

    </div>
  )
}
