
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const stateCityMap = {
  'Andhra Pradesh': ['Amaravati', 'Visakhapatnam', 'Vijayawada', 'Guntur', 'Tirupati'],
  'Arunachal Pradesh': ['Itanagar', 'Naharlagun', 'Pasighat'],
  Assam: ['Guwahati', 'Dibrugarh', 'Silchar', 'Jorhat'],
  Bihar: ['Patna', 'Gaya', 'Muzaffarpur', 'Bhagalpur'],
  Chhattisgarh: ['Raipur', 'Bhilai', 'Bilaspur', 'Korba'],
  Goa: ['Panaji', 'Margao', 'Vasco da Gama'],
  Gujarat: ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Gandhinagar'],
  Haryana: ['Gurugram', 'Faridabad', 'Panipat', 'Hisar', 'Ambala'],
  'Himachal Pradesh': ['Shimla', 'Dharamshala', 'Mandi', 'Solan'],
  Jharkhand: ['Ranchi', 'Jamshedpur', 'Dhanbad', 'Bokaro'],
  Karnataka: ['Bengaluru', 'Mysuru', 'Mangaluru', 'Hubballi', 'Belagavi'],
  Kerala: ['Thiruvananthapuram', 'Kochi', 'Kozhikode', 'Thrissur'],
  'Madhya Pradesh': ['Bhopal', 'Indore', 'Jabalpur', 'Gwalior', 'Ujjain'],
  Maharashtra: ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Chhatrapati Sambhajinagar', 'Thane'],
  Manipur: ['Imphal', 'Thoubal', 'Churachandpur'],
  Meghalaya: ['Shillong', 'Tura', 'Jowai'],
  Mizoram: ['Aizawl', 'Lunglei', 'Champhai'],
  Nagaland: ['Kohima', 'Dimapur', 'Mokokchung'],
  Odisha: ['Bhubaneswar', 'Cuttack', 'Rourkela', 'Sambalpur'],
  Punjab: ['Chandigarh', 'Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala'],
  Rajasthan: ['Jaipur', 'Jodhpur', 'Udaipur', 'Kota', 'Ajmer'],
  Sikkim: ['Gangtok', 'Namchi', 'Gyalshing'],
  'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Salem', 'Tiruchirappalli'],
  Telangana: ['Hyderabad', 'Warangal', 'Karimnagar', 'Nizamabad'],
  Tripura: ['Agartala', 'Udaipur', 'Dharmanagar'],
  'Uttar Pradesh': ['Lucknow', 'Noida', 'Kanpur', 'Agra', 'Varanasi', 'Prayagraj'],
  Uttarakhand: ['Dehradun', 'Haridwar', 'Haldwani', 'Rishikesh'],
  'West Bengal': ['Kolkata', 'Howrah', 'Durgapur', 'Siliguri'],
  'Andaman and Nicobar Islands': ['Port Blair'],
  Chandigarh: ['Chandigarh'],
  'Dadra and Nagar Haveli and Daman and Diu': ['Daman', 'Silvassa'],
  Delhi: ['New Delhi', 'Delhi'],
  'Jammu and Kashmir': ['Srinagar', 'Jammu', 'Anantnag'],
  Ladakh: ['Leh', 'Kargil'],
  Lakshadweep: ['Kavaratti'],
  Puducherry: ['Puducherry', 'Karaikal'],
}

export default function Signup() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    password: '',
    address: '',
    state: '',
    city: '',
    pincode: '',
  })

  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target

    setError('')

    if (name === 'mobile') {
      setFormData((prev) => ({
        ...prev,
        mobile: value.replace(/\D/g, '').slice(0, 10),
      }))
      return
    }

    if (name === 'pincode') {
      setFormData((prev) => ({
        ...prev,
        pincode: value.replace(/\D/g, '').slice(0, 6),
      }))
      return
    }

    if (name === 'state') {
      setFormData((prev) => ({
        ...prev,
        state: value,
        city: '',
      }))
      return
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!formData.fullName.trim()) {
      setError('Please enter your full name.')
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email address.')
      return
    }

    if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
      setError('Please enter a valid 10-digit Indian mobile number.')
      return
    }

    if (formData.password.length < 8) {
      setError('Password must contain at least 8 characters.')
      return
    }

    if (!formData.address.trim()) {
      setError('Please enter your address.')
      return
    }

    if (!formData.state || !formData.city) {
      setError('Please select your state and city.')
      return
    }

    if (!/^\d{6}$/.test(formData.pincode)) {
      setError('Please enter a valid 6-digit PIN code.')
      return
    }

    // Connect your customer registration API here.
    setError('Registration API is not connected yet.')
  }

const inputClass = `
  box-border w-full min-w-0 h-[42px]
  bg-white/40 backdrop-blur-md
  border border-white/50
  rounded-xl px-3 py-2.5
  text-sm font-bold text-gray-900
  placeholder:text-gray-500
  focus:outline-none
  focus:border-[#E85A1C]
  focus:bg-white/60
  transition
  sm:px-4
`

  return (
    <div className="pattern-body-bg min-h-screen w-full min-w-0 overflow-x-clip text-stone-900 antialiased">
      <Navbar transparent fixedOnScroll />

      <main className="w-full min-w-0 px-0 pt-2 pb-4 sm:pt-3 sm:pb-5">
        {/* Outer glass */}
        <section
          className="
            glass-section box-border
            !w-[calc(100%_-_16px)]
            !max-w-[470px]
            mx-auto
            px-3 py-3
            min-[360px]:px-4
            sm:px-5 sm:py-4
          "
        >
          <div className="mx-auto w-full min-w-0 max-w-[450px]">
            <h2
              className="
                mb-3 text-center
                text-2xl font-black tracking-tight text-stone-800
                sm:mb-4 
              "
            >
              Customer Registration
            </h2>

            {/* Inner glass */}
            <div
              className="
                box-border w-full min-w-0
                rounded-2xl border border-white/60
                bg-white/30 p-3 sm:p-4
                shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]
                backdrop-blur-md
              "
            >
              <form
                onSubmit={handleSubmit}
                className="w-full min-w-0 space-y-2 sm:space-y-2.5"
              >
                {/* Full Name */}
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  placeholder="Full Name"
                  aria-label="Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  maxLength={150}
                  required
                  className={inputClass}
                />

                {/* Email */}
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Email ID"
                  aria-label="Email ID"
                  value={formData.email}
                  onChange={handleChange}
                  maxLength={150}
                  required
                  className={inputClass}
                />

                {/* Mobile Number */}
                <div
