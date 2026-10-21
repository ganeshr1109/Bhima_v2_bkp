# BHIMA Mobility — React App

This is the React (Vite) conversion of the original static BHIMA Mobility
HTML site. Same look, same pages, same calculators — now as a proper,
component-based React app with client-side routing.

## Structure

```
bhima-mobility/
├── index.html                 Vite entry HTML
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── public/
│   └── assets/                 All images (logo, vehicle photos, pattern bg)
└── src/
    ├── main.jsx                App bootstrap (Router + mount)
    ├── App.jsx                 Route definitions
    ├── index.css                Tailwind + global/custom styles
    ├── data/
    │   └── vehicles.js         Single source of truth for all vehicle & shop data
    ├── components/
    │   ├── Navbar.jsx           Shared nav w/ vehicles dropdown + mobile menu
    │   ├── Footer.jsx           Full footer (home page)
    │   ├── SimpleFooter.jsx     Slim footer (spec pages)
    │   ├── FuelSavingsCalculator.jsx
    │   └── EMICalculator.jsx
    └── pages/
        ├── Home.jsx              "/"                – hero, fleet, calculators, shop, inquiry
        ├── VehicleSpec.jsx       "/vehicles/:slug"   – C310, PX4, Low Bed Carrier, Tractor Trolley
        ├── Checkout.jsx          "/checkout"         – reads ?vehicle=&price= from the URL
        └── Register.jsx          "/register"         – customer / agent / distributor tabs
```

## Routes (mapped from the original pages)

| Old file                       | New route              |
|---------------------------------|-------------------------|
| `index.html`                    | `/`                     |
| `bhima_c310_specs.html`         | `/vehicles/c310`        |
| `bhima_px4_specs.html`          | `/vehicles/px4`         |
| `low_bed_carrier_specs.html`    | `/vehicles/lowbed`      |
| `tractor_trolley_specs.html`    | `/vehicles/trolley`     |
| `checkout.html?vehicle=&price=` | `/checkout?vehicle=&price=` |
| `register.html`                 | `/register`             |

## Getting started

```bash
npm install
npm run dev       # start local dev server
npm run build      # production build → dist/
```

## What changed vs. the original HTML

- Tailwind is now compiled locally (not the CDN `<script>` build) via
  `tailwindcss` + `postcss`, configured in `tailwind.config.js`.
- All inline `onclick="..."` handlers became React event handlers and
  `useState`/`useMemo` (mobile menu, vehicle dropdown, both calculators,
  add-to-cart, the register page's tab switcher, checkout's query-param
  pricing).
- Every vehicle's copy, pricing, badges and spec tables live in one file,
  `src/data/vehicles.js`, so the nav dropdown, home page fleet cards, spec
  pages, and the EMI calculator's vehicle picker never fall out of sync.
- Internal links (`bhima_c310_specs.html`, `register.html`, etc.) became
  `react-router-dom` `<Link>`s; in-page anchors (`#fleet`, `#calculators`,
  `#shop`, `#inquire`) are unchanged.
- Images were renamed to remove spaces (e.g. `BHIMA Mobility Logo_2.png` →
  `bhima-mobility-logo.png`) and moved into `public/assets/` so Vite serves
  them at a stable `/assets/...` path.
