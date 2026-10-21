
import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import {Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
export default function Login() {

  const [mobile, setMobile] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loginMessage, setLoginMessage] = useState('')
const navigate = useNavigate()
const location = useLocation()
const { login } = useAuth()


const handleSubmit = (e) => {
  e.preventDefault()
  setError('')

  if (!/^[6-9]\d{9}$/.test(mobile)) {
    setError('Please enter a valid 10-digit mobile number.')
    return
  }

  if (!password.trim()) {
    setError('Please enter your password.')
    return
  }

  login()

  setLoginMessage('Welcome back! Login successful')

  setTimeout(() => {
    setLoginMessage('')
    handleContinue()
  }, 1000)
}


const handleContinue = () => {
  const destination = location.state?.from
  const destinationPath = destination
    ? `${destination.pathname}${destination.search || ''}${destination.hash || ''}`
    : '/profile'

  navigate(destinationPath, { replace: true })
}

  return (
    <div className="pattern-body-bg min-h-screen w-full min-w-0 overflow-x-clip text-stone-900 antialiased">
      <Navbar transparent fixedOnScroll />

      {/* Login success notification — matches the Shop page cart alert */}
      {loginMessage && (
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
              {loginMessage}
            </span>

            {/* Progress Bar */}
            <div className="absolute bottom-0 left-0 h-[3px] bg-[#138808] animate-[cartProgress_2s_linear_forwards]" />
          </div>
        </div>
      )}

      <main className="w-full min-w-0 px-0 pt-5 pb-8 sm:pt-7 md:pb-10">
        {/* Outer glass */}
        <section
          className="
            glass-section
            box-border
            !w-[calc(100%_-_16px)]
            !max-w-[470px]
            mx-auto
            px-3 py-4
            min-[360px]:px-4
            sm:px-5 
          "
        >
          <div className="mx-auto w-full min-w-0 max-w-[450px]">
            {/* Heading */}
            <h2
              className="
                mb-4
                text-center
                text-2xl font-black tracking-tight
                text-stone-900
               
                
              "
            >
              Sign In
            </h2>

            {/* Inner glass */}
            <div
              className="
                box-border w-full min-w-0
                rounded-2xl
                border border-white/60
                bg-white/30
                p-3
                shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]
                backdrop-blur-md
                min-[360px]:p-4
                sm:p-5
                md:p-6
              "
            >
              <form onSubmit={handleSubmit} className="w-full min-w-0 space-y-3 sm:space-y-4">
                {/* Mobile Number */}
                <div className="w-full min-w-0">
                  <label
                    htmlFor="mobile"
                    className="mb-2 block text-sm font-extrabold text-stone-900 sm:text-base"
                  >
                    Mobile Number
                  </label>

                  <div
                    className="
                      flex w-full min-w-0 overflow-hidden rounded-xl
                      border border-white/80 bg-white/60
                      transition
                      focus-within:border-[#E85A1C]
                      focus-within:ring-2
                      focus-within:ring-[#E85A1C]/20
                    "
                  >
                    <span
                      className="
                        flex shrink-0 items-center
                        border-r border-stone-200/80
                        px-2.5 text-sm font-extrabold text-stone-700
                        min-[360px]:px-3
                        sm:px-4 sm:text-base
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
                      placeholder="Enter mobile number"
                      value={mobile}
                      onChange={(e) => {
                        setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))
                        setError('')
                      }}
                      maxLength={10}
                      required
                      className="
                        w-full min-w-0 flex-1
                        bg-transparent
                        px-2.5 py-3.5
                     text-sm font-bold text-gray-900
outline-none
placeholder:text-gray-500
min-[360px]:px-3
sm:px-4
                      "
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="w-full min-w-0">
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-extrabold text-stone-900 sm:text-base"
                  >
                    Password
                  </label>

                  <div
                    className="
                      flex w-full min-w-0 items-center overflow-hidden rounded-xl
                      border border-white/80 bg-white/60
                      transition
                      focus-within:border-[#E85A1C]
                      focus-within:ring-2
                      focus-within:ring-[#E85A1C]/20
                    "
                  >
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value)
                        setError('')
                      }}
                      required
                      className="
                        w-full min-w-0 flex-1
                        bg-transparent
                        px-3 py-3.5
                      text-sm font-bold text-gray-900
outline-none
placeholder:text-gray-500
min-[360px]:px-3
sm:px-4
                      "
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      className="
                        shrink-0 px-2.5 py-3.5
                        text-sm font-extrabold text-[#E85A1C]
                        transition hover:text-stone-900
                        min-[360px]:px-3
                        sm:px-4
                      "
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>
                </div>

                {/* Forgot Password */}
                <div>
                  <Link
                    to="/forgot-password"
                    className="
                      text-sm font-bold text-[#E85A1C]
                   
                      transition hover:text-stone-900
                       sm:text-[0.95rem]
                    "
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Register */}
                <div className="break-words text-sm font-bold text-stone-900    sm:text-[0.95rem]">
                  New Customer?{' '}
                  <Link
                    to="/signup"
                    className="
                      font-black text-[#E85A1C]
                      
                      transition hover:text-stone-900
                    "
                  >
                    Register Here
                  </Link>
                </div>

                {/* Error Message */}
                {error && (
                  <p
                    role="alert"
                    className="
                      break-words rounded-lg
                      border border-red-200
                      bg-red-50/90 px-3 py-2.5
                      text-sm font-semibold text-red-700
                    "
                  >
                    {error}
                  </p>
                )}

                {/* Sign In Button */}
                <button
                  type="submit"
                  className="
                    w-full min-w-0 rounded-full
                    bg-[#E85A1C]
                    px-4 py-3.5
                    text-sm font-black uppercase tracking-wide text-white
                    shadow-md transition duration-200
                    hover:bg-stone-900 hover:shadow-lg
                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-[#E85A1C]
                    focus-visible:ring-offset-2
                    sm:px-5 sm:text-base
                  "
                >
                  Sign In
                </button>

                {/* Terms and Policies */}
        <p className="break-words text-xs leading-relaxed text-stone-700">
                  By continuing, you agree to BHIMA Mobility&apos;s{' '}
                  <Link
                    to="/terms"
                    className="font-bold text-[#E85A1C]  hover:text-stone-900"
                  >
                    Terms and Conditions
                  </Link>
                  ,{' '}
                  <Link
                    to="/privacy"
                    className="font-bold text-[#E85A1C]  hover:text-stone-900"
                  >
                    Privacy Policy
                  </Link>{' '}
                  and{' '}
                  <Link
                    to="/refund-policy"
                    className="font-bold text-[#E85A1C]  hover:text-stone-900"
                  >
                    Refund Policy
                  </Link>.
                </p>
              </form>
            </div>

            {/* Back to Home */}
            <div className="mt-4 text-center sm:mt-5">
              <Link
                to="/"
                className="
                  inline-flex max-w-full items-center justify-center gap-2
                  text-sm font-extrabold text-stone-700
                  transition hover:text-[#E85A1C]
                  sm:text-base
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