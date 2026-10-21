import { useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { vehicles } from '../data/vehicles'
import Footer from '../components/Footer'
import JSZip from 'jszip'
import { ArrowLeft, ChevronDown, Download } from 'lucide-react'


const brochureFiles = import.meta.glob(
  '../assets/pdf/*/*.pdf',
  {
    eager: true,
    query: '?url',
    import: 'default'
  }
)
const downloadBrochures = async (vehicle) => {
  try {
    const folderMap = {
      px4: 'bhima_px4',
      c310: 'bhima_c310',
      lowbed:'BHIMA_Low_Bed',
      trolley: 'BHIMA_Tractor_Trolley',
      // use your existing vehicle slugs here
    }

    const folder = folderMap[vehicle.slug]

    if (!folder) {
      alert('Brochure not available.')
      return
    }

    const files = Object.entries(brochureFiles).filter(([path]) =>
      path.includes(`/pdf/${folder}/`)
    )

    if (files.length === 0) {
      alert('Brochure not available.')
      return
    }

    const zip = new JSZip()

    for (const [path, fileUrl] of files) {
      const response = await fetch(fileUrl)

      if (!response.ok) {
        console.error(`Unable to load: ${path}`)
        continue
      }

      const blob = await response.blob()

      // Automatically gets the real filename
      const fileName = path.split('/').pop()

      zip.file(fileName, blob)
    }

    const zipBlob = await zip.generateAsync({
      type: 'blob'
    })

    const downloadUrl = URL.createObjectURL(zipBlob)

    const link = document.createElement('a')
    link.href = downloadUrl
 link.download = `${vehicle.name}-brochures.zip`

    document.body.appendChild(link)
    link.click()
    link.remove()

    URL.revokeObjectURL(downloadUrl)

  } catch (error) {
    console.error('Brochure download failed:', error)
    alert('Unable to download brochures.')
  }
}
export default function VehicleSpec() {
  const { slug } = useParams()
  const vehicle = vehicles[slug]
const scrollToTechnicalSpecifications = () => {
  const section = document.getElementById('technical-specifications')

  if (section) {
  const navbarOffset =
  window.innerWidth < 768 ? 5.42 * 16 : 7.8 * 16

    const top =
      section.getBoundingClientRect().top +
      window.pageYOffset -
      navbarOffset

    window.scrollTo({
      top,
      behavior: 'smooth',
    })
  }
}
  if (!vehicle) return <Navigate to="/" replace />

  // The C310 page uses the "highlights + two spec groups" layout from the
  // original design; every other vehicle uses the "quick stats + spec table"
  // layout. Both are supported here from the same data-driven component.
if (!vehicle) return <Navigate to="/" replace />

return vehicle.highlights?.length > 0
  ?<C310Layout
  vehicle={vehicle}
  scrollToTechnicalSpecifications={scrollToTechnicalSpecifications}
/>
  : <StandardLayout
  vehicle={vehicle}
  scrollToTechnicalSpecifications={scrollToTechnicalSpecifications}
/>
}
function VehicleImageGallery({ vehicle, className = '' }) {
  const images = vehicle.images?.length
    ? vehicle.images
    : [vehicle.image]

  const [selectedImage, setSelectedImage] = useState(0)

  const nextImage = () => {
    setSelectedImage((current) =>
      current === images.length - 1 ? 0 : current + 1
    )
  }

  const prevImage = () => {
    setSelectedImage((current) =>
      current === 0 ? images.length - 1 : current - 1
    )
  }

  return (
<div className={`w-full min-w-0 ${className}`}>
      <div
        className="
          relative
         
        "
      >

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">

         
       {/* DESKTOP / TABLET THUMBNAILS */}
       
{/* DESKTOP / TABLET THUMBNAILS */}
{images.length > 1 && (
<div className="hidden sm:flex w-[70px] md:w-[78px] flex-shrink-0 flex-col items-center justify-center">

    {/* UP ARROW */}
    <button
      type="button"
      onClick={() => {
        setSelectedImage((current) =>
          current === 0 ? images.length - 1 : current - 1
        )
      }}
      aria-label="Previous image"
    className="
  w-8 h-8
  mb-2
  rounded-full
  bg-white/90
  backdrop-blur-sm
  border border-white/60
  shadow-sm
  flex items-center justify-center
  text-gray-800
  text-lg
  font-black
  hover:bg-white
  hover:scale-105
  transition
  flex-shrink-0
"
    >
      ↑
    </button>

    {/* 4 THUMBNAILS ONLY */}
    <div className="flex flex-col gap-3 overflow-hidden">
      {images
        .slice(
          Math.max(
            0,
            Math.min(selectedImage - 1, images.length - 4)
          ),
          Math.max(
            0,
            Math.min(selectedImage - 1, images.length - 4)
          ) + 4
        )
        .map((image, visibleIndex) => {
          const startIndex = Math.max(
            0,
            Math.min(selectedImage - 1, images.length - 4)
          )

          const actualIndex = startIndex + visibleIndex

          return (
            <button
              key={`${image}-${actualIndex}`}
              type="button"
              onClick={() => setSelectedImage(actualIndex)}
              className={`
                relative
                w-[64px]
                h-[64px]
                md:w-[72px]
                md:h-[68px]
                rounded-xl
                overflow-hidden
                flex
                items-center
                justify-center
                transition-all
                duration-200
                flex-shrink-0
             ${
  selectedImage === actualIndex
    ? `
    bg-white/30
      backdrop-blur-md
      shadow-xl
      border-2
      border-[#E85A1C]
    `
    : `
     bg-white/30
      backdrop-blur-md
      shadow-xl
      border
      border-white/60
      hover:bg-white/30
    `
}
              `}
            >
              <img
                src={image}
                alt={`${vehicle.name} ${actualIndex + 1}`}
                className="w-full h-full object-contain p-1.5"
              />

              {selectedImage === actualIndex && (
                <span
                  className="
                    absolute
                    left-0
                    top-1/2
                    -translate-y-1/2
                    w-1
                    h-6
                    bg-[#E85A1C]
                    rounded-r-full
                  "
                />
              )}
            </button>
          )
        })}
    </div>

    {/* DOWN ARROW */}
    <button
      type="button"
      onClick={() => {
        setSelectedImage((current) =>
          current === images.length - 1 ? 0 : current + 1
        )
      }}
      aria-label="Next image"
     className="
  w-8 h-8
  mt-2
  rounded-full
  bg-white/90
  backdrop-blur-sm
  border border-white/60
  shadow-sm
  flex items-center justify-center
  text-gray-800
  text-lg
  font-black
  hover:bg-white
  hover:scale-105
  transition
  flex-shrink-0
"
    >
      ↓
    </button>

  </div>
)}

          {/* MAIN IMAGE */}
          <div className="flex-1 min-w-0">

            <div
          
  className="
    relative
    w-full
    h-[300px]
    xs:h-[320px]
    sm:h-[350px]
    md:h-[440px]
    lg:h-[500px]
    rounded-2xl
    md:rounded-[26px]
    bg-white/30
    backdrop-blur-md
    border
    border-white/40
    shadow-sm
    overflow-hidden
    flex
    items-center
    justify-center
  "
>

              <img
                src={images[selectedImage]}
                alt={vehicle.name}
               className="
  w-full
  h-full
  object-contain
  p-1
  sm:p-2
  md:p-3
  transition-opacity
  duration-300
"
              />

        

             

            </div>

            {/* MOBILE THUMBNAILS */}
         {images.length > 1 && (
  <div
    className="
      flex
      sm:hidden
      w-full
      gap-2
      mt-3
      px-1
      overflow-x-auto
      pb-1
      scrollbar-hide
      justify-start
    "
  >
    {images.map((image, index) => (
      <button
        key={`${image}-mobile-${index}`}
        type="button"
        onClick={() => setSelectedImage(index)}
        className={`
          flex-shrink-0
          w-[62px]
          h-[52px]
          rounded-lg
          overflow-hidden
          bg-white/30
          backdrop-blur-md
          flex
          items-center
          justify-center
          transition-all
          duration-200
          ${
            selectedImage === index
              ? 'border-2 border-[#E85A1C] shadow-md scale-[1.02]'
              : 'border border-white/40 shadow-sm'
          }
        `}
      >
        <img
          src={image}
          alt={`${vehicle.name} ${index + 1}`}
          className="w-full h-full object-contain p-1"
        />
      </button>
    ))}
  </div>
)}

          </div>
        </div>
      </div>
    </div>
  )
}
function C310Layout({ vehicle, scrollToTechnicalSpecifications }) {

  return (
<div className="pattern-body-bg min-h-screen flex flex-col">
    <Navbar
  transparent
  showRegister={false}
  showBackButton
/>
<main className="flex-1 w-full pt-0.5 pb-8 md:pt-8">

<div className="
  truck-art-border
  vehicle-glass
w-[calc(100%-12px)] md:w-[95%]
  max-w-[1350px]
  mx-auto
  rounded-[25px]
  px-4
  md:px-8
  py-8
  grid
  grid-cols-1
  lg:grid-cols-12
  gap-8
  items-center
  mb-12
  overflow-hidden
">
   <VehicleImageGallery
  vehicle={vehicle}
  className="lg:col-span-6"
/>

          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="bg-[#E85A1C] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">{vehicle.tag}</span>
                <span className="bg-green-100 text-[#0D6832] text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider border border-green-200">{vehicle.certified}</span>
              </div>
<h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-1 md:mt-2">
  {vehicle.name}
</h1>
             <p className="hindi-text text-lg sm:text-xl font-extrabold text-[#E85A1C] mt-1">{vehicle.hindiTagline}</p>

            <p className="
  text-gray-700
  text-sm
  sm:text-base
  font-bold
  mt-4
  leading-relaxed
">
  {vehicle.description}
</p>
            </div>
            
<div className="bg-white/30 backdrop-blur-md p-4 sm:p-6 rounded-3xl border border-white/40 space-y-4 relative">
<a
  href="#"
  onClick={(e) => {
    e.preventDefault()
    downloadBrochures(vehicle)
  }}
className="
  absolute
  top-3
  right-3
  sm:top-5
  sm:right-5
  flex
  items-center
  gap-1.5
  sm:gap-2
  text-[#E85A1C]
  hover:text-stone-900
  font-black
  text-[10px]
  sm:text-xs
  transition
  cursor-pointer
  whitespace-nowrap
"
>
  <Download size={18} strokeWidth={2.5} />
  <span>Download Brochure</span>
</a>
              <div className="flex items-baseline justify-between border-b border-gray-200 pb-3">
                <div>
                  <span className="text-xs font-black uppercase text-gray-500">Ex-Showroom Price</span>
                  <div className="text-3xl font-black text-[#E85A1C]">
                    {vehicle.priceDisplay} <span className="text-xs font-bold text-gray-500">*Inclusive of GST</span>
                  </div>
                </div>
              
              </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                <Link
               to={`/checkout?vehicle=${encodeURIComponent(vehicle.name)}`}
                  className="bg-[#E85A1C] hover:bg-orange-700 text-white text-center font-black py-3.5 px-6 rounded-xl shadow-lg text-sm transition tracking-wider uppercase block"
                >
                  Order Now
                </Link>
<button
  type="button"
  onClick={scrollToTechnicalSpecifications}
  className="bg-stone-900 hover:bg-black text-white text-center font-black py-3.5 px-6 rounded-xl shadow-lg text-sm transition tracking-wider uppercase block"
>
  Learn More
</button>

              </div>
            </div>
          </div>
        </div>

        {/* HIGHLIGHTS GRID */}
{vehicle.highlights?.length > 0 && (
<section
  id="technical-specifications"
  className="
    vehicle-glass
w-[calc(100%-12px)] md:w-[95%]
    max-w-[1350px]
    mx-auto
    rounded-[25px]
    px-4
    md:px-8
    py-8
    mb-12
    overflow-hidden
  "
>
 <div className="w-full text-center mb-6">
  <div className="w-full">
        <span className="inline-block bg-[#0D6832]/10 text-[#0D6832] text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider">
          Key Performance Highlights
        </span>

        <h2 className="md:text-3xl font-black text-gray-900 mt-2">
          Built for Performance & Profitability
        </h2>
      </div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
      {vehicle.highlights?.map((h) => (
<div
  key={h.label}
className="
  bg-white/30
  backdrop-blur-md
  rounded-xl
  px-4
  py-4
  border border-white/40
  flex items-center
  gap-3
  shadow-sm
"
>
  <div
    className="
      relative
      w-[52px]
      h-[52px]
      rounded-full
     bg-[#E85A1C]
      flex items-center
      justify-center
      shrink-0
    "
  >
  <div
  className="
    absolute inset-0
    rounded-full
    bg-[#E85A1C]
    opacity-40
  "
/>

    <img
      src={h.icon}
      alt={h.label}
      className="relative z-10 w-[30px] h-[30px] object-contain"
    />
  </div>

  <div className="min-w-0">
    <div className="text-xl sm:text-2xl font-black text-[#E85A1C] leading-tight">
      {h.value}
    </div>
<div className="text-[11px] sm:text-[12px] font-black uppercase text-gray-700 leading-tight mt-1">
      {h.label}
    </div>
  </div>
</div>
      ))}
    </div>
  </section>
)}

        {/* SPEC GROUPS */}
   {/* TECHNICAL SPECIFICATIONS */}
<section className="
  mt-12
  vehicle-glass
 w-[calc(100%-12px)] md:w-[95%]
  max-w-[1350px]
  mx-auto
  rounded-[25px]
  px-4
  md:px-8
  py-8
  mb-12
  overflow-hidden
">

  {/* TITLE */}
  <div className="text-center mb-5">
    <h2 className="text-2xl md:text-3xl font-black text-black">
      Technical Specifications
    </h2>

    <p className="text-gray-600 font-bold text-sm md:text-[0.85rem] mt-2">
      Detailed specifications and performance information of the vehicle.
    </p>
  </div>

  {/* INNER GLASS */}
  <div className="bg-white/30 backdrop-blur-md rounded-[25px] border border-white/40 p-4 shadow-sm">

    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse text-sm md:text-base">
        <tbody>
         {vehicle.specTable.map(([label, value]) => (
  <tr
    key={label}
    className="border-b border-gray-300 last:border-b-0"
  >
              <td className="py-3.5 px-4 font-bold text-black w-1/3">
                {label}
              </td>

              <td className="py-3.5 px-4 font-medium text-black">
                {value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  </div>

</section>
      </main>

    <Footer />
    </div>
  )
}

function StandardLayout({ vehicle, scrollToTechnicalSpecifications }) {
  const accent = vehicle.category === 'On Road' && vehicle.tag === 'Passenger Auto' ? '0D6832' : vehicle.tag === 'Agri Utility' ? '2563eb' : 'E85A1C'

  return (
<div className="pattern-body-bg min-h-screen flex flex-col">
      {/* Simplified nav matching the original standalone spec pages */}
   <Navbar
  transparent
  showRegister={false}
  showBackButton
/>

<main className="flex-1 max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-6 md:py-10">

  <div className="flex justify-end mb-4">
    <button
      type="button"
      onClick={() => downloadBrochures(vehicle)}
      className="inline-flex items-center justify-center gap-2 bg-stone-900 text-white px-5 py-3 rounded-xl font-bold text-sm hover:bg-[#E85A1C] transition-colors"
    >
      <Download size={18} />
      Download Brochure
    </button>
  </div>

  <div className="truck-art-border vehicle-glass rounded-[25px] overflow-hidden p-6 md:p-10 mb-10">
    <button
  type="button"
  onClick={() => downloadBrochures(vehicle)}
  className="mt-4 w-full inline-flex items-center justify-center gap-2 bg-stone-900 hover:bg-[#E85A1C] text-white font-black py-3.5 px-6 rounded-xl shadow-lg text-sm transition tracking-wider uppercase"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 3v12" />
    <path d="m7 10 5 5 5-5" />
    <path d="M5 21h14" />
  </svg>

  Download Brochure
</button>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
    <VehicleImageGallery vehicle={vehicle} />

            <div>
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-white text-xs font-bold px-3 py-1 rounded uppercase" style={{ backgroundColor: `#${accent}` }}>{vehicle.tag}</span>
                <span className="bg-gray-100 text-gray-800 text-xs font-bold px-3 py-1 rounded uppercase">{vehicle.certified}</span>
              </div>
              <h1 className="text-4xl font-extrabold text-gray-900 mt-2">{vehicle.name}</h1>
              <p className="hindi-text text-lg font-bold text-[#E85A1C] mt-1">{vehicle.hindiTagline}</p>

              <p className="text-gray-600 mt-4 text-sm md:text-base leading-relaxed">{vehicle.description}</p>

          <div className="bg-white/30 backdrop-blur-md p-6 rounded-3xl border border-white/40 space-y-4 mt-6">

  <div className="flex items-baseline justify-between border-b border-gray-200 pb-3">
    <div>
      <span className="text-xs font-black uppercase text-gray-500">
        Ex-Showroom Price
      </span>

      <div className="text-3xl font-black text-[#E85A1C]">
        {vehicle.priceDisplay}

        <span className="text-xs font-bold text-gray-500 ml-1">
          *Inclusive of GST
        </span>
      </div>
    </div>
  </div>

 <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

  <Link
to={`/checkout?vehicle=${encodeURIComponent(vehicle.name)}`}
    className="bg-[#E85A1C] hover:bg-orange-700 text-white text-center font-black py-3.5 px-6 rounded-xl shadow-lg text-sm transition tracking-wider uppercase block"
  >
    Order Now
  </Link>

  <button
    type="button"
    onClick={scrollToTechnicalSpecifications}
    className="bg-stone-900 hover:bg-black text-white text-center font-black py-3.5 px-6 rounded-xl shadow-lg text-sm transition tracking-wider uppercase block"
  >
    Learn More
  </button>

  <button
    type="button"
    onClick={() => downloadBrochures(vehicle)}
    className="bg-white/80 hover:bg-white text-stone-900 text-center font-black py-3.5 px-6 rounded-xl shadow-lg text-sm transition tracking-wider uppercase flex items-center justify-center gap-2"
  >
    <Download size={17} />
    Brochure
  </button>

</div>

</div>

          
            </div>
          </div>
        </div>
<section
  id="technical-specifications"
  className="glass-section !w-full p-6 md:p-8 mb-10"
>

  {/* TITLE */}
  <div className="text-center mb-5">
 <h2 className="text-2xl md:text-3xl font-black text-black">
  Technical Specifications
</h2>

    <p className="text-gray-600 font-bold text-sm md:text-[0.85rem] mt-2">
      Detailed specifications and performance information of the vehicle.
    </p>
  </div>

  {/* INNER GLASS */}
  <div className="bg-white/30 backdrop-blur-md rounded-[25px] border border-white/40 p-4 shadow-sm">

    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse text-sm md:text-base">
        <tbody>
          {vehicle.specTable.map(([label, value], i) => (
            <tr
              key={label}
              className="border-b border-gray-300 last:border-b-0"
              style={
                i % 2 === 0
                  ? { backgroundColor: `#${accent}0d` }
                  : {}
              }
            >
              <td className="py-3.5 px-4 font-bold text-black w-1/3">
                {label}
              </td>

              <td className="py-3.5 px-4 font-medium text-black">
                {value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  </div>

</section>
  </main>

<Footer />
</div>
  )
}
