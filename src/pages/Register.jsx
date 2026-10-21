import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Select from 'react-select'
import { STATE_CITY_DATA } from '../components/Cities'
import { Download } from 'lucide-react'
import JSZip from 'jszip'
const TABS = [
  {
    id: 'customer',
    label: 'Enquiry',
    activeClass: 'bg-[#E85A1C] text-white',
  },
  {
    id: 'agent',
    label: 'Become an Agent',
    activeClass: 'bg-white text-[#000080] border border-gray-200',
  },
  {
    id: 'distributor',
    label: 'Become a Dealer',
    activeClass: 'bg-[#138808] text-white',
  },
]

const agentBrochureFiles = import.meta.glob(
  '../assets/pdf/Agent/*.pdf',
  {
    eager: true,
    query: '?url',
    import: 'default'
  }
)
const downloadAgentBrochures = async () => {
  try {
    const files = Object.entries(agentBrochureFiles)

    if (files.length === 0) {
      alert('Brochure not available.')
      return
    }

    const zip = new JSZip()

    for (const [path, fileUrl] of files) {
      const response = await fetch(fileUrl)

      if (!response.ok) {
        throw new Error(`Failed to fetch ${fileUrl}`)
      }

      const blob = await response.blob()
      const fileName = path.split('/').pop()

      zip.file(fileName, blob)
    }

    const zipBlob = await zip.generateAsync({
      type: 'blob'
    })

    const downloadUrl = URL.createObjectURL(zipBlob)

    const link = document.createElement('a')
    link.href = downloadUrl
    link.download = 'BHIMA-Agent-Brochures.zip'

    document.body.appendChild(link)
    link.click()
    link.remove()

    URL.revokeObjectURL(downloadUrl)

  } catch (error) {
    console.error('Brochure download failed:', error)
    alert('Unable to download brochures.')
  }
}
export default function Register() {
  
  const [activeTab, setActiveTab] = useState('customer')

const [registrationMessage, setRegistrationMessage] = useState('')
const [registrationSuccess, setRegistrationSuccess] = useState(false)
const [registrationColor, setRegistrationColor] = useState('#E85A1C')
const handleSubmit = async (e, registrationType) => {
  e.preventDefault()

  const form = e.target
  const formData = new FormData(form)
  const data = Object.fromEntries(formData.entries())

  // -----------------------------
  // PHONE VALIDATION
  // -----------------------------
  const phone = data.phone?.trim() || ''

  const phoneRegex = /^[6-9][0-9]{9}$/

  if (!phoneRegex.test(phone)) {
    alert('Please enter a valid 10-digit mobile number starting with 6, 7, 8, or 9.')
    return
  }

  // -----------------------------
  // EMAIL VALIDATION
  // -----------------------------
  const email = data.email?.trim() || ''

  // If email is optional
  if (email !== '') {
    const emailRegex =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.')
      return
    }
  }

  // -----------------------------
  // AADHAAR VALIDATION
  // -----------------------------
  const aadhaar = data.aadhaarNumber?.trim() || ''

  if (aadhaar !== '' && !/^[0-9]{12}$/.test(aadhaar)) {
    alert('Aadhaar number must contain exactly 12 digits.')
    return
  }

  // -----------------------------
  // PINCODE VALIDATION
  // -----------------------------
  const pincode = data.pincode?.trim() || ''

  if (pincode !== '' && !/^[0-9]{6}$/.test(pincode)) {
    alert('Pincode must contain exactly 6 digits.')
    return
  }



  // -----------------------------
  // BACKEND SUBMIT
  // -----------------------------
 // -----------------------------
// BACKEND SUBMIT
// -----------------------------

try {
const response = await fetch(
  `${import.meta.env.VITE_API_URL}/api/registrations`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        registrationType,
        ...data,
      }),
    }
  )

  const result = await response.json()

  // -----------------------------
  // BACKEND FAILED
  // -----------------------------

  if (!response.ok || !result.success) {
    setRegistrationSuccess(false)
    setRegistrationMessage(
      result.message || 'Registration failed. Please try again.'
    )
    return
  }

  // -----------------------------
  // BACKEND SUCCESS
  // -----------------------------

  const colors = {
    customer: '#E85A1C',
    agent: '#000080',
    distributor: '#138808',
  }

  setRegistrationColor(colors[registrationType])
  setRegistrationSuccess(true)
  setRegistrationMessage('Registration submitted successfully.')

  // Reset form only after successful backend submission
  form.reset()

} catch (error) {
  console.error('Registration API error:', error)

  setRegistrationSuccess(false)
  setRegistrationMessage(
    'Unable to submit registration. Please check the server and try again.'
  )

  return
}
}


 return (
 <div className="text-gray-900 antialiased pattern-body-bg min-h-screen flex flex-col justify-between">
  {registrationMessage && (
  <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4 bg-black/40 backdrop-blur-sm">

    <div className="w-full max-w-md rounded-[28px] bg-white/80 backdrop-blur-2xl border border-white/70 shadow-2xl p-7">

      <div className="flex flex-col items-center text-center">

        {/* ICON */}
   <div
  className="w-16 h-16 rounded-full flex items-center justify-center mb-5 border"
  style={{
    backgroundColor: `${registrationColor}15`,
    borderColor: `${registrationColor}30`,
  }}
>
  <span
    className="text-3xl font-black"
    style={{ color: registrationColor }}
  >
    {registrationSuccess ? '✓' : '!'}
  </span>
</div> 


        {/* TITLE */}
        <h3 className="text-2xl font-black text-gray-900">
          {registrationSuccess
            ? 'Registration Successful'
            : 'Registration Failed'}
        </h3>

        {/* MESSAGE */}
        <p className="mt-3 text-sm font-semibold text-gray-600 leading-relaxed">
          {registrationMessage}
        </p>

        {/* BUTTON */}
        <button
          type="button"
          onClick={() => {
            setRegistrationMessage('')
            setRegistrationSuccess(false)
          }}
     className="w-full mt-6 py-3.5 rounded-xl text-sm font-black uppercase tracking-wider text-white shadow-lg transition"
style={{
  backgroundColor: registrationSuccess
    ? registrationColor
    : '#E85A1C',
}}
        >
          {registrationSuccess ? 'Done' : 'Try Again'}
        </button>

      </div>

    </div>
  </div>
)}

   <Navbar
  transparent={true}
  showRegister={false}
  showBackButton={true}
/>
<main className="max-w-6xl mx-auto px-0 md:px-6 pt-0.5 md:pt-8 pb-4 md:pb-8 w-full flex-1">
<div className="glass-section text-stone-900 rounded-[28px] p-4 md:pt-6 pb-10 px-4 md:px-8 shadow-2xl border border-white/50">

    <div className="text-center mb-3">
      <span className="bg-white/30 backdrop-blur-md border border-white/40 shadow-sm text-[#E85A1C] text-[10px] md:text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider inline-block mb-2">
        Join the Movement
      </span>

      <h1 className="text-2xl md:text-3xl font-black text-gray-900">
        Register with BHIMA Mobility
      </h1>

      <p className="text-gray-600 text-xs md:text-sm font-bold mt-1">
        Please select your registration type below to get started.
      </p>
    </div>

    {/* TABS */}
<div className="grid grid-cols-3 gap-1.5 sm:gap-2 mb-4 bg-white/20 backdrop-blur-md p-1.5 rounded-xl border border-white/40 w-full">
  {TABS.map((tab) => (
    <button
      key={tab.id}
      onClick={() => setActiveTab(tab.id)}
      className={`min-w-0 py-2.5 sm:py-3 px-1 sm:px-3 rounded-lg font-black text-[10px] sm:text-xs md:text-sm transition text-center leading-tight ${
        activeTab === tab.id
          ? `shadow-sm ${tab.activeClass}`
          : 'text-gray-700 hover:text-gray-900'
      }`}
    >
      {tab.label}
    </button>
  ))}
</div>

    {activeTab === 'customer' && (
      <CustomerForm onSubmit={handleSubmit} />
    )}

    {activeTab === 'agent' && (
      <AgentForm onSubmit={handleSubmit} />
    )}

    {activeTab === 'distributor' && (
      <DistributorForm onSubmit={handleSubmit} />
    )}

  </div>
</main>
 <Footer />
      
    </div>
  )
}

