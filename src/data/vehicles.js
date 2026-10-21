// Central data source for every vehicle used across the nav dropdown,
// fleet cards, spec pages, EMI calculator and checkout page.

export const vehicles = {
  c310: {
    slug: 'c310',
    name: 'BHIMA C310',
    emiName: 'BHIMA C310 Cargo Loader',
    category: 'On Road',
    tag: 'Cargo Loader',
    tagColor: 'bg-[#E85A1C]',

images: [
  `${import.meta.env.BASE_URL}assets/bhima-c310.webp`,
  `${import.meta.env.BASE_URL}assets/rare.webp`,
   `${import.meta.env.BASE_URL}assets/water.webp`,
  `${import.meta.env.BASE_URL}assets/pipes.webp`,
   `${import.meta.env.BASE_URL}assets/bricks.webp`,
   
  
 
],

    price: 190000,
    priceDisplay: '₹1,90,000',

    tagline: 'Urban & Regional High-Payload Delivery',
    hindiTagline: 'मेरी गाड़ी, मेरा देश, मेरा गर्व',

    description:
      'Engineered specifically for heavy commercial cargo delivery. Features a robust mild steel ladder-frame chassis, high payload capacity, and scratch-proof clear coat paint to handle demanding commercial workloads.',

    badges: ['⚡ 310 KG Payload', '🔋 100+ KM'],
    certified: 'ICAT & CMVR Certified',

    highlights: [
      {
        icon: `${import.meta.env.BASE_URL}assets/img/icon/Load Capacity.svg`,
        value: '310 KG',
        label: 'Permitted Load Capacity',
      },
      {
        icon: `${import.meta.env.BASE_URL}assets/img/icon/Cargo-01.svg`,
        value: '100+ KM',
        label: 'Single Charge Range',
      },
      {
        icon: `${import.meta.env.BASE_URL}assets/img/icon/Speed.svg`,
        value: '24 KMPH',
        label: 'Permitted Top Speed',
      },
      {
        icon: `${import.meta.env.BASE_URL}assets/img/icon/Ground Clerance.svg`,
        value: '175 MM',
        label: 'Ground Clearance',
      },
      {
        icon: `${import.meta.env.BASE_URL}assets/img/icon/MetallicFrontPanel.png`,
        value: 'DRIVER SAFETY',
        label: 'Metallic Front Panel',
      },
      {
        icon: `${import.meta.env.BASE_URL}assets/img/icon/certifiedv2-icon.svg`,
        value: 'CMVR COMPLIANT',
        label: 'ICAT Certified',
      },
    ],

    specTable: [
      ['WHEEL BASE', '2100 mm'],
      ['MOTOR', '1250 Watt Rated Power | 1950 Watt Peak Power | BLDC Motor | 1:0 Gear Ratio | ICAT Certified'],
      ['BRAKE TYPE', 'Drum Brakes | Front & Rear | ICAT Certified'],
      ['BRAKE HANDLING', 'Mechanical Brake | Front & Rear | Hand Brake for Parking'],
      ['BATTERY', 'Lead Acid Battery | 48 V Architecture (4 nos, battery x 12 V) | 145 Ah Capacity | ICAT Certified'],
      ['CHARGING TIME', '7-8 Hours'],
      ['CHARGER', '18 Amp Onboard Charger | 5 Amp Charging Plug | ICAT Certified'],
      ['CHASSIS', 'Mild Steel | Ladder Frame | 1.6 mm thick Rectangular Hollow Section | ISI Certified'],
      ['TROLLEY', 'Mild Steel | 1.6 mm thick Rectangular Hollow Section | 2 mm thick Checkered Plate | ISI Certified'],
      ['PAINT FINISH', 'Automotive Grade Primer and Paint with Scratch proof Clear Coat'],
      ['TYRE TYPE', "3.75'' -12'' 66B 4PR Tyres | Front & Rear Wheels Rims | BIS Certified"],
    ],
  },

  px4: {
    slug: 'px4',
    name: 'BHIMA PX4',
    emiName: 'BHIMA PX4 Passenger Auto',
    category: 'On Road',
    tag: 'Passenger Auto',
    tagColor: 'bg-stone-900',

    image: `${import.meta.env.BASE_URL}assets/px4-image.webp`,

    price: 210000,
    priceDisplay: '₹2,10,000',

    tagline: 'City & Suburban Passenger Commute',
    hindiTagline: 'मेरी गाड़ी, मेरा देश, मेरा गर्व',

    description:
      'Built for comfortable passenger transit. Equipped with 2-inch foam cushioned seating, weather-proof canopy protection, coil spring suspension, digital instrument dashboard, and high safety standards.',

    badges: ['👥 4 Seater', '🔋 110+ KM'],
    certified: 'ICAT & CMVR Certified',

 highlights: [
  {
    icon: `${import.meta.env.BASE_URL}assets/img/icon/Passenger.svg`,
    value: 'PASSENGER',
    label: 'Electric Vehicle',
  },
  {
    icon: `${import.meta.env.BASE_URL}assets/img/icon/Ground Clerance.svg`,
    value: '188 MM',
    label: 'Ground Clearance',
  },
  {
    icon: `${import.meta.env.BASE_URL}assets/img/icon/Passenger4.svg`,
    value: '4 PASSENGERS',
    label: 'Permitted Load Capacity',
  },
  {
    icon: `${import.meta.env.BASE_URL}assets/img/icon/Charge.svg`,
    value: '100+ KM',
    label: 'Single Charge Range',
  },
  {
    icon: `${import.meta.env.BASE_URL}assets/img/icon/Speed.svg`,
    value: '24 KMPH',
    label: 'Permitted Top Speed',
  },
  {
    icon: `${import.meta.env.BASE_URL}assets/img/icon/MetallicFrontPanel.png`,
    value: 'USER SAFETY',
    label: 'Metallic Front Panel',
  },
],
    specTable: [
      ['Seating Capacity', '4 Passengers (2-in-1 Dual Foam Cushioned Seats)'],
      ['Wheel Base', '2100 mm'],
      ['Motor Specification', '1250 Watt Rated Power | 1950 Watt Peak Power | BLDC Motor | 1:10 Gear Ratio | ICAT Certified'],
      ['Brakes & Safety', 'Front & Rear Drum Brakes | Mechanical Brake Control | Parking Hand Brake | ICAT Certified'],
      ['Battery Architecture', 'Lead Acid Battery | 48 V Architecture (4 x 12 V) | 145 Ah Capacity | ICAT Certified'],
      ['Charging System', '18 Amp Onboard Charger | 5 Amp Charging Plug | 7-8 Hours Full Charge Time'],
      ['Chassis Frame', 'Mild Steel Ladder Frame | 1.6 mm Rectangular Hollow Section | ISI Certified'],
      ['Body & Canopy', 'Mild Steel 25 mm Round Pipe Construction | All-Weather Rain Protection Hood | Metallic Front Panel'],
      ['Passenger Comfort Features', 'Coil Spring Shock Absorbers, Safety Handholds, Ample Luggage Boot Space, Lockable Under-seat Storage'],
      ['Tyres & Wheels', '3.75"-12" 66B 4PR Tyres | Heavy Duty Rims | BIS Certified'],
    ],
  },

  lowbed: {
    slug: 'lowbed',
    name: 'Low Bed Carrier',
    emiName: 'Low Bed Industrial Carrier',
    category: 'Off Road',
    tag: 'Industrial Carrier',
    tagColor: 'bg-[#E85A1C]',

    image: `${import.meta.env.BASE_URL}assets/LowBedCarrier.webp`,

    price: 165000,
    priceDisplay: '₹1,65,000',

    tagline: 'Warehouse & Factory Material Movement',
    hindiTagline: 'मेरी गाड़ी, मेरा देश, मेरा गर्व',

    description:
      'Reliable electric utility vehicle designed to carry heavy industrial loads across factory floors, warehouses, and gated campuses. Features a spacious 6ft x 4ft flat trolley with access doors on all 3 sides and a heavy-duty motor.',

    badges: ['🏭 500 KG Deck', '🔋 80+ KM'],
    certified: 'Non-RTO Indoor Use',

 highlights: [
  {
    icon: `${import.meta.env.BASE_URL}assets/img/icon/certifiedv2-icon.svg`,
    value: 'CARGO EV',
    label: 'Rugged Electric Vehicle',
  },
  {
    icon: `${import.meta.env.BASE_URL}assets/img/icon/Load Capacity.svg`,
    value: '500 KG PAYLOAD',
    label: 'Payload',
  },
  {
    icon: `${import.meta.env.BASE_URL}assets/img/icon/Charge.svg`,
    value: '100+ KM RANGE',
    label: 'SINGLE CHARGE',
  },
  {
    icon: `${import.meta.env.BASE_URL}assets/img/icon/Ground Clerance.svg`,
    value: '175 MM',
    label: 'Ground Clearance',
  },
  {
    icon: `${import.meta.env.BASE_URL}assets/img/icon/Speed.svg`,
    value: '33 KMPH',
    label: 'Top Speed',
  },
  {
    icon: `${import.meta.env.BASE_URL}assets/img/icon/digitalmeter.svg`,
    value: 'DIGITAL DISPLAY',
    label: 'DASHBOARD',
  },
],

    specTable: [
      ['Payload Capacity', '500 KG Industrial Load Capacity'],
      ['Motor Specification', '1500 Watt PMSM High Torque Motor tailored for heavy internal logistics'],
      ['Platform Dimensions', '6ft x 4ft Flat Bed Trolley with openable drop-down doors on all 3 sides'],
      ['Battery & Range', 'High-capacity Deep Cycle Battery Architecture | 100+ KM per charge'],
      ['Chassis & Frame', 'Heavy-gauge Industrial Mild Steel Rectangular Hollow Section Frame'],
      ['Application Use Cases', 'Warehousing, Manufacturing Plants, Factory Floor Assembly Line Transfers, Campus Logistics'],
    ],
  },

  trolley: {
    slug: 'trolley',
    name: 'Tractor Trolley',
    emiName: 'Tractor Trolley Utility',
    category: 'Off Road',
    tag: 'Agri Utility',
    tagColor: 'bg-stone-900',

    image: `${import.meta.env.BASE_URL}assets/bhimared.webp`,

    price: 180000,
    priceDisplay: '₹1,80,000',

    tagline: 'Agricultural Haulage & High Torque Utility',
    hindiTagline: 'मेरी गाड़ी, मेरा देश, मेरा गर्व',

    description:
      'Rugged electric towing tractor trolley engineered specifically for farm utility, hauling agricultural produce, feed, fertilizer bags, and heavy rural loads with high torque output.',

    badges: ['🚜 750 KG Towing', '🔋 90+ KM'],
    certified: 'Heavy Towing Rig',

    highlights: [
  {
    icon: `${import.meta.env.BASE_URL}assets/img/icon/certifiedv2-icon.svg`,
    value: 'CARGO EV',
    label: 'Rugged Electric Vehicle',
  },
  {
    icon: `${import.meta.env.BASE_URL}assets/img/icon/Load Capacity.svg`,
    value: '500 KG PAYLOAD',
    label: 'Payload',
  },
  {
    icon: `${import.meta.env.BASE_URL}assets/img/icon/Charge.svg`,
    value: '100+ KM RANGE',
    label: 'SINGLE CHARGE',
  },
  {
    icon: `${import.meta.env.BASE_URL}assets/img/icon/Ground Clerance.svg`,
    value: '175 MM',
    label: 'Ground Clearance',
  },
  {
    icon: `${import.meta.env.BASE_URL}assets/img/icon/Speed.svg`,
    value: '33 KMPH',
    label: 'Top Speed',
  },
  {
    icon: `${import.meta.env.BASE_URL}assets/img/icon/digitalmeter.svg`,
    value: 'DIGITAL DISPLAY',
    label: 'DASHBOARD',
  },
],

    specTable: [
      ['Vehicle Classification', 'Agricultural Electric Hauler & Tractor Trolley'],
      ['Motor Specification', 'High-Reduction Heavy Duty Electric Powertrain for Maximum Pulling Power'],
      ['Chassis Build', 'Reinforced Agricultural Grade Structural Steel Chassis'],
      ['Suspension & Axle', 'Heavy-duty leaf spring rear suspension designed for uneven rural terrains'],
      ['Braking Mechanism', 'Mechanical Drum Brakes with Emergency Parking Lock'],
      ['Recommended Use Cases', 'Farm Produce Transport, Fertilizer & Seed Distribution, Rural Village Logistics'],
    ],
  },
}

