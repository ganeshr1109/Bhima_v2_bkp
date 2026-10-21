import { MapPin, Phone, Globe, UserRound } from 'lucide-react'

export default function Footer() {
  return (
    <footer
      id="contact"
      className="bg-stone-900 text-white pt-14 pb-8 px-5 sm:px-6 border-t border-stone-800"
    >
   <div className="max-w-[100rem] mx-auto px-5 sm:px-6">

        {/* MAIN FOOTER */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16 pb-10 border-b border-stone-800">

          {/* COMPANY */}
          <div>
            <div className="inline-block bg-white/90 p-3 rounded-2xl mb-5 shadow-md">
              <img
                src={`${import.meta.env.BASE_URL}assets/bhima-mobility-logo.png`}
                alt="BHIMA Mobility Logo"
                className="h-12 sm:h-14 w-auto object-contain"
              />
            </div>

            <p className="text-sm sm:text-base text-stone-300 leading-relaxed font-semibold max-w-md">
              BHIMA Mobility is dedicated to driving sustainable urban & industrial
              logistics across India with robust electric vehicle solutions.
            </p>

            {/* WEBSITE */}
         <div className="flex items-center gap-3 mt-6">
  <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/5 border border-white/10">
    <Globe
      size={17}
      strokeWidth={2}
      className="text-[#FF9933]"
    />
  </div>

  <a
    href="https://bhimamobility.com"
    target="_blank"
    rel="noopener noreferrer"
    className="text-stone-300 hover:text-[#FF9933] transition font-semibold"
  >
    bhimamobility.com
  </a>
</div>
          </div>


          {/* LOCATION & CONTACT */}
          <div>
            <h4 className="text-base sm:text-lg font-black uppercase tracking-wider text-[#FF9933] mb-5">
              Location & Contact
            </h4>

            <div className="text-sm sm:text-base text-stone-300 font-semibold leading-relaxed space-y-5">

              {/* LOCATION */}
<div className="flex items-start gap-3">
  <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
    <MapPin
      size={18}
      strokeWidth={2.2}
      className="text-[#FF9933]"
    />
  </div>

  <span>
    Yalamanchili Manufacturing Private Limited
    <br />
    Plot No. D-18, Butibori Industrial Area
    <br />
    Nagpur, Maharashtra – 441122
  </span>
</div>

              {/* RADHIKA */}
<div className="flex items-start gap-3">
  {/* PERSON ICON */}
  <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
    <UserRound
      size={18}
      strokeWidth={2.2}
      className="text-[#FF9933]"
    />
  </div>

  {/* CONTACT DETAILS */}
  <div className="flex flex-col">
    <p className="text-stone-300 font-semibold text-sm sm:text-base leading-9">
      Radhika Mishra
    </p>

    <a
      href="tel:+918805652696"
      className="hover:text-[#FF9933] transition flex items-center gap-2 text-sm sm:text-base font-semibold leading-6"
    >
      <Phone
        size={16}
        strokeWidth={2.2}
        className="text-[#FF9933] flex-shrink-0"
      />
      <span>+91 9665 821541</span>
    </a>
  </div>
</div>

              {/* SHUBHAM */}
<div className="flex items-start gap-3">
  {/* PERSON ICON */}
  <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
    <UserRound
      size={18}
      strokeWidth={2.2}
      className="text-[#FF9933]"
    />
  </div>

  {/* CONTACT DETAILS */}
  <div className="flex flex-col">
    <p className="text-stone-300 font-semibold text-sm sm:text-base leading-9">
      Shubham Dubey
    </p>

    <a
      href="tel:+919561075785"
      className="hover:text-[#FF9933] transition flex items-center gap-2 text-sm sm:text-base font-semibold leading-6"
    >
      <Phone
        size={16}
        strokeWidth={2.2}
        className="text-[#FF9933] flex-shrink-0"
      />
      <span>+91 95610 75785</span>
    </a>
  </div>
</div>
            </div>
          </div>


          {/* GOOGLE MAP */}
          <div>
           

            <div className="rounded-2xl overflow-hidden border border-stone-700 shadow-lg bg-stone-800">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3775.12485678103!2d78.93504427530935!3d20.928350380696006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd49764ab6b0409%3A0x99fedd5de4318772!2sYalamanchili%20Manufacturing%20Pvt%20Ltd!5e1!3m2!1sen!2sin!4v1736242526893!5m2!1sen!2sin"
                width="100%"
                height="240"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Yalamanchili Manufacturing Pvt Ltd Location"
              />
            </div>

            <p className="text-xs text-stone-400 mt-3 font-medium">
              Yalamanchili Manufacturing Pvt Ltd
            </p>
          </div>

        </div>


        {/* BOTTOM FOOTER */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 pt-5">

          <p className="text-xs sm:text-sm font-bold text-stone-400 text-center">
            © 2026 BHIMA Mobility | Yalamanchili Manufacturing Private Limited
          </p>

        </div>

      </div>
    </footer>
  )
}