const inputClass =
'w-full bg-white/40 backdrop-blur-md border border-white/50 rounded-xl px-3 py-2.5 font-bold text-gray-900 placeholder:text-gray-500 focus:outline-none focus:border-[#E85A1C] focus:bg-white/60 transition'
const searchableSelectStyles = {
control: (base, state) => ({
  ...base,
  width: '100%',
  minHeight: '48px',
  height: '48px',
  background: 'rgba(255, 255, 255, 0.4)',
  backdropFilter: 'blur(12px)',
  border: state.isFocused
    ? '1px solid #E85A1C'
    : '1px solid rgba(255, 255, 255, 0.5)',
  borderRadius: '0.75rem',
  boxShadow: 'none',
  padding: '0 6px',
  fontWeight: 700,
}),

  valueContainer: (base) => ({
    ...base,
    padding: '0 8px',
  }),

  input: (base) => ({
    ...base,
    margin: 0,
    padding: 0,
    color: '#111827',
    fontWeight: 700,
  }),

  singleValue: (base) => ({
    ...base,
    color: '#111827',
    fontWeight: 700,
  }),

  placeholder: (base) => ({
    ...base,
    color: '#6B7280',
    fontWeight: 700,
  }),

  indicatorSeparator: () => ({
    display: 'none',
  }),

  menu: (base) => ({
    ...base,
    borderRadius: '0.75rem',
    overflow: 'hidden',
    zIndex: 100,
  }),

  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused ? '#f3f4f6' : '#fff',
    color: '#111827',
    fontWeight: 600,
    cursor: 'pointer',
  }),
}
const labelClass = 'block text-xs font-black text-gray-700 uppercase tracking-wider mb-2'

