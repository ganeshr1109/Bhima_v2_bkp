export default function SimpleFooter() {
  return (
    <footer className="bg-[#1C2833] text-white py-8 px-6 mt-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <p className="text-sm font-black">© 2026 BHIMA Mobility | Yalamanchili Manufacturing Private Limited</p>
        </div>
        <div className="bg-white/10 p-3 rounded-2xl border border-white/10">
          <img src="/assets/yalamanchili-logo.png" alt="Yalamanchili Logo" className="h-8 object-contain" />
        </div>
      </div>
    </footer>
  )
}
