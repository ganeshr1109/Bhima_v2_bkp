import { useMemo, useState } from 'react'

const inr = (n) => '₹ ' + Math.round(n).toLocaleString('en-IN', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

export default function FuelSavingsCalculator() {
  const [dailyKm, setDailyKm] = useState(60)
  const [fuelPrice, setFuelPrice] = useState(95)

  const { dieselCost, evCost, annualSavings } = useMemo(() => {
    const monthlyDiesel = Math.round((dailyKm / 30) * fuelPrice * 30)
    const monthlyEV = Math.round(dailyKm * 0.5 * 30)
    const annual = Math.max(0, (monthlyDiesel - monthlyEV) * 12)
    return { dieselCost: monthlyDiesel, evCost: monthlyEV, annualSavings: annual }
  }, [dailyKm, fuelPrice])

  return (
<div className="glossy-card text-stone-900 rounded-[2.5rem] p-6 md:p-8 lg:p-6 shadow-xl flex flex-col">
      <div>
      <div className="flex items-center justify-between mb-5 lg:mb-4 pb-3 border-b border-stone-200">
       <h3 className="text-xl lg:text-[1.35rem] font-black text-stone-900 tracking-wide">Fuel Savings Calculator</h3>
          <span className="bg-[#E85A1C] text-white text-xs font-black px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-sm">EV vs Diesel</span>
        </div>

      <div className="space-y-5 lg:space-y-4">
          <div>
            <div className="flex justify-between items-center mb-3">
             <label className="text-[0.8rem] font-black text-stone-800 uppercase tracking-wider leading-snug">
  {/* Mobile */}
  <span className="md:hidden">
    Daily Distance
    <br />
    (KM)
  </span>

  {/* Desktop */}
  <span className="hidden md:inline">
    Daily Distance (KM)
  </span>
</label>
              <div className="flex items-center gap-1 bg-white/80 border border-stone-200 px-3 py-1.5 rounded-xl shadow-inner">
                <input
                  type="number"
                  min="10"
                  max="500"
                  value={dailyKm}
                  onChange={(e) => setDailyKm(Number(e.target.value) || 0)}
                  className="w-16 bg-transparent text-stone-900 font-black text-base text-right focus:outline-none"
                />
                <span className="text-xs font-black text-stone-500">KM</span>
              </div>
            </div>
            <input
              type="range"
              min="10"
              max="500"
              step="5"
              value={dailyKm}
              onChange={(e) => setDailyKm(Number(e.target.value))}
              className="w-full accent-[#E85A1C] h-2 bg-stone-200 rounded-lg cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-3">
             <label className="text-[0.8rem] font-black text-stone-800 uppercase tracking-wider leading-snug">
  {/* Mobile */}
  <span className="md:hidden">
    Current Diesel Price
    <br />
    (₹ / Litre)
  </span>

  {/* Desktop */}
  <span className="hidden md:inline">
    Current Diesel Price (₹ / Litre)
  </span>
</label>
              <div className="flex items-center gap-1 bg-white/80 border border-stone-200 px-3 py-1.5 rounded-xl shadow-inner">
                <span className="text-xs font-black text-stone-500">₹</span>
                <input
                  type="number"
                  min="60"
                  max="150"
                  value={fuelPrice}
                  onChange={(e) => setFuelPrice(Number(e.target.value) || 0)}
                  className="w-16 bg-transparent text-stone-900 font-black text-base text-right focus:outline-none"
                />
              </div>
            </div>
            <input
              type="range"
              min="60"
              max="150"
              step="1"
              value={fuelPrice}
              onChange={(e) => setFuelPrice(Number(e.target.value))}
              className="w-full accent-[#E85A1C] h-2 bg-stone-200 rounded-lg cursor-pointer"
            />
          </div>
        </div>

<div className="mt-6 lg:mt-5 p-4 bg-white/70 rounded-3xl border border-white space-y-3 shadow-inner">

  {/* Monthly Diesel Cost */}
  <div className="flex items-start md:items-center justify-between gap-3 text-[0.8rem] font-bold text-stone-600">
    <span className="flex-1 min-w-0 leading-snug">
      <span className="md:hidden">
        Monthly Fuel Cost
        <br />
        (Diesel Loader):
      </span>

      <span className="hidden md:inline">
        Monthly Fuel Cost (Diesel Loader):
      </span>
    </span>

    <span className="shrink-0 whitespace-nowrap font-black text-stone-900 text-base">
      {inr(dieselCost)}
    </span>
  </div>

  {/* Monthly EV Cost */}
  <div className="flex items-center justify-between gap-3 text-[0.8rem] font-bold text-stone-600">
    <span className="flex-1 min-w-0 leading-snug">
      Monthly EV Electricity Cost:
    </span>

    <span className="shrink-0 whitespace-nowrap font-black text-[#E85A1C] text-base">
      {inr(evCost)}
    </span>
  </div>

  {/* Annual Savings */}
 <div className="border-t border-stone-200 pt-3 flex items-center justify-between gap-3">

    <span className="flex-1 min-w-0 text-[0.8rem] md:text-base font-black text-stone-900 uppercase tracking-wider leading-snug">
      Estimated Annual Savings:
    </span>

  <span className="shrink-0 whitespace-nowrap text-[1.7rem] md:text-[1.6rem] md:leading-none font-black text-[#E85A1C] drop-shadow-sm">
      {inr(annualSavings)}
    </span>

  </div>

</div>
      </div>

      <p className="text-[0.70rem] text-stone-500 font-bold mt-2">*Calculated based on standard industrial electricity tariffs vs 30km/L average fuel mileage.</p>
    </div>
  )
}
