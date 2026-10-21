
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function ForgotPassword() {
  const [mobile, setMobile] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setMessage('')

    if (!/^[6-9]\d{9}$/.test(mobile)) {
      setError('Please enter a valid 10-digit mobile number.')
      return
    }

    // Connect your password reset API here.
    setError('Password reset API is not connected yet.')
  }

  return (
    <div className="pattern-body-bg min-h-screen w-full min-w-0 overflow-x-clip text-stone-900 antialiased">
      <Navbar transparent fixedOnScroll />

      <main className="w-full min-w-0 px-0 pt-5 pb-8 sm:pt-7 md:pb-10">
        {/* Outer glass */}
        <section
          className="
            glass-section box-border
            !w-[calc(100%_-_16px)]
            !max-w-[470px]
            mx-auto
            px-3 py-4
            min-[360px]:px-4
            sm:px-5 sm:py-5
          "
        >
          <div className="mx-auto w-full min-w-0 max-w-[450px]">
            <h1
              className="
                mb-3 text-center
                text-2xl font-black tracking-tight text-stone-900
                sm:mb-4 
              "
            >
              Forgot Password?
            </h1>

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
              <p className="mb-4 text-sm leading-relaxed text-stone-700 sm:text-[0.95rem]">
                Enter your registered mobile number to reset your password.
              </p>

              <form
                onSubmit={handleSubmit}
                className="w-full min-w-0 space-y-3"
              >
                {/* Mobile Number */}
                <div
                  className="
                    flex h-[42px] w-full min-w-0 overflow-hidden
                    rounded-xl border border-white/80 bg-white/60
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
                    value={mobile}
                    onChange={(e) => {
                      setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))
                      setError('')
                      setMessage('')
                    }}
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

                {/* Success message, when API is connected */}
                {message && (
                  <p
                    role="status"
                    className="
                      break-words rounded-lg border border-green-200
                      bg-green-50/90 px-3 py-2
                      text-sm font-semibold text-green-700
                    "
                  >
                    {message}
                  </p>
                )}

                {/* Reset button */}
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
                  Reset Password
                </button>

                {/* Sign In */}
                <p className="pt-1 text-center text-sm font-bold text-stone-700 sm:text-[0.95rem]">
                  Remember your password?{' '}
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