function CustomerForm({ onSubmit }) {
const [selectedState, setSelectedState] = useState('')
const [selectedCity, setSelectedCity] = useState('')

  return (
    <form
    className="space-y-3"
      onSubmit={(e) => onSubmit(e, 'customer')}
    >
<h3 className="text-xl font-black text-gray-900 border-b border-white/50 pb-3">
  Customer Enquiry Form
</h3>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 md:gap-x-10">

        <div>
          <label className={labelClass}>Full Name *</label>
          <input
            type="text"
            name="fullName"
            required
           placeholder="Ramesh Kumar"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Phone Number *</label>
         <input
  type="tel"
  name="phone"
  required
  maxLength="10"
  inputMode="numeric"
  pattern="[6-9][0-9]{9}"
  onInput={(e) => {
    e.target.value = e.target.value.replace(/\D/g, '').slice(0, 10)
  }}
  title="Enter a valid 10-digit mobile number starting with 6, 7, 8, or 9"
  placeholder="98765 43210"
  className={inputClass}
/>
        </div>

        <div>
          <label className={labelClass}>Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="ramesh@gmail.com"
            className={inputClass}
          />
        </div>

    <div>
  <label className={labelClass}>Aadhaar Number</label>
<input
  type="text"
  name="aadhaarNumber"
  maxLength="12"
  inputMode="numeric"
  pattern="[0-9]{12}"
  onInput={(e) => {
    e.target.value = e.target.value.replace(/\D/g, '').slice(0, 12)
  }}
  title="Aadhaar number must contain exactly 12 digits"
  placeholder="Enter 12-digit Aadhaar number"
  className={inputClass}
/>
</div>

<div>
  <label className={labelClass}>State</label>

 <Select
  name="state"
  options={Object.keys(STATE_CITY_DATA).map((state) => ({
    value: state,
    label: state,
  }))}
  value={
    selectedState
      ? { value: selectedState, label: selectedState }
      : null
  }
  onChange={(option) => {
    setSelectedState(option?.value || '')
    setSelectedCity('')
  }}
  placeholder="Search or select state"
  isSearchable
styles={searchableSelectStyles}
/>
</div>

<div>
  <label className={labelClass}>City</label>

<Select
  name="city"
  options={
    selectedState
      ? (STATE_CITY_DATA[selectedState] || []).map((city) => ({
          value: city,
          label: city,
        }))
      : []
  }
  value={
    selectedCity
      ? { value: selectedCity, label: selectedCity }
      : null
  }
  onChange={(option) => {
    setSelectedCity(option?.value || '')
  }}
  placeholder={
    selectedState
      ? 'Search or select city'
      : 'Select state first'
  }
  isSearchable
  isClearable
  isDisabled={!selectedState}
  styles={searchableSelectStyles}
/>
</div>
<div>
  <label className={labelClass}>Pincode</label>
  <input
    type="text"
    name="pincode"
  placeholder="441122"
    maxLength="6"
    inputMode="numeric"
    pattern="[0-9]{6}"
   
    className={inputClass}
  />
</div>

        <div >
          <label className={labelClass}>
            Vehicle of Interest
          </label>

          <select
            name="vehicleOfInterest"
          
            className={inputClass}
          >
            <option value="">Select a vehicle...</option>
            <option value="BHIMA C310 Heavy Cargo Loader">
              BHIMA C310 Heavy Cargo Loader (On Road)
            </option>
            <option value="BHIMA PX4 Passenger EV">
              BHIMA PX4 Passenger EV (On Road)
            </option>
            <option value="Low Bed Carrier">
              Low Bed Carrier (Off Road Indoor)
            </option>
            <option value="Tractor Trolley">
              Tractor Trolley (Off Road Indoor)
            </option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className={labelClass}>
            Requirement / Message
          </label>

          <textarea
            name="requirementMessage"
            rows="3"
            placeholder="Tell us about your fleet requirements..."
            className={inputClass}
          />
        </div>

      </div>

      <button
        type="submit"
       className="w-full bg-[#E85A1C] hover:bg-[#d94f16] text-white font-black py-4 rounded-xl shadow-lg transition uppercase tracking-wider"
      >
        Submit Customer Enquiry
      </button>
    </form>
  )
}