className="
  flex h-[42px] w-full min-w-0 overflow-hidden
  rounded-xl border border-white/50
  bg-white/40 backdrop-blur-md
  transition
  focus-within:border-[#E85A1C]
  focus-within:bg-white/60
"
                >
                  <span
                    className="
                      flex shrink-0 items-center
                      border-r border-stone-200/80
                      px-2.5 text-sm font-extrabold text-stone-700
                      min-[360px]:px-3 sm:px-4
                    "
                  >
                    +91
                  </span>

                  <input
                    id="mobile"
                    name="mobile"
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel-national"
                    placeholder="Mobile Number"
                    aria-label="Mobile Number"
                    value={formData.mobile}
                    onChange={handleChange}
                    maxLength={10}
                    required
                    className="
                      h-full w-full min-w-0 flex-1
                      bg-transparent px-2.5
                      text-sm font-semibold text-stone-900
                      outline-none placeholder:text-stone-500
                      min-[360px]:px-3 sm:px-4
                    "
                  />
                </div>

                {/* Password */}
                <div
                 className="
  flex h-[42px] w-full min-w-0 items-center
  overflow-hidden rounded-xl
  border border-white/50
  bg-white/40 backdrop-blur-md
  transition
  focus-within:border-[#E85A1C]
  focus-within:bg-white/60
"
                >
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    placeholder="Password"
                    aria-label="Password"
                    value={formData.password}
                    onChange={handleChange}
                    minLength={8}
                    required
                    className="
                      h-full w-full min-w-0 flex-1
                      bg-transparent px-3
                      text-sm font-semibold text-stone-900
                      outline-none placeholder:text-stone-500
                      sm:px-4
                    "
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    className="
                      h-full shrink-0 px-2.5
                      text-sm font-extrabold text-[#E85A1C]
                      transition hover:text-stone-900
                      min-[360px]:px-3 sm:px-4
                    "
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>

                {/* Address - same height as other fields */}
                <input
                  id="address"
                  name="address"
                  type="text"
                  autoComplete="street-address"
                  placeholder="Address"
                  aria-label="Address"
                  value={formData.address}
                  onChange={handleChange}
                  maxLength={500}
                  required
                  className={inputClass}
                />

                {/* State */}
                <select
                  id="state"
                  name="state"
                  autoComplete="address-level1"
                  aria-label="Select State"
                  value={formData.state}
                  onChange={handleChange}
                  required
                  className={`${inputClass} cursor-pointer`}
                >
                  <option value="">Select State</option>
                  {Object.keys(stateCityMap)
                    .sort()
                    .map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                </select>

                {/* City */}
                <select
                  id="city"
                  name="city"
                  autoComplete="address-level2"
                  aria-label="Select City"
                  value={formData.city}
                  onChange={handleChange}
                  disabled={!formData.state}
                  required
                  className={`
                    ${inputClass}
                    ${formData.state ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'}
                  `}
                >
                  <option value="">
                    {formData.state ? 'Select City' : 'Select State First'}
                  </option>
                  {(stateCityMap[formData.state] || []).map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>

                {/* PIN Code */}
                <input
                  id="pincode"
                  name="pincode"
                  type="text"
                  inputMode="numeric"
                  autoComplete="postal-code"
                  placeholder="PIN Code"
                  aria-label="PIN Code"
                  value={formData.pincode}
                  onChange={handleChange}
                  maxLength={6}
                  required
                  className={inputClass}
                />

                {/* Error */}
                {error && (
                  <p
                    role="alert"
                    className="
                      break-words rounded-lg border border-red-200
                      bg-red-50/90 px-3 py-2
                      text-sm font-semibold text-red-700
                    "
                  >
                    {error}
                  </p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  className="
                    h-[42px] w-full min-w-0 rounded-full
                    bg-[#E85A1C] px-4
                    text-sm font-black uppercase tracking-wide text-white
                    shadow-md transition duration-200
                    hover:bg-stone-900 hover:shadow-lg
                    focus-visible:outline-none
                    focus-visible:ring-2 focus-visible:ring-[#E85A1C]
                    focus-visible:ring-offset-2
                  "
                >
                  Submit
                </button>

                {/* Existing Customer */}
                <p className="break-words pt-1 text-center text-sm font-bold text-stone-700 sm:text-[0.95rem]">
                  Already a customer?{' '}
                  <Link
                    to="/login"
                    className="
                      font-black text-[#E85A1C] no-underline
                      transition hover:text-stone-900
                    "
                  >
                    Sign in
                  </Link>
                </p>
              </form>
            </div>

            {/* Back to Home */}
            <div className="mt-3 text-center">
              <Link
                to="/"
                className="
                  inline-flex max-w-full items-center justify-center gap-2
                  text-sm font-extrabold text-stone-700 no-underline
                  transition hover:text-[#E85A1C] sm:text-base
                "
              >
                ← Back to Home
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
