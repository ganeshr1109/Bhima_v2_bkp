import { useMemo, useState } from 'react'
import { vehicleList } from '../data/vehicles'

const LOGISTICS_INSURANCE = 2500
const inr = (n) =>
  '₹ ' + Number(n || 0).toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

export default function EMICalculator() {
const [vehiclePrice, setVehiclePrice] = useState(
  vehicleList[0].price + LOGISTICS_INSURANCE
)
const [downPayment, setDownPayment] = useState('35000')
const [tenure, setTenure] = useState('36')
const [interest, setInterest] = useState('9.75')

  // Clamp down payment so it never meets/exceeds the vehicle price

const price = Number(vehiclePrice) || 0
const minDown = Math.min(10000, Math.max(0, price - 10000))
const maxDown = Math.max(minDown, price - 10000)

const safeDown = Math.min(
  maxDown,
  Math.max(
    minDown,
    downPayment === '' ? minDown : Number(downPayment) || minDown
  )
)



const { loanAmount, monthlyEMI, totalInterest } = useMemo(() => {
  const price = Number(vehiclePrice) || 0
  const principal = Math.max(0, price - safeDown)
  const months = Number(tenure) || 0
  const annualInterest = Number(interest) || 0

  if (principal <= 0 || months <= 0) {
    return {
      loanAmount: principal,
      monthlyEMI: 0,
      totalInterest: 0,
    }
  }

  // Flat interest calculation
  const interestAmount = principal * (annualInterest / 100) * (months / 12)
  const totalRepayment = principal + interestAmount

  return {
    loanAmount: principal,
    monthlyEMI: totalRepayment / months,
    totalInterest: interestAmount,
  }
}, [vehiclePrice, safeDown, tenure, interest])


  return (
<div className="glossy-card text-stone-900 rounded-[2.5rem] p-6 md:p-8 lg:p-6 shadow-xl flex flex-col">
      <div>
      <div className="flex items-center justify-between mb-5 lg:mb-4 pb-3 border-b border-stone-200">
         <h3 className="text-xl lg:text-[1.35rem] font-black text-stone-900 tracking-wide">Finance & EMI Estimator</h3>
          <span className="bg-stone-900 text-white text-xs font-black px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-sm">Loan Helper</span>
        </div>

       <div className="space-y-4 lg:space-y-3">
    <div>
  <label className="text-[0.8rem] font-black text-stone-800 uppercase tracking-wider block mb-2">
    Vehicle Price (₹):
  </label>

  <div className="flex items-center gap-2 bg-white/80 border border-stone-200 px-4 py-3 rounded-2xl shadow-inner">
    <span className="text-[0.8rem] font-black text-stone-500">₹</span>


<div className="flex flex-1 min-w-0 items-center gap-2">
  <input
    type="text"
    inputMode="numeric"
    value={
      vehiclePrice === ''
        ? ''
        : Number(vehiclePrice).toLocaleString('en-IN')
    }
    onChange={(e) => {
      const value = e.target.value.replace(/\D/g, '')
      setVehiclePrice(value === '' ? '' : Number(value))
    }}
    onBlur={() => {
      if (vehiclePrice === '' || !Number.isFinite(Number(vehiclePrice))) {
        setVehiclePrice(vehicleList[0].price + LOGISTICS_INSURANCE)
      } else {
        setVehiclePrice(Math.max(10000, Number(vehiclePrice)))
      }
    }}
    className="w-full min-w-0 bg-transparent text-stone-900 text-base font-black focus:outline-none"
    placeholder="Enter vehicle price"
  />

<div className="ml-auto flex flex-col items-center shrink-0">
    <button
      type="button"
      aria-label="Increase vehicle price"
      onClick={() =>
        setVehiclePrice((Number(vehiclePrice) || 0) + 1000)
      }
      className="p-0 text-[10px] leading-none text-stone-500 hover:text-[#E85A1C]"
    >
      ▲
    </button>
    <button
      type="button"
      aria-label="Decrease vehicle price"
      onClick={() =>
        setVehiclePrice(Math.max(10000, (Number(vehiclePrice) || 0) - 1000))
      }
      className="p-0 text-[10px] leading-none text-stone-500 hover:text-[#E85A1C]"
    >
      ▼
    </button>
  </div>
</div>


  </div>
</div>   

          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="text-[0.8rem] font-black text-stone-800 uppercase tracking-wider">Down Payment (₹)</label>
         
<div className="flex items-center gap-1 bg-white/80 border border-stone-200 px-3 py-1.5 rounded-xl shadow-inner">
  <span className="text-xs font-black text-stone-500">₹</span>

  <input
    type="text"
    inputMode="numeric"
    value={
      downPayment === ''
        ? ''
        : Number(downPayment).toLocaleString('en-IN')
    }
    onChange={(e) => {
      const value = e.target.value.replace(/\D/g, '')
      setDownPayment(value)
    }}
    onBlur={() => {
      const value = Number(downPayment)

      if (downPayment !== '' && Number.isFinite(value)) {
        setDownPayment(
          String(Math.min(maxDown, Math.max(minDown, value)))
        )
      }
    }}
    className="w-24 min-w-0 border-0 bg-transparent p-0 text-stone-900 font-black text-base text-right outline-none focus:outline-none focus:ring-0"
  />

  <div className="flex flex-col shrink-0">
    <button
      type="button"
      aria-label="Increase down payment"
      onClick={() =>
        setDownPayment(String(Math.min(maxDown, safeDown + 5000)))
      }
      className="border-0 bg-transparent p-0 text-[10px] leading-none text-stone-500 hover:text-[#E85A1C]"
    >
      ▲
    </button>

    <button
      type="button"
      aria-label="Decrease down payment"
      onClick={() =>
        setDownPayment(String(Math.max(minDown, safeDown - 5000)))
      }
      className="border-0 bg-transparent p-0 text-[10px] leading-none text-stone-500 hover:text-[#E85A1C]"
    >
      ▼
    </button>
  </div>
</div>

            </div>
           

<input
  type="range"
  min={minDown}
  max={maxDown}
  step="5000"
  value={safeDown}
  onChange={(e) => setDownPayment(e.target.value)}
  className="w-full accent-[#E85A1C] h-2 bg-stone-200 rounded-lg cursor-pointer"
/>


          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-black text-stone-800 uppercase tracking-wider">Tenure (Months)</label>
              </div>
              <div className="flex items-center gap-1 bg-white/80 border border-stone-200 px-3 py-2 rounded-xl shadow-inner">
              <input
  type="number"
  min="12"
  max="60"
  step="6"
  value={tenure}
  onChange={(e) => setTenure(e.target.value)}
  onBlur={() => {
    const value = Number(tenure)

    if (tenure === '' || !Number.isFinite(value)) {
      setTenure('36')
    } else {
      setTenure(String(Math.min(60, Math.max(12, value))))
    }
  }}
  className="w-16 bg-transparent text-stone-900 font-black text-[0.8rem] text-right focus:outline-none"
/>
                <span className="text-xs font-black text-stone-500">Months</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-black text-stone-800 uppercase tracking-wider">Interest Rate (% APR)</label>
              </div>
              <div className="flex items-center gap-1 bg-white/80 border border-stone-200 px-3 py-2 rounded-xl shadow-inner">
              <input
  type="number"
  min="5"
  max="25"
  step="0.25"
  value={interest}
  onChange={(e) => setInterest(e.target.value)}
  onBlur={() => {
    const value = Number(interest)

    if (interest === '' || !Number.isFinite(value)) {
      setInterest('9.75')
    } else {
      setInterest(String(Math.min(25, Math.max(5, value))))
    }
  }}
  className="w-16 bg-transparent text-stone-900 font-black text-[0.8rem] text-right focus:outline-none"
/>
                <span className="text-xs font-black text-stone-500">%</span>
              </div>
            </div>
          </div>
        </div>

<div className="mt-5 lg:mt-4 p-4 bg-white/70 rounded-3xl border border-white space-y-3 shadow-inner">

  {/* Principal Loan Amount */}
  <div className="flex items-center justify-between gap-4 text-[0.8rem] font-bold text-stone-600">
    <span className="flex-1">
      Principal Loan Amount:
    </span>

    <span className="shrink-0 font-black text-stone-900 text-base">
      {inr(loanAmount)}
    </span>
  </div>


  {/* Monthly EMI */}
  <div className="border-t border-stone-200 pt-3 flex items-center justify-between gap-3">
    <span className="flex-1 text-[0.8rem] md:text-base font-black text-stone-900 uppercase tracking-wider leading-snug">
      Estimated Monthly EMI:
    </span>

   <span className="shrink-0 whitespace-nowrap text-[1.1rem] md:text-[1.6rem] md:leading-none font-black text-[#E85A1C] drop-shadow-sm">
      {inr(monthlyEMI)} / Months
    </span>
  </div>

  {/* Total Interest Payable */}
  <div className="border-t border-stone-200 pt-3 flex items-center justify-between gap-4">
    <span className="flex-1 text-[0.8rem] font-bold text-stone-600">
      Total Interest Payable:
    </span>

    <span className="shrink-0 font-black text-stone-900 text-base">
      {inr(totalInterest)}
    </span>
  </div>


</div>
      </div>

      <p className="text-[0.70rem] text-stone-500 font-bold mt-2">*Indicative calculation subject to standard banking approvals and down payment terms.</p>
    </div>
  )
}