export const vehicleList = Object.values(vehicles)

export const shopProducts = [

  {
    id: 'charger',
    name: '48V 18A Lead Acid Battery Charger',
    category: 'Accessories',
    description: 'Eastman E-Rikshaw Mitra LA1848',
    price: 4900,
    images: `${import.meta.env.BASE_URL}assets/shop/charger.webp`,
  },

  {
    id: 'polo',
    name: 'BHIMA Fleet T-Shirt',
    category: 'Merchandise',
    description: 'Durable cotton-blend T-shirt designed for BHIMA fleet operators.',
    price: 550,
    images: `${import.meta.env.BASE_URL}assets/shop/bhima-t-shirt.webp`,
  },

  {
    id: 'headlight',
    name: 'Filament Head Lamp (with Bulb)',
    category: 'Spare Parts',
    description: 'Rajulex JBI-104',
    price: 450,
    images: `${import.meta.env.BASE_URL}assets/shop/headlight.webp`,
  },

{
  id: 'keychain',
  name: 'BHIMA Keychain',
  category: 'Merchandise',
  description: 'Official BHIMA branded keychain.',
  price: 99,

  images: [
    `${import.meta.env.BASE_URL}assets/shop/keychain.webp`,
    `${import.meta.env.BASE_URL}assets/shop/kechain2.webp`,
  
     
  ],
},

  

  {
    id: 'horn',
    name: 'Horn 12V DC',
    category: 'Spare Parts',
    description: 'Rajulex JBI-116',
    price: 110,
    images: `${import.meta.env.BASE_URL}assets/shop/Horn.webp`,
  },

  {
    id: 'motor',
    name: '48V 1.2kW BLDC Motor',
    category: 'Spare Parts',
    description: 'CLN - CLN-L3-1200W48V',
    price: 7180,
    images: `${import.meta.env.BASE_URL}assets/shop/motor.webp`,
  },

  {
    id: 'controller',
    name: '48V 60A Controller',
    category: 'Spare Parts',
    description: 'CLN',
    price: 3740,
    images: `${import.meta.env.BASE_URL}assets/shop/controller.webp`,
  },
{
  id: 'battery-li-ion',
  name: '51.2V 105Ah Li-ion Battery',
  category: 'Accessories',
  description: 'Eastman',
  price: 60500,
  images: `${import.meta.env.BASE_URL}assets/shop/Battery(li-ion).webp`,
},
  {
    id: 'battery-lead-acid',
    name: '12V 145Ah Lead Acid Battery',
    category: 'Accessories',
    description: 'Eastman - EM14515ER',
    price: 11730,
    images: `${import.meta.env.BASE_URL}assets/shop/battery(lead-acid).webp`,
  },

  {
    id: 'number-plate-light',
    name: 'LED Number Plate Light',
    category: 'Spare Parts',
    description: 'Rajulex JBI-113',
    price: 110,
    images: `${import.meta.env.BASE_URL}assets/shop/number_plate_light.webp`,
  },

  {
    id: 'mirror',
    name: 'Round Mirror (RVM) Large',
    category: 'Spare Parts',
    description: 'Rajulex JBI-117',
    price: 120,
    images: `${import.meta.env.BASE_URL}assets/shop/mirror.webp`,
  },


  {
    id: 'speedometer',
    name: 'Digital Speedometer',
    category: 'Spare Parts',
    description: 'Prakant Electronics - M2600000',
    price: 1300,
    images: `${import.meta.env.BASE_URL}assets/shop/speedometer.webp`,
  },

  {
    id: '4pin-relay',
    name: '4 Pin Relay',
    category: 'Spare Parts',
    description: 'Nanya',
    price: 80,
    images: `${import.meta.env.BASE_URL}assets/shop/4pin_relay.webp`,
  },

  {
    id: 'flasher',
    name: 'Normal Flasher',
    category: 'Spare Parts',
    description: 'Prakant Electronics - A 01',
    price: 90,
    images: `${import.meta.env.BASE_URL}assets/shop/flasher.webp`,
  },

  {
    id: 'dc-to-dc-converter',
    name: '20A DC to DC Converter',
    category: 'Spare Parts',
    description: 'Triple9',
    price: 660,
    images: `${import.meta.env.BASE_URL}assets/shop/dc_to_dc_converter.webp`,
  },

  {
    id: 'throttle',
    name: 'Single Switch Throttle',
    category: 'Spare Parts',
    description: 'Triple9',
    price: 250,
    images: `${import.meta.env.BASE_URL}assets/shop/throttle.webp`,
  },

  {
    id: 'switches',
    name: 'Left Right Switch Set',
    category: 'Spare Parts',
    description: 'Triple9 - LR02',
    price: 700,
    images: `${import.meta.env.BASE_URL}assets/shop/switches.webp`,
  },

  {
    id: 'wheel-rim',
    name: 'Wheel Rim 3.2 KG 2.15 X 12"',
    category: 'Spare Parts',
    description: 'Luthra - WR1201B',
    price: 760,
    images: `${import.meta.env.BASE_URL}assets/shop/wheelRim.webp`,
  },

  {
    id: 'tyre',
    name: 'Tyre 3.75 x 12"',
    category: 'Spare Parts',
    description: 'CEAT',
    price: 1280,
    images: `${import.meta.env.BASE_URL}assets/shop/tyre.webp`,
  },

]