function AgentForm({ onSubmit }) {
 const [selectedState, setSelectedState] = useState('')
const [selectedCity, setSelectedCity] = useState('')

  return (
    <form
      className="space-y-3"
      onSubmit={(e) => onSubmit(e, 'agent')}
    >
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-white/50 pb-3">

  <h3 className="text-lg sm:text-xl font-black text-gray-900">
    Agent Registration Form
  </h3>

  <button
    type="button"
    onClick={downloadAgentBrochures}
  className="
  flex
  items-center
  gap-1.5
  text-xs
  sm:text-sm
  font-bold
  text-[#E85A1C]
  hover:text-[#d94f16]
  transition
  self-start
  sm:self-auto
  whitespace-nowrap
  md:-translate-x-20
"
  >
    <Download
      size={15}
      className="sm:w-[17px] sm:h-[17px]"
    />
    Download Document
  </button>

</div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 md:gap-x-10">

        <div>
          <label className={labelClass}>Full Name *</label>
          <input
            type="text"
            name="fullName"
            required
           placeholder="Ramesh Kumar"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Phone Number *</label>
       <input
  type="tel"
  name="phone"
  required
  maxLength="10"
  inputMode="numeric"
  pattern="[6-9][0-9]{9}"
  onInput={(e) => {
    e.target.value = e.target.value.replace(/\D/g, '').slice(0, 10)
  }}
  title="Enter a valid 10-digit mobile number starting with 6, 7, 8, or 9"
  placeholder="98765 43210"
  className={inputClass}
/>
        </div>

        <div>
          <label className={labelClass}>Email Addres</label>
          <input
            type="email"
            name="email"
           
             placeholder="ramesh@gmail.com"
            className={inputClass}
          />
        </div>
<div>
  <label className={labelClass}>Aadhaar Number</label>
  <input
  type="text"
  name="aadhaarNumber"
  maxLength="12"
  inputMode="numeric"
  pattern="[0-9]{12}"
  onInput={(e) => {
    e.target.value = e.target.value.replace(/\D/g, '').slice(0, 12)
  }}
  title="Aadhaar number must contain exactly 12 digits"
  placeholder="Enter 12-digit Aadhaar number"
  className={inputClass}
/>
</div>

<div>
  <label className={labelClass}>State</label>
<Select
  name="state"
  options={Object.keys(STATE_CITY_DATA).map((state) => ({
    value: state,
    label: state,
  }))}
  value={
    selectedState
      ? { value: selectedState, label: selectedState }
      : null
  }
  onChange={(option) => {
    setSelectedState(option?.value || '')
    setSelectedCity('')
  }}
  placeholder="Select State"
  isSearchable
  isClearable
  styles={searchableSelectStyles}
/>
</div>

<div>
  <label className={labelClass}>City</label>

<Select
  name="city"
  options={
    selectedState
      ? (STATE_CITY_DATA[selectedState] || []).map((city) => ({
          value: city,
          label: city,
        }))
      : []
  }
  value={
    selectedCity
      ? { value: selectedCity, label: selectedCity }
      : null
  }
  onChange={(option) => {
    setSelectedCity(option?.value || '')
  }}
  placeholder={
    selectedState
      ? 'Select City'
      : 'Select State First'
  }
  isSearchable
  isClearable
  isDisabled={!selectedState}
  styles={searchableSelectStyles}
/>
</div>

<div>
  <label className={labelClass}>Pincode</label>
  <input
    type="text"
    name="pincode"

    maxLength="6"
    inputMode="numeric"
    pattern="[0-9]{6}"
   placeholder="441122"
    className={inputClass}
  />
</div>
        <div>
          <label className={labelClass}>
            Preferred Operating Region / District
          </label>
          <input
            type="text"
            name="preferredRegion"
       
            placeholder="e.g. Vidarbha Region"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>
            Current Occupation / Business
          </label>
          <input
            type="text"
            name="currentOccupation"
            placeholder="e.g. Automobile Broker / Consultant"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>
            Prior EV / Commercial Sales Experience?
          </label>

          <select
            name="evSalesExperience"
            className={inputClass}
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

      </div>

<div className="space-y-3">

 

  <button
    type="submit"
    className="w-full bg-white text-[#000080] border border-[#000080]/30 hover:bg-white hover:text-[#000080] font-black py-4 rounded-xl shadow-lg transition uppercase tracking-wider"
  >
    Apply as Sales Agent
  </button>

</div>
    </form>
  )
}
function DistributorForm({ onSubmit }) {
  const [selectedState, setSelectedState] = useState('')
const [selectedCity, setSelectedCity] = useState('')

  return (
    <form
    className="space-y-3"
      onSubmit={(e) => onSubmit(e, 'distributor')}
    >
      <h3 className="text-xl font-black text-gray-900 border-b border-white/50 pb-3">
        Dealer Partnership Application
      </h3>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 md:gap-x-10">

        <div>
          <label className={labelClass}>
            Company / Dealership Name
          </label>
          <input
            type="text"
            name="companyName"
           
           
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>
            Contact Person Name *
          </label>
          <input
            type="text"
            name="contactPerson"
            required
           
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>
            Phone Number *
          </label>
     <input
  type="tel"
  name="phone"
  required
  maxLength="10"
  inputMode="numeric"
  pattern="[6-9][0-9]{9}"
  onInput={(e) => {
    e.target.value = e.target.value.replace(/\D/g, '').slice(0, 10)
  }}
  title="Enter a valid 10-digit mobile number starting with 6, 7, 8, or 9"
  placeholder="98765 43210"
  className={inputClass}
/>
        </div>
<div>
  <label className={labelClass}>Aadhaar Number</label>
<input
  type="text"
  name="aadhaarNumber"
  maxLength="12"
  inputMode="numeric"
  pattern="[0-9]{12}"
  onInput={(e) => {
    e.target.value = e.target.value.replace(/\D/g, '').slice(0, 12)
  }}
  title="Aadhaar number must contain exactly 12 digits"
  placeholder="Enter 12-digit Aadhaar number"
  className={inputClass}
/>
</div>

<div>
  <label className={labelClass}>State</label>

<Select
  name="state"
  options={Object.keys(STATE_CITY_DATA).map((state) => ({
    value: state,
    label: state,
  }))}
  value={
    selectedState
      ? { value: selectedState, label: selectedState }
      : null
  }
  onChange={(option) => {
    setSelectedState(option?.value || '')
    setSelectedCity('')
  }}
  placeholder="Search or select state"
  isSearchable
  isClearable
 styles={searchableSelectStyles}
/>
</div>

<div>
  <label className={labelClass}>City</label>

<Select
  name="city"
  options={
    selectedState
      ? (STATE_CITY_DATA[selectedState] || []).map((city) => ({
          value: city,
          label: city,
        }))
      : []
  }
  value={
    selectedCity
      ? { value: selectedCity, label: selectedCity }
      : null
  }
  onChange={(option) => {
    setSelectedCity(option?.value || '')
  }}
  placeholder={
    selectedState
      ? 'Search or select city'
      : 'Select state first'
  }
  isSearchable
  isClearable
  isDisabled={!selectedState}
 styles={searchableSelectStyles}
/>
</div>

<div>
  <label className={labelClass}>Pincode</label>
  <input
    type="text"
    name="pincode"
    maxLength="6"
    inputMode="numeric"
    pattern="[0-9]{6}"
   placeholder="441122"
    className={inputClass}
  />
</div>
        <div>
          <label className={labelClass}>
            GSTIN Number
          </label>
          <input
            type="text"
            name="gstin"
           
          
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>
            Proposed Distribution Territory / State
          </label>
          <input
            type="text"
            name="distributionTerritory"
        
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>
            Showroom / Workshop Capacity (Sq. Ft.)
          </label>
          <input
            type="number"
            name="showroomCapacity"
        
            className={inputClass}
          />
        </div>

      </div>

      <button
        type="submit"
className="w-full bg-[#138808] hover:bg-[#0f7006] text-white font-black py-4 rounded-xl shadow-lg transition uppercase tracking-wider"
      >
        Submit Dealership Application
      </button>
    </form>
  )
}
