import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import MyOrders from './MyOrders'
import MyBookings from './MyBookings'

export default function Profile() {
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const { logout } = useAuth()
  const navigate = useNavigate()
  const [activeSection, setActiveSection] = useState('profile')
  const [customer, setCustomer] = useState({
    name: 'Ganesh Rahangdale',
    mobile: '9876543210',
    email: 'ganesh@example.com',
    address: 'Nagpur, Maharashtra, India',
  })
  const [savedMessage, setSavedMessage] = useState('')
  const [historyTab, setHistoryTab] = useState('orders')

  const updateField = (field, value) => {
    setCustomer((current) => ({ ...current, [field]: value }))
    setSavedMessage('')
  }

  const handleSave = (event) => {
    event.preventDefault()
    setSavedMessage('Your profile changes have been saved.')
  }

  const handleLogout = () => {
  setShowLogoutConfirm(true)
}

const confirmLogout = () => {
  setShowLogoutConfirm(false)
  logout()
  navigate('/login', { replace: true })
}

  const initials =
    customer.name
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0])
      .join('')
      .toUpperCase() || 'BH'

  const menuItems = [
    {
      id: 'profile',
      label: 'My Profile',
      description: 'Personal details',
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <circle cx="12" cy="8" r="4" />
          <path strokeLinecap="round" d="M4 21a8 8 0 0 1 16 0" />
        </svg>
      ),
    },
    {
      id: 'history',
      label: 'Order History',
      description: 'Shop orders & vehicle bookings',
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 3h9l4 4v14H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M14 3v5h5M8 13h8M8 17h8" />
        </svg>
      ),
    },
  ]

  return (
    <div className="pattern-body-bg min-h-screen w-full overflow-x-clip text-stone-900 antialiased">
      <Navbar transparent fixedOnScroll />

      <main className="w-full py-3 sm:py-5">
        <section className="glass-section mx-auto box-border w-[95%] max-w-[1350px] px-3 py-4 sm:px-5 md:px-8 lg:px-10">
          <div className="mb-4 text-center sm:mb-5">
           <span className="inline-block mb-2 rounded-full border border-white/40 bg-white/30 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-[#E85A1C] shadow-sm backdrop-blur-md md:text-xs">
  My Account
</span>
         
          </div>

          <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-[220px_minmax(0,1fr)] lg:grid-cols-[245px_minmax(0,1fr)] lg:gap-6">
            {/* Sticky account menu */}
            <aside className="h-fit rounded-2xl border border-white/60 bg-white/40 p-2 shadow-sm backdrop-blur-md md:sticky md:top-24">
              <p className="px-3 pb-2 pt-2 text-[10px] font-black uppercase tracking-widest text-stone-500">
                Account Menu
              </p>

              <nav className="grid grid-cols-2 gap-1 md:grid-cols-1" aria-label="Account menu">
                {menuItems.map((item) => {
                  const isActive = activeSection === item.id
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveSection(item.id)}
                      aria-current={isActive ? 'page' : undefined}
                      className={`flex min-w-0 items-center gap-2 rounded-xl px-2 py-3 text-left transition md:px-3 ${
                        isActive
                          ? 'bg-[#E85A1C] text-white shadow-sm'
                          : 'text-stone-700 hover:bg-white/75 hover:text-[#E85A1C]'
                      }`}
                    >
                      <span className="shrink-0">{item.icon}</span>
                      <span className="min-w-0">
                        <span className="block text-xs font-black md:text-sm">{item.label}</span>
                        <span className={`hidden text-[11px] md:block ${isActive ? 'text-white/85' : 'text-stone-500'}`}>
                          {item.description}
                        </span>
                      </span>
                    </button>
                  )
                })}
              </nav>

              <div className="mt-2 border-t border-white/70 pt-2">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 rounded-xl px-3 py-3 text-left text-sm font-bold text-stone-700 transition hover:bg-red-50 hover:text-red-700"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 17l5-5-5-5M15 12H3M12 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-6" />
                  </svg>
                  Logout
                </button>
              </div>
            </aside>

            {/* Right panel */}
            <section className="min-w-0 rounded-2xl border border-white/60 bg-white/35 p-3 shadow-sm backdrop-blur-md sm:p-5 lg:p-6">
              {activeSection === 'profile' && (
                <>
                  <div className="border-b border-stone-200/80 pb-3">
                    <h2 className="text-xl font-black sm:text-2xl">
                      Welcome, {customer.name}
                    </h2>
                    <p className="mt-1 text-sm text-stone-600">
                      View and update your customer information.
                    </p>
                  </div>

                  <div className="flex flex-col items-start gap-3 py-4 sm:flex-row sm:items-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-white bg-[#E85A1C]/10 text-2xl font-black text-[#E85A1C] shadow-md">
                      {initials}
                    </div>
                    <div>
                      <p className="font-extrabold text-stone-900">Profile Picture</p>
                      <p className="mt-1 text-sm text-stone-600">
                        Your BHIMA Mobility account details
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleSave}>
                    <div className="grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2">
                      <ProfileField label="Customer Name" value={customer.name} onChange={(value) => updateField('name', value)} autoComplete="name" required />
                      <ProfileField label="Email Address" type="email" value={customer.email} onChange={(value) => updateField('email', value)} autoComplete="email" required />
                      <ProfileField label="Mobile Number" value={customer.mobile} onChange={(value) => updateField('mobile', value.replace(/\D/g, '').slice(0, 10))} autoComplete="tel" inputMode="numeric" maxLength={10} required />
                      <ProfileField label="Address" value={customer.address} onChange={(value) => updateField('address', value)} autoComplete="street-address" required />
                    </div>

                    {savedMessage && (
                      <p role="status" className="mt-4 rounded-xl border border-green-200 bg-green-50/80 px-3 py-2 text-sm font-semibold text-green-800">
                        {savedMessage}
                      </p>
                    )}

                    <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
                      <button type="submit" className="inline-flex items-center justify-center rounded-xl bg-[#E85A1C] px-7 py-3 text-sm font-black text-white shadow-md transition hover:bg-stone-900">
                        Save Changes
                      </button>
                      <Link to="/" className="inline-flex items-center justify-center rounded-xl border border-stone-300 bg-white/45 px-6 py-3 text-sm font-bold text-stone-800 no-underline transition hover:bg-white/75">
                        Back to Home
                      </Link>
                    </div>
                    <p className="mt-3 text-[11px] leading-relaxed text-stone-500">
                      Keep your contact information up to date so we can reach you about your orders and bookings.
                    </p>
                  </form>
                </>
              )}

              {activeSection === 'history' && (
                <>
                  <div className="border-b border-stone-200/80 pb-4">
                    <h2 className="text-xl font-black sm:text-2xl">Order History</h2>
                    <p className="mt-1 text-sm text-stone-600">
                      View your shop orders and vehicle bookings in one place.
                    </p>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2" role="tablist" aria-label="Order history categories">
                    <button
                      type="button"
                      role="tab"
                      aria-selected={historyTab === 'orders'}
                      onClick={() => setHistoryTab('orders')}
                      className={`rounded-xl px-4 py-2.5 text-sm font-extrabold transition ${
                        historyTab === 'orders'
                          ? 'bg-[#E85A1C] text-white shadow-sm'
                          : 'border border-stone-200 bg-white/50 text-stone-700 hover:bg-white/80'
                      }`}
                    >
                      My Orders
                    </button>
                    <button
                      type="button"
                      role="tab"
                      aria-selected={historyTab === 'bookings'}
                      onClick={() => setHistoryTab('bookings')}
                      className={`rounded-xl px-4 py-2.5 text-sm font-extrabold transition ${
                        historyTab === 'bookings'
                          ? 'bg-[#E85A1C] text-white shadow-sm'
                          : 'border border-stone-200 bg-white/50 text-stone-700 hover:bg-white/80'
                      }`}
                    >
                      My Bookings
                    </button>
                  </div>

                  <div className="mt-4" role="tabpanel">
                    {historyTab === 'orders' ? <MyOrders /> : <MyBookings />}
                  </div>
                </>
              )}
            </section>
          </div>
        </section>
      </main>
{showLogoutConfirm && (
  <div
    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
    onClick={() => setShowLogoutConfirm(false)}
  >
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="logout-title"
      onClick={(event) => event.stopPropagation()}
      className="w-full max-w-sm rounded-2xl border border-white/60 bg-white p-6 shadow-2xl"
    >
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-orange-100 text-[#E85A1C]">
          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 17l5-5-5-5M15 12H3M12 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-6"
            />
          </svg>
        </div>

        <h2
          id="logout-title"
          className="text-xl font-black text-stone-900"
        >
          Are you sure?
        </h2>
      </div>

      <p className="mb-6 text-sm text-stone-600">
        You will be logged out!
      </p>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={confirmLogout}
          className="flex-1 rounded-xl bg-[#E85A1C] px-3 py-3 text-sm font-bold text-white transition hover:bg-stone-900"
        >
          Yes, logout!
        </button>

        <button
          type="button"
          onClick={() => setShowLogoutConfirm(false)}
          className="flex-1 rounded-xl border border-stone-300 bg-white px-3 py-3 text-sm font-bold text-stone-700 transition hover:bg-stone-100"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}

<Footer />
   
    </div>
  )
}

function ProfileField({
  label,
  value,
  onChange,
  type = 'text',
  autoComplete,
  inputMode,
  maxLength,
  required = false,
}) {
  const id = label.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className="min-w-0">
      <label htmlFor={id} className="mb-1.5 block text-sm font-bold text-stone-800">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        autoComplete={autoComplete}
        inputMode={inputMode}
        maxLength={maxLength}
        required={required}
        className="box-border w-full min-w-0 rounded-xl border border-stone-300/90 bg-white/75 px-3 py-3 text-sm font-medium text-stone-800 outline-none transition placeholder:text-stone-400 focus:border-[#E85A1C] focus:ring-2 focus:ring-[#E85A1C]/15"
      />
    </div>
  )
}