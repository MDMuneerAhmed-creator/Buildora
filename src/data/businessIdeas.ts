import { BusinessIdea } from '../types';

export const SAMPLE_BUSINESS_IDEAS: BusinessIdea[] = [
  {
    id: 'eco-bamboo-toothbrush',
    slug: 'eco-bamboo-toothbrush',
    title: 'Eco-Friendly Bamboo Toothbrush Manufacturing',
    tagline: 'Sustainable oral care products capitalizing on the global plastic-free consumer movement.',
    category: 'Manufacturing',
    complexity: 'Medium',
    shortDescription: 'Automated manufacturing line producing biodegradable bamboo toothbrushes with charcoal-infused plant-based bristles.',
    
    initialCapitalUSD: 38000,
    monthlyOpExUSD: 9200,
    estimatedMonthlyRevenueUSD: 18500,
    breakEvenMonth: 5,
    roiPercentage12M: 42,
    profitMarginPercent: 38,

    targetAudience: [
      'Eco-conscious millennials & Gen-Z consumers',
      'B2B Eco-Hotels & Boutique Resorts',
      'Zero-waste retail stores & e-commerce marketplaces',
      'Dental clinics promoting sustainable personal hygiene'
    ],
    uniqueValueProp: '100% compostable Moso bamboo handle with ergonomic dual-tone laser engraving and plant-wax antimicrobial coating.',
    industryTrends: [
      'EU & global bans on single-use oral care plastic products',
      'Annual 14.2% CAGR growth in organic personal care market',
      'High repeat purchase rate (recommended replacement every 3 months)'
    ],

    tamSize: '$3.8 Billion (Global Oral Care Eco Market)',
    samSize: '$420 Million (North American & European Direct-to-Consumer)',
    somSize: '$3.5 Million (Target Year 2 regional production output)',
    cagrGrowthRate: '12.8%',
    demandTrendData: [
      { year: '2022', index: 54 },
      { year: '2023', index: 68 },
      { year: '2024', index: 82 },
      { year: '2025', index: 95 },
      { year: '2026', index: 115 }
    ],
    competitors: [
      {
        name: 'Bambuu Brush Co.',
        marketShare: '18%',
        strengths: 'Strong brand loyalty, European distribution agreements.',
        weaknesses: 'High pricing ($6/unit), long shipping lead times.',
        pricePoint: 'Premium'
      },
      {
        name: 'EcoDent Essentials',
        marketShare: '12%',
        strengths: 'Wide retail supermarket distribution.',
        weaknesses: 'Plastic packaging sleeves, basic handle ergonomics.',
        pricePoint: 'Budget'
      },
      {
        name: 'ZenSmile Goods',
        marketShare: '8%',
        strengths: 'Custom subscription delivery service.',
        weaknesses: 'Limited product variance and color customization.',
        pricePoint: 'Mid-tier'
      }
    ],

    machines: [
      {
        id: 'm1',
        name: 'Automatic Bamboo Handle Shaping Machine',
        purpose: 'Cuts, shapes, and planes raw Moso bamboo sticks into ergonomic toothbrush handles.',
        estimatedCostUSD: 12500,
        specifications: '3KW power, capacity 1,200 pcs/hour, precision tolerance +/- 0.1mm.',
        essentialLevel: 'Mandatory'
      },
      {
        id: 'm2',
        name: 'High-Speed CNC Bristle Tufting Machine',
        purpose: 'Drills micro-holes and inserts nylon-6 / caster-oil bristles into handles.',
        estimatedCostUSD: 14800,
        specifications: 'Single head, dual colors, 600 tufts per minute, PLC touch screen control.',
        essentialLevel: 'Mandatory'
      },
      {
        id: 'm3',
        name: 'Fiber End-Rounding & Polishing Unit',
        purpose: 'Rounds bristle ends to ensure gentle dental enamel safety standards.',
        estimatedCostUSD: 4200,
        specifications: 'Rotary high-frequency buffer, output 800 pcs/hour.',
        essentialLevel: 'Mandatory'
      },
      {
        id: 'm4',
        name: 'Laser Logo Engraving & Heat Stamping Machine',
        purpose: 'Customizes handles with brand logo, batch codes, and custom artwork.',
        estimatedCostUSD: 3200,
        specifications: '50W Fiber Laser, galvo scanner speed up to 7000mm/s.',
        essentialLevel: 'Optional'
      }
    ],

    rawMaterials: [
      {
        id: 'rm1',
        name: 'Moso Bamboo Seasoned Slats',
        unit: 'Kilogram',
        unitCostUSD: 1.8,
        monthlyQuantityNeeded: 1200,
        supplierLocation: 'Fujian / Sichuan Bamboo Cooperative'
      },
      {
        id: 'rm2',
        name: 'Castor Oil Bio-Bristle Filaments',
        unit: 'Spool (5kg)',
        unitCostUSD: 45,
        monthlyQuantityNeeded: 35,
        supplierLocation: 'Specialty Bio-Polymer Producer'
      },
      {
        id: 'rm3',
        name: 'Food-Grade Candelilla Beeswax Coating',
        unit: 'Liter',
        unitCostUSD: 12,
        monthlyQuantityNeeded: 60,
        supplierLocation: 'Organic Botanical Oils Co.'
      }
    ],

    suppliers: [
      {
        id: 'sup1',
        companyName: 'GreenSource Bamboo Materials Corp.',
        location: 'Anji County, Bamboo Forestry Zone',
        rating: 4.8,
        moq: '500 kg',
        leadTimeDays: 12,
        contactEmailMock: 'sales@greensource-bamboo.mock',
        certified: true
      },
      {
        id: 'sup2',
        companyName: 'BioPolymer Tech Filaments',
        location: 'Industrial Park Zone B',
        rating: 4.6,
        moq: '10 spools',
        leadTimeDays: 8,
        contactEmailMock: 'contact@biopolymer-tech.mock',
        certified: true
      }
    ],

    packagingDetails: {
      materialType: '100% Recycled Kraft Paper Box with soy-ink printing',
      costPerUnitUSD: 0.12,
      sustainabilityGrade: 'A+',
      notes: 'FSC-Certified kraft cardstock, plastic-free seal tape, zero glue fumes.'
    },

    licenses: [
      {
        title: 'Factory & Small Scale Industry Registration (MSME)',
        issuingAuthority: 'Department of Micro & Small Enterprise',
        estimatedCostUSD: 150,
        timelineDays: 7,
        description: 'Enables government subsidies, concessional electricity rates, and priority bank loans.',
        mandatory: true
      },
      {
        title: 'FDA / Health Authority Personal Care Clearance',
        issuingAuthority: 'Food and Drug Administration / Health Ministry',
        estimatedCostUSD: 850,
        timelineDays: 30,
        description: 'Mandatory approval verifying bristle safety, non-toxicity, and oral contact compliance.',
        mandatory: true
      },
      {
        title: 'State Pollution Control Board NOC (White Category)',
        issuingAuthority: 'Environmental Protection Agency',
        estimatedCostUSD: 300,
        timelineDays: 14,
        description: 'Eco-friendly wood/bamboo processing falls under white non-polluting industrial status.',
        mandatory: true
      },
      {
        title: 'Import Export Code (IEC) Registration',
        issuingAuthority: 'Directorate General of Foreign Trade',
        estimatedCostUSD: 100,
        timelineDays: 3,
        description: 'Required if exporting bamboo toothbrushes to North American/European B2B clients.',
        mandatory: false
      }
    ],

    gstTaxRate: '12% GST (HSN Code 96032100 - Toothbrushes)',
    trademarkClass: 'Trademark Class 21 (Household utensils, brushes & oral cleaning apparatus)',

    primaryChannels: [
      'Direct-to-Consumer (Shopify E-Commerce Site + Amazon Brand Registry)',
      'B2B Wholesale Supply to Eco-Hotels, Resorts, and Airbnb Hosts',
      'Custom Corporate Gifting & Event Giveaways',
      'Dental Clinic White-Label Retail Counter Displays'
    ],
    launchTactics: [
      'Free Sample Bundles for Top 50 Eco-Influencers on Instagram/TikTok',
      '"Buy One, Plant One Tree" Partnership with Reforestation NGOs',
      'Targeted Facebook/Google Ads for keywords: "plastic free toothbrush", "biodegradable oral care"',
      'Zero-Waste Subscription Club ($12 / year for quarterly 4-pack delivery)'
    ],
    suggestedTaglines: [
      'Smile Bright. Tread Light.',
      'Nourish Your Smile, Protect Our Planet.',
      '100% Earth-First Oral Care.'
    ],
    cacUSD: 4.5,
    ltvUSD: 24.0,

    launchTimelineMonths: 6,
    launchTasks: [
      { id: 't1', title: 'Register Business & Obtain Industry MSME Registration', phase: 'Phase 1: Planning', week: 1, category: 'Legal', completed: true },
      { id: 't2', title: 'Finalize Factory Lease & Electrical Load Allocation (3-Phase)', phase: 'Phase 1: Planning', week: 2, category: 'Operations', completed: true },
      { id: 't3', title: 'Procure Bamboo Shaping & CNC Tufting Machinery', phase: 'Phase 2: Setup & Procurement', week: 4, category: 'Operations', completed: false },
      { id: 't4', title: 'Order First Batch Raw Materials & Kraft Packaging Boxes', phase: 'Phase 2: Setup & Procurement', week: 6, category: 'Operations', completed: false },
      { id: 't5', title: 'FDA / Health Clearance Laboratory Sample Testing', phase: 'Phase 3: Testing & Licensing', week: 10, category: 'Legal', completed: false },
      { id: 't6', title: 'Trial Production Run & Quality Control Audit (500 units)', phase: 'Phase 3: Testing & Licensing', week: 12, category: 'Operations', completed: false },
      { id: 't7', title: 'Launch E-commerce Website & Amazon Brand Store', phase: 'Phase 4: Launch & Scale', week: 16, category: 'Marketing', completed: false },
      { id: 't8', title: 'Initiate Hotel B2B Outreach Campaign to 100 Regional Hotels', phase: 'Phase 4: Launch & Scale', week: 20, category: 'Marketing', completed: false }
    ],

    risks: [
      {
        category: 'Supply Chain',
        title: 'Bamboo Seasoning Moisture Fluctuation',
        severity: 'Medium',
        description: 'Improperly seasoned bamboo can warp or develop surface mold in humid storage conditions.',
        mitigationStrategy: 'Invest in a digital moisture kiln meter; maintain raw wood storage below 10% relative humidity.'
      },
      {
        category: 'Market & Revenue',
        title: 'Price War from Cheap Synthetic Plastic Alternatives',
        severity: 'Low',
        description: 'Plastic toothbrushes retail at $1 vs $3.50 for bamboo.',
        mitigationStrategy: 'Focus messaging on health benefits (BPA-free), eco-certifications, and superior design aesthetics.'
      },
      {
        category: 'Operational',
        title: 'Bristle Shedding Complaints',
        severity: 'High',
        description: 'Poor tufting machine pressure calibration causes bristles to detach during brushing.',
        mitigationStrategy: 'Mandate automated 5kg pull-tension tests for every 100th unit on the assembly line.'
      }
    ],

    growthMilestones: [
      { phase: 'Phase 1 (Months 1-6)', timeline: 'Months 1 to 6', objective: 'Achieve 15,000 monthly units production and break-even revenue.' },
      { phase: 'Phase 2 (Year 2)', timeline: 'Months 7 to 18', objective: 'Expand product portfolio to Bamboo Tongue Cleaners and Dental Floss Pickers.' },
      { phase: 'Phase 3 (Year 3+)', timeline: 'Months 19+', objective: 'Automate packaging robotics line and export white-label products to EU & US distributors.' }
    ],

    monthlyFinancialProjections: [
      { month: 'M1', revenueUSD: 1200, expensesUSD: 9800, netProfitUSD: -8600 },
      { month: 'M2', revenueUSD: 3800, expensesUSD: 9200, netProfitUSD: -5400 },
      { month: 'M3', revenueUSD: 7200, expensesUSD: 9100, netProfitUSD: -1900 },
      { month: 'M4', revenueUSD: 11000, expensesUSD: 9200, netProfitUSD: 1800 },
      { month: 'M5', revenueUSD: 15400, expensesUSD: 9300, netProfitUSD: 6100 },
      { month: 'M6', revenueUSD: 18500, expensesUSD: 9200, netProfitUSD: 9300 },
      { month: 'M7', revenueUSD: 21000, expensesUSD: 9500, netProfitUSD: 11500 },
      { month: 'M8', revenueUSD: 24000, expensesUSD: 9800, netProfitUSD: 14200 },
      { month: 'M9', revenueUSD: 26500, expensesUSD: 10100, netProfitUSD: 16400 },
      { month: 'M10', revenueUSD: 29000, expensesUSD: 10400, netProfitUSD: 18600 },
      { month: 'M11', revenueUSD: 32000, expensesUSD: 10800, netProfitUSD: 21200 },
      { month: 'M12', revenueUSD: 36000, expensesUSD: 11200, netProfitUSD: 24800 }
    ]
  },
  {
    id: 'cold-pressed-juice-unit',
    slug: 'cold-pressed-juice-unit',
    title: 'Cold-Pressed Organic Juice & Functional Elixir Lab',
    tagline: 'Hydraulic cold-press extraction of raw, nutrient-dense organic juices with zero added sugar.',
    category: 'FMCG & Consumer Products',
    complexity: 'Medium',
    shortDescription: 'Commercial raw juice production facility utilizing hydraulic press technology and HPP shelf-life enhancement.',
    
    initialCapitalUSD: 45000,
    monthlyOpExUSD: 11500,
    estimatedMonthlyRevenueUSD: 24000,
    breakEvenMonth: 4,
    roiPercentage12M: 52,
    profitMarginPercent: 44,

    targetAudience: [
      'Health-conscious urban professionals & fitness enthusiasts',
      'Local gym chains, yoga studios, and wellness centers',
      'Corporate offices seeking healthy pantry subscriptions',
      'Supermarket gourmet refrigerated aisles'
    ],
    uniqueValueProp: 'Zero-heat hydraulic cold-press process preserving 3x more vitamins and enzymes than standard centrifugal juicers.',
    industryTrends: [
      'Booming demand for functional immunity shots (Ginger/Turmeric)',
      'Shift away from high-fructose pasteurized boxed juices',
      'High average basket size ($7 - $9 per bottle retail)'
    ],

    tamSize: '$8.2 Billion (Global Functional Beverage Market)',
    samSize: '$680 Million (Urban Specialty Juices)',
    somSize: '$4.2 Million (Regional 5-City Distribution)',
    cagrGrowthRate: '9.4%',
    demandTrendData: [
      { year: '2022', index: 60 },
      { year: '2023', index: 72 },
      { year: '2024', index: 88 },
      { year: '2025', index: 104 },
      { year: '2026', index: 128 }
    ],
    competitors: [
      {
        name: 'Pressery Organic',
        marketShare: '22%',
        strengths: 'National supermarket shelf presence.',
        weaknesses: 'Pasteurization degrades fresh taste profile.',
        pricePoint: 'Mid-tier'
      },
      {
        name: 'Suja Juice Co.',
        marketShare: '29%',
        strengths: 'Massive scale and venture capital backing.',
        weaknesses: 'High retail markup ($9.50/bottle).',
        pricePoint: 'Premium'
      }
    ],

    machines: [
      {
        id: 'jm1',
        name: 'Commercial Hydraulic Cold Press Juicer',
        purpose: 'Applies 12 tons of hydraulic pressure to extract maximum yield without frictional heat.',
        estimatedCostUSD: 18500,
        specifications: '30 gal/hour capacity, stainless steel 316 food-grade contact parts.',
        essentialLevel: 'Mandatory'
      },
      {
        id: 'jm2',
        name: 'Fruit & Vegetable Shredder / Washer Station',
        purpose: 'Ozone-bubble cleaning and high-speed shredding of produce before pressing.',
        estimatedCostUSD: 6800,
        specifications: 'Triple stage wash tank with micro-bubble agitation and automatic elevator conveyor.',
        essentialLevel: 'Mandatory'
      },
      {
        id: 'jm3',
        name: 'Pneumatic Liquid Bottle Filling & Capping Line',
        purpose: 'Accurate volumetric filling of glass and PET bottles with automated tamper-evident capping.',
        estimatedCostUSD: 9400,
        specifications: '4-nozzle servo piston filler, 1,000 bottles/hour.',
        essentialLevel: 'Mandatory'
      }
    ],

    rawMaterials: [
      {
        id: 'jrm1',
        name: 'Organic Farm-Fresh Produce (Celery, Spinach, Green Apples, Ginger)',
        unit: 'Kilogram',
        unitCostUSD: 1.4,
        monthlyQuantityNeeded: 3200,
        supplierLocation: 'Regional Organic Farm Collective'
      },
      {
        id: 'jrm2',
        name: '350ml Glass Square Bottles with Metal Lids',
        unit: 'Box of 100',
        unitCostUSD: 28,
        monthlyQuantityNeeded: 80,
        supplierLocation: 'Eco-Glass Packaging Solutions'
      }
    ],

    suppliers: [
      {
        id: 'jsup1',
        companyName: 'Valley Organic Farmers Cooperative',
        location: 'Agricultural Valley District',
        rating: 4.9,
        moq: '200 kg / order',
        leadTimeDays: 2,
        contactEmailMock: 'orders@valley-organic.mock',
        certified: true
      }
    ],

    packagingDetails: {
      materialType: 'Recyclable Glass Square Bottle with shrink sleeve seal',
      costPerUnitUSD: 0.32,
      sustainabilityGrade: 'A',
      notes: 'Glass maintains temperature insulation and premium aesthetic.'
    },

    licenses: [
      {
        title: 'FSSAI / Food Safety Standard Authority License',
        issuingAuthority: 'Food Safety Authority',
        estimatedCostUSD: 400,
        timelineDays: 14,
        description: 'Mandatory food processing unit certification verifying sanitation and HACCPS standards.',
        mandatory: true
      },
      {
        title: 'Commercial Cold Storage & Refrigeration Permit',
        issuingAuthority: 'Municipal Health Department',
        estimatedCostUSD: 250,
        timelineDays: 10,
        description: 'Approval for cold-chain storage facility (<4 degrees Celsius).',
        mandatory: true
      }
    ],

    gstTaxRate: '12% GST (HSN Code 200989)',
    trademarkClass: 'Trademark Class 32 (Non-alcoholic beverages, fruit juices, and elixirs)',

    primaryChannels: [
      'Direct Cold-Chain Subscription (Weekly delivery box to homes/offices)',
      'Retail placement in 30+ Premium Gyms & Yoga Studios',
      'Pop-up Juice Bars at Farmers Markets & Corporate Tech Parks'
    ],
    launchTactics: [
      '3-Day Juice Cleanse Challenge campaign with local fitness instructors',
      'Free Tasting Booths at high-end fitness clubs',
      'Bottle Return Rebate program ($0.50 credit for returning empty glass bottles)'
    ],
    suggestedTaglines: [
      'Pure Cold-Pressed Vitality.',
      'Raw. Organic. Unapologetically Fresh.',
      'Drink Your Greens, Live Vibrant.'
    ],
    cacUSD: 6.2,
    ltvUSD: 58.0,

    launchTimelineMonths: 4,
    launchTasks: [
      { id: 'jt1', title: 'Food Safety & FSSAI License Application', phase: 'Phase 1: Planning', week: 1, category: 'Legal', completed: true },
      { id: 'jt2', title: 'Lease Commercial Kitchen & Install Walk-in Cold Room', phase: 'Phase 1: Planning', week: 2, category: 'Operations', completed: true },
      { id: 'jt3', title: 'Procure Hydraulic Press & Automated Bottling Line', phase: 'Phase 2: Setup & Procurement', week: 4, category: 'Operations', completed: false },
      { id: 'jt4', title: 'Sign Supply Contracts with Local Organic Farmers', phase: 'Phase 2: Setup & Procurement', week: 5, category: 'Operations', completed: false },
      { id: 'jt5', title: 'Nutritional Lab Testing & Shelf Life Validation', phase: 'Phase 3: Testing & Licensing', week: 8, category: 'Legal', completed: false },
      { id: 'jt6', title: 'Launch Subscription Website & Gym Retail Partnerships', phase: 'Phase 4: Launch & Scale', week: 12, category: 'Marketing', completed: false }
    ],

    risks: [
      {
        category: 'Supply Chain',
        title: 'Short Shelf Life of Fresh Unpasteurized Juice (5-7 days)',
        severity: 'High',
        description: 'Perishable nature risks product wastage if demand forecasting is inaccurate.',
        mitigationStrategy: 'Implement just-in-time (JIT) batch production and partner with an HPP toller for 45-day refrigerated shelf life.'
      }
    ],

    growthMilestones: [
      { phase: 'Phase 1 (Months 1-4)', timeline: 'Months 1 to 4', objective: 'Reach 3,000 monthly active subscribers in core metro hub.' },
      { phase: 'Phase 2 (Year 2)', timeline: 'Months 5 to 18', objective: 'Add functional wellness shots (Ginger, Wheatgrass, Cleanse tonics) to product lineup.' }
    ],

    monthlyFinancialProjections: [
      { month: 'M1', revenueUSD: 3500, expensesUSD: 11800, netProfitUSD: -8300 },
      { month: 'M2', revenueUSD: 8200, expensesUSD: 11500, netProfitUSD: -3300 },
      { month: 'M3', revenueUSD: 14500, expensesUSD: 11600, netProfitUSD: 2900 },
      { month: 'M4', revenueUSD: 21000, expensesUSD: 11800, netProfitUSD: 9200 },
      { month: 'M5', revenueUSD: 24000, expensesUSD: 12000, netProfitUSD: 12000 },
      { month: 'M6', revenueUSD: 28500, expensesUSD: 12500, netProfitUSD: 16000 }
    ]
  },
  {
    id: 'solar-panel-cleaning-drone',
    slug: 'solar-panel-cleaning-drone',
    title: 'Autonomous Solar Panel Cleaning & Thermal Drone Service',
    tagline: 'AI-assisted drone cleaning and thermal inspection for commercial solar farms & residential rooftops.',
    category: 'Green Tech & Clean Energy',
    complexity: 'High',
    shortDescription: 'Drone fleet service offering specialized waterless cleaning and thermographic fault detection for utility-scale solar installations.',
    
    initialCapitalUSD: 62000,
    monthlyOpExUSD: 14000,
    estimatedMonthlyRevenueUSD: 36000,
    breakEvenMonth: 6,
    roiPercentage12M: 58,
    profitMarginPercent: 48,

    targetAudience: [
      'Utility-scale solar plant developers & asset management companies',
      'Industrial warehouse owners with rooftop solar arrays',
      'Commercial real estate & educational campus facilities',
      'Residential solar installer maintenance contractors'
    ],
    uniqueValueProp: 'Cleans solar panels 8x faster than manual labor while thermographic cameras detect micro-cracks and hot-spot defects automatically.',
    industryTrends: [
      'Dust accumulation reduces solar panel efficiency by up to 25%',
      'Massive global adoption of commercial solar energy',
      'Robotic/drone automated maintenance lowering O&M contract costs'
    ],

    tamSize: '$1.4 Billion (Global Solar Operation & Maintenance Services)',
    samSize: '$220 Million (Commercial Drone Maintenance in NA & Europe)',
    somSize: '$1.8 Million (Regional Utility Solar Farms)',
    cagrGrowthRate: '16.5%',
    demandTrendData: [
      { year: '2022', index: 40 },
      { year: '2023', index: 58 },
      { year: '2024', index: 79 },
      { year: '2025', index: 105 },
      { year: '2026', index: 142 }
    ],
    competitors: [
      {
        name: 'AeroClean Solar Robotics',
        marketShare: '15%',
        strengths: 'Heavy industrial tethered water drones.',
        weaknesses: 'High setup cost, requires heavy water truck on-site.',
        pricePoint: 'Premium'
      },
      {
        name: 'Manual Scaffolding Cleaners',
        marketShare: '45%',
        strengths: 'Low tech, existing legacy contracts.',
        weaknesses: 'High worker risk, slow speed, high water consumption.',
        pricePoint: 'Budget'
      }
    ],

    machines: [
      {
        id: 'dm1',
        name: 'Heavy-Payload Quadcopter Drone with Microfiber Cleaning Rig',
        purpose: 'Hovering solar cleaning drone equipped with rotating soft brushes and deionized mist sprayers.',
        estimatedCostUSD: 24000,
        specifications: '35 min flight time, 12kg payload, RTK GPS pinpoint navigation accuracy.',
        essentialLevel: 'Mandatory'
      },
      {
        id: 'dm2',
        name: 'FLIR Thermal Imaging & Optical Inspection Drone',
        purpose: 'Aerial mapping drone for automated thermal hotspot micro-crack inspection.',
        estimatedCostUSD: 14500,
        specifications: '640x512 Radiometric Thermal Sensor, 4K Optical 30x Zoom.',
        essentialLevel: 'Mandatory'
      },
      {
        id: 'dm3',
        name: 'Mobile Power Station & Battery Rapid Charging Dock',
        purpose: 'Field van trailer with generator and dual rapid charger matrix for continuous drone operation.',
        estimatedCostUSD: 8500,
        specifications: '10kWh Lithium Battery Bank, 3000W Solar Inverter.',
        essentialLevel: 'Mandatory'
      }
    ],

    rawMaterials: [
      {
        id: 'drm1',
        name: 'Deionized Anti-Static Cleaning Concentrate',
        unit: '20L Drum',
        unitCostUSD: 85,
        monthlyQuantityNeeded: 15,
        supplierLocation: 'Specialty Chemical Lab'
      },
      {
        id: 'drm2',
        name: 'High-Tension Carbon Fiber Drone Replacement Propellers',
        unit: 'Pair',
        unitCostUSD: 40,
        monthlyQuantityNeeded: 8,
        supplierLocation: 'AeroCraft Components Inc.'
      }
    ],

    suppliers: [
      {
        id: 'dsup1',
        companyName: 'AeroDyne Drone Technologies',
        location: 'Aviation Tech Hub',
        rating: 4.9,
        moq: '1 unit',
        leadTimeDays: 14,
        contactEmailMock: 'enterprise@aerodyne.mock',
        certified: true
      }
    ],

    packagingDetails: {
      materialType: 'Custom Rugged Pelican Hard Flight Cases with foam inserts',
      costPerUnitUSD: 450.0,
      sustainabilityGrade: 'A+',
      notes: 'Industrial grade waterproofing and shock isolation for transport.'
    },

    licenses: [
      {
        title: 'Commercial Drone Operator License (FAA Part 107 / DGCA)',
        issuingAuthority: 'Federal Aviation Administration / Civil Aviation Authority',
        estimatedCostUSD: 500,
        timelineDays: 21,
        description: 'Mandatory pilot license for commercial UAV flight operations.',
        mandatory: true
      },
      {
        title: 'Commercial General Liability Insurance ($2M Coverage)',
        issuingAuthority: 'Aviation Specialty Underwriters',
        estimatedCostUSD: 1800,
        timelineDays: 5,
        description: 'Protects against property damage during high-altitude solar farm operations.',
        mandatory: true
      }
    ],

    gstTaxRate: '18% GST (SAC Code 9987 - Maintenance and Repair Services)',
    trademarkClass: 'Trademark Class 37 (Building construction, maintenance, and cleaning services)',

    primaryChannels: [
      'B2B Enterprise Direct Sales to Solar Farm Asset Managers',
      'Tenders for Municipal Solar Park Annual Operation Contracts',
      'Partnerships with Solar Engineering Procurement & Construction (EPC) firms'
    ],
    launchTactics: [
      'Free 1-MW Demonstration Clean & Thermal Audit for target solar developers',
      'Publishing Case Studies showcasing 14% energy yield gain post-cleaning',
      'Direct Mailers with sample thermal defect reports sent to Plant Managers'
    ],
    suggestedTaglines: [
      'Maximize Solar Yield from Above.',
      'Precision Cleaning. Instant Efficiency.',
      'Smarter Drones for Brighter Solar Energy.'
    ],
    cacUSD: 350.0,
    ltvUSD: 12500.0,

    launchTimelineMonths: 6,
    launchTasks: [
      { id: 'dt1', title: 'Obtain Commercial Drone Pilot Certification (Part 107)', phase: 'Phase 1: Planning', week: 1, category: 'Legal', completed: true },
      { id: 'dt2', title: 'Procure Heavy Cleaning Drone Fleet & Thermal Cameras', phase: 'Phase 2: Setup & Procurement', week: 4, category: 'Operations', completed: false },
      { id: 'dt3', title: 'Secure Aviation Liability Insurance Coverage', phase: 'Phase 2: Setup & Procurement', week: 6, category: 'Legal', completed: false },
      { id: 'dt4', title: 'Field Trial & Calibration at 500kW Partner Solar Site', phase: 'Phase 3: Testing & Licensing', week: 10, category: 'Operations', completed: false },
      { id: 'dt5', title: 'Sign First 3-Year Maintenance Contract with Solar Utility', phase: 'Phase 4: Launch & Scale', week: 16, category: 'Marketing', completed: false }
    ],

    risks: [
      {
        category: 'Operational',
        title: 'High Wind Velocity Grounding Flights',
        severity: 'Medium',
        description: 'Winds above 25 knots render aerial cleaning unsafe.',
        mitigationStrategy: 'Deploy automated anemometer weather sensors and schedule early morning cleaning windows when wind speeds are lowest.'
      }
    ],

    growthMilestones: [
      { phase: 'Phase 1 (Months 1-6)', timeline: 'Months 1 to 6', objective: 'Secure 50 MW total under recurring annual maintenance contracts.' },
      { phase: 'Phase 2 (Year 2)', timeline: 'Months 7 to 18', objective: 'Deploy autonomous "Drone-in-a-Box" docking stations directly on remote solar farms.' }
    ],

    monthlyFinancialProjections: [
      { month: 'M1', revenueUSD: 4000, expensesUSD: 14500, netProfitUSD: -10500 },
      { month: 'M2', revenueUSD: 11000, expensesUSD: 14000, netProfitUSD: -3000 },
      { month: 'M3', revenueUSD: 18000, expensesUSD: 14200, netProfitUSD: 3800 },
      { month: 'M4', revenueUSD: 24000, expensesUSD: 14000, netProfitUSD: 10000 },
      { month: 'M5', revenueUSD: 30000, expensesUSD: 14500, netProfitUSD: 15500 },
      { month: 'M6', revenueUSD: 36000, expensesUSD: 15000, netProfitUSD: 21000 }
    ]
  },
  {
    id: 'specialty-coffee-roastery',
    slug: 'specialty-coffee-roastery',
    title: 'Specialty Coffee Micro-Roastery & Subscription Bar',
    tagline: 'Artisanal single-origin coffee bean roasting, custom espresso blends, and recurring bean subscriptions.',
    category: 'FMCG & Consumer Products',
    complexity: 'Medium',
    shortDescription: 'Small-batch 5kg coffee roastery crafting high-scoring single-origin beans for cafes, offices, and home baristas.',
    
    initialCapitalUSD: 32000,
    monthlyOpExUSD: 8500,
    estimatedMonthlyRevenueUSD: 19500,
    breakEvenMonth: 4,
    roiPercentage12M: 46,
    profitMarginPercent: 42,

    targetAudience: [
      'Specialty coffee lovers & home espresso baristas',
      'Boutique cafes, brunch spots, and luxury bakeries',
      'Tech startups & creative agency offices',
      'E-commerce recurring coffee subscription buyers'
    ],
    uniqueValueProp: 'Direct-trade single-origin green beans roasted to order with precision roast profiling software.',
    industryTrends: [
      'Rise of "Fourth Wave" coffee emphasizing traceability and microlots',
      'High growth in home specialty espresso equipment sales',
      'Strong monthly recurring revenue (MRR) from bean subscriptions'
    ],

    tamSize: '$2.1 Billion (Specialty Coffee Micro-Roastery Segment)',
    samSize: '$180 Million (Regional Direct-to-Consumer & Cafe Wholesale)',
    somSize: '$1.2 Million (Target Year 2 regional output)',
    cagrGrowthRate: '11.2%',
    demandTrendData: [
      { year: '2022', index: 65 },
      { year: '2023', index: 78 },
      { year: '2024', index: 92 },
      { year: '2025', index: 110 },
      { year: '2026', index: 135 }
    ],
    competitors: [
      {
        name: 'Blue Bottle Coffee',
        marketShare: '35%',
        strengths: 'Global brand awareness, massive retail footprint.',
        weaknesses: 'Loss of artisanal niche appeal after corporate acquisition.',
        pricePoint: 'Premium'
      },
      {
        name: 'CraftRoast Co.',
        marketShare: '14%',
        strengths: 'Local cafe wholesale contracts.',
        weaknesses: 'Outdated website, no consumer subscription portal.',
        pricePoint: 'Mid-tier'
      }
    ],

    machines: [
      {
        id: 'cm1',
        name: '5kg Gas Drum Coffee Roaster with Thermal Profile Logger',
        purpose: 'Roasts batch coffee beans with digital airflow and temperature probe logging.',
        estimatedCostUSD: 15500,
        specifications: '5kg batch capacity (20kg/hr), infrared burners, Cropster profiling compatible.',
        essentialLevel: 'Mandatory'
      },
      {
        id: 'cm2',
        name: 'Commercial Automatic Degassing Valve Pouch Sealer',
        purpose: 'Fills nitrogen-flushed valve bags to preserve coffee freshness and aroma.',
        estimatedCostUSD: 3800,
        specifications: 'Impulse sealer with date stamp coder and nitrogen flush attachment.',
        essentialLevel: 'Mandatory'
      },
      {
        id: 'cm3',
        name: 'Precision Espresso Testing Bar & Burr Grinder',
        purpose: 'Quality control cupping station and sample roasting bar for testing bean batches.',
        estimatedCostUSD: 4200,
        specifications: 'Dual boiler PID espresso machine & 98mm flat burr grinder.',
        essentialLevel: 'Mandatory'
      }
    ],

    rawMaterials: [
      {
        id: 'crm1',
        name: 'Specialty Green Coffee Beans (Ethiopia Yirgacheffe, Colombia Huila)',
        unit: '60kg Jute Bag',
        unitCostUSD: 320,
        monthlyQuantityNeeded: 18,
        supplierLocation: 'Direct Trade Importer'
      },
      {
        id: 'crm2',
        name: '250g Valve Pouches with Zip Lock & Custom Foil Lining',
        unit: 'Box of 500',
        unitCostUSD: 95,
        monthlyQuantityNeeded: 8,
        supplierLocation: 'Specialty Bag Producer'
      }
    ],

    suppliers: [
      {
        id: 'csup1',
        companyName: 'Origin Select Green Coffee Importers',
        location: 'Port Terminal Logistics Hub',
        rating: 4.9,
        moq: '2 bags (120 kg)',
        leadTimeDays: 4,
        contactEmailMock: 'trader@originselect.mock',
        certified: true
      }
    ],

    packagingDetails: {
      materialType: 'Matte Finish Black Paper Pouch with One-Way Degassing Valve',
      costPerUnitUSD: 0.28,
      sustainabilityGrade: 'A',
      notes: 'Degassing valve permits CO2 escape without letting oxygen ruin freshness.'
    },

    licenses: [
      {
        title: 'Food Safety & Hygiene License',
        issuingAuthority: 'Department of Public Health',
        estimatedCostUSD: 300,
        timelineDays: 10,
        description: 'Required for handling dry food products and roasting machinery operation.',
        mandatory: true
      },
      {
        title: 'Roastery Commercial Gas & Exhaust Permit',
        issuingAuthority: 'Fire Department & Environmental Protection',
        estimatedCostUSD: 450,
        timelineDays: 14,
        description: 'Ensures coffee roaster exhaust ducting meets safety and smoke filter standards.',
        mandatory: true
      }
    ],

    gstTaxRate: '5% GST (HSN 09012100 - Roasted Coffee)',
    trademarkClass: 'Trademark Class 30 (Coffee, tea, cocoa, and artificial coffee)',

    primaryChannels: [
      'D2C E-Commerce Subscription (Bi-weekly freshly roasted coffee delivered)',
      'Wholesale Supply to 15+ Local Specialty Cafes & Espresso Bars',
      'Corporate Office Coffee Bean Supply & Espresso Equipment Rental'
    ],
    launchTactics: [
      'Free 100g Tasting Sample with free shipping for first 200 signups',
      'Weekly Public Cupping & Coffee Tasting Workshops at roastery showroom',
      'Collaborative Limited Roast release with local craft brewery'
    ],
    suggestedTaglines: [
      'Roasted with Intent. Brewed with Passion.',
      'From Microlots to Your Morning Cup.',
      'Peak Freshness in Every Bean.'
    ],
    cacUSD: 8.5,
    ltvUSD: 84.0,

    launchTimelineMonths: 4,
    launchTasks: [
      { id: 'ct1', title: 'Lease Commercial Industrial Space & Install Gas Line Exhaust', phase: 'Phase 1: Planning', week: 1, category: 'Operations', completed: true },
      { id: 'ct2', title: 'Procure 5kg Gas Drum Roaster & Packaging Line', phase: 'Phase 2: Setup & Procurement', week: 3, category: 'Operations', completed: true },
      { id: 'ct3', title: 'Source First Batch Specialty Green Beans from Ethiopia & Colombia', phase: 'Phase 2: Setup & Procurement', week: 5, category: 'Operations', completed: false },
      { id: 'ct4', title: 'Calibrate Roast Curves and Obtain Food Safety Permits', phase: 'Phase 3: Testing & Licensing', week: 8, category: 'Legal', completed: false },
      { id: 'ct5', title: 'Launch E-Commerce Website & Cafe Wholesale Pitching', phase: 'Phase 4: Launch & Scale', week: 12, category: 'Marketing', completed: false }
    ],

    risks: [
      {
        category: 'Supply Chain',
        title: 'Fluctuation in Global Green Coffee Commodity Prices',
        severity: 'Medium',
        description: 'Weather events in Brazil/Vietnam impact baseline green bean costs.',
        mitigationStrategy: 'Lock in 6-month forward contracts with green coffee importers at fixed pricing.'
      }
    ],

    growthMilestones: [
      { phase: 'Phase 1 (Months 1-4)', timeline: 'Months 1 to 4', objective: 'Reach 1,000 lbs/month roasted volume and 250 active web subscribers.' }
    ],

    monthlyFinancialProjections: [
      { month: 'M1', revenueUSD: 2800, expensesUSD: 8800, netProfitUSD: -6000 },
      { month: 'M2', revenueUSD: 6500, expensesUSD: 8500, netProfitUSD: -2000 },
      { month: 'M3', revenueUSD: 11200, expensesUSD: 8600, netProfitUSD: 2600 },
      { month: 'M4', revenueUSD: 16000, expensesUSD: 8700, netProfitUSD: 7300 },
      { month: 'M5', revenueUSD: 19500, expensesUSD: 8900, netProfitUSD: 10600 },
      { month: 'M6', revenueUSD: 23000, expensesUSD: 9200, netProfitUSD: 13800 }
    ]
  },
  {
    id: 'paper-bag-manufacturing',
    slug: 'paper-bag-manufacturing',
    title: 'Automated Kraft Paper Bag Manufacturing Unit',
    tagline: 'High-speed production of eco-friendly square bottom kraft paper bags for retail and food delivery.',
    category: 'Manufacturing',
    complexity: 'Medium',
    shortDescription: 'Automatic roll-fed kraft paper bag making machine with flexographic inline 2-color printing.',
    initialCapitalUSD: 42000,
    monthlyOpExUSD: 9800,
    estimatedMonthlyRevenueUSD: 21500,
    breakEvenMonth: 5,
    roiPercentage12M: 45,
    profitMarginPercent: 38,
    targetAudience: [
      'Retail clothing stores & boutique fashion outlets',
      'Food delivery chains & restaurant takeaway networks',
      'E-commerce fulfillment centers seeking plastic-free bags'
    ],
    uniqueValueProp: 'High-tensile reinforced square-bottom paper bags with biodegradable twisted paper handles and eco-ink custom logo printing.',
    industryTrends: [
      'Global government bans on single-use plastic carrier bags',
      'Booming e-commerce and local retail demand for sustainable packaging',
      'High repeat monthly orders from grocery and restaurant clients'
    ],
    tamSize: '$6.4 Billion (Global Paper Packaging Market)',
    samSize: '$520 Million (Regional Retail Kraft Bags)',
    somSize: '$3.1 Million (Target Year 2 regional production output)',
    cagrGrowthRate: '11.8%',
    demandTrendData: [
      { year: '2022', index: 52 },
      { year: '2023', index: 68 },
      { year: '2024', index: 85 },
      { year: '2025', index: 108 },
      { year: '2026', index: 138 }
    ],
    competitors: [
      {
        name: 'PackEco Packaging',
        marketShare: '22%',
        strengths: 'Established retail distribution.',
        weaknesses: 'Long production turnarounds for custom orders.',
        pricePoint: 'Mid-tier'
      }
    ],
    machines: [
      {
        id: 'pbm1',
        name: 'Fully Automatic Square Bottom Paper Bag Machine',
        purpose: 'Forming, gluing, handle pasting, and bottom sealing from kraft paper rolls.',
        estimatedCostUSD: 24500,
        specifications: '180-220 bags/min capacity, 60-150 GSM paper weight compatibility.',
        essentialLevel: 'Mandatory'
      },
      {
        id: 'pbm2',
        name: '2-Color Inline Flexographic Printing Press',
        purpose: 'High-speed custom logo and brand artwork printing on kraft paper rolls.',
        estimatedCostUSD: 9800,
        specifications: 'Water-based ink system, max printing width 800mm.',
        essentialLevel: 'Mandatory'
      }
    ],
    rawMaterials: [
      {
        id: 'pbrm1',
        name: 'Virgin Brown Kraft Paper Reels (100 GSM)',
        unit: 'Ton',
        unitCostUSD: 780,
        monthlyQuantityNeeded: 12,
        supplierLocation: 'Regional Paper Mill'
      }
    ],
    suppliers: [
      {
        id: 'pbsup1',
        companyName: 'KraftMaster Paper Mills',
        location: 'Industrial Paper Zone',
        rating: 4.8,
        moq: '3 tons',
        leadTimeDays: 5,
        contactEmailMock: 'sales@kraftmaster.mock',
        certified: true
      }
    ],
    packagingDetails: {
      materialType: 'Strapped Corrugated Bales (500 bags per bundle)',
      costPerUnitUSD: 0.02,
      sustainabilityGrade: 'A+',
      notes: 'Compact palletizing for efficient transport.'
    },
    licenses: [
      {
        title: 'Factory & Small Industry Registration (MSME)',
        issuingAuthority: 'Department of Industries',
        estimatedCostUSD: 150,
        timelineDays: 7,
        description: 'Mandatory industrial unit registration.',
        mandatory: true
      }
    ],
    gstTaxRate: '12% GST (HSN 481910 - Cartons & Paper Bags)',
    trademarkClass: 'Trademark Class 16 (Paper bags and wrapping materials)',
    primaryChannels: [
      'B2B Direct Supply to Fashion Retailers & Supermarkets',
      'Wholesale Packaging Distributors'
    ],
    launchTactics: [
      'Free 100-bag Sample Box sent to regional retail shop owners',
      'Bulk discount contracts for annual restaurant delivery orders'
    ],
    suggestedTaglines: [
      'Carry Smart. Pack Green.',
      'Strong, Sustainable, Square-Bottom Quality.'
    ],
    cacUSD: 120.0,
    ltvUSD: 5200.0,
    launchTimelineMonths: 5,
    launchTasks: [
      { id: 'pbt1', title: 'Factory Lease & Electrical Connection Setup', phase: 'Phase 1: Planning', week: 1, category: 'Operations', completed: true },
      { id: 'pbt2', title: 'Procure Bag Making Machine & Printing Unit', phase: 'Phase 2: Setup & Procurement', week: 4, category: 'Operations', completed: false }
    ],
    risks: [
      {
        category: 'Supply Chain',
        title: 'Kraft Paper Pulp Price Volatility',
        severity: 'Medium',
        description: 'Global pulp prices fluctuate seasonally.',
        mitigationStrategy: 'Secure 3-month fixed supply agreements with local paper mills.'
      }
    ],
    growthMilestones: [
      { phase: 'Phase 1 (Months 1-5)', timeline: 'Months 1 to 5', objective: 'Produce 300,000 bags/month and hit break-even sales.' }
    ],
    monthlyFinancialProjections: [
      { month: 'M1', revenueUSD: 3000, expensesUSD: 10200, netProfitUSD: -7200 },
      { month: 'M2', revenueUSD: 8500, expensesUSD: 9800, netProfitUSD: -1300 },
      { month: 'M3', revenueUSD: 14000, expensesUSD: 9800, netProfitUSD: 4200 },
      { month: 'M4', revenueUSD: 18000, expensesUSD: 9900, netProfitUSD: 8100 },
      { month: 'M5', revenueUSD: 21500, expensesUSD: 10000, netProfitUSD: 11500 }
    ]
  },
  {
    id: 'custom-furniture-workshop',
    slug: 'custom-furniture-workshop',
    title: 'Modular Wooden Furniture & Modern Joinery Unit',
    tagline: 'Precision CNC-crafted modular wooden furniture for residential homes and corporate interiors.',
    category: 'Manufacturing',
    complexity: 'Medium',
    shortDescription: 'CNC wood router and edge-banding workshop producing ergonomic desks, tables, and cabinetry.',
    initialCapitalUSD: 36000,
    monthlyOpExUSD: 8200,
    estimatedMonthlyRevenueUSD: 18000,
    breakEvenMonth: 5,
    roiPercentage12M: 44,
    profitMarginPercent: 41,
    targetAudience: [
      'Work-from-home professionals & modern homeowners',
      'Interior designers & architectural turnkey contractors',
      'Co-working spaces & startup office fit-outs'
    ],
    uniqueValueProp: 'Flat-pack toolless assembly wooden furniture made from sustainably harvested FSC-certified hardwood plywood.',
    industryTrends: [
      'Surge in demand for ergonomic home office furniture',
      'Shift toward modular flat-pack furniture with minimal shipping footprint'
    ],
    tamSize: '$14.2 Billion (Global Wooden Furniture Market)',
    samSize: '$850 Million (Modular Home & Office Segment)',
    somSize: '$2.8 Million (Target Year 2 regional output)',
    cagrGrowthRate: '8.6%',
    demandTrendData: [
      { year: '2022', index: 60 },
      { year: '2023', index: 72 },
      { year: '2024', index: 88 },
      { year: '2025', index: 112 },
      { year: '2026', index: 140 }
    ],
    competitors: [
      {
        name: 'ModuWood Crafts',
        marketShare: '18%',
        strengths: 'Direct retail showroom footprint.',
        weaknesses: 'High pricing, slow delivery lead time.',
        pricePoint: 'Premium'
      }
    ],
    machines: [
      {
        id: 'fwm1',
        name: 'Industrial 3-Axis CNC Wood Router',
        purpose: 'Computerized precision cutting, drilling, and joinery carving of wood panels.',
        estimatedCostUSD: 16800,
        specifications: '4x8 ft vacuum bed, 9kW air-cooled spindle, automatic tool changer.',
        essentialLevel: 'Mandatory'
      },
      {
        id: 'fwm2',
        name: 'Automatic Edge Banding Machine',
        purpose: 'Applies hot-melt PVC/veneer tape to raw panel edges.',
        estimatedCostUSD: 7500,
        specifications: 'Pre-milling, end trimming, buffing unit, 18m/min speed.',
        essentialLevel: 'Mandatory'
      }
    ],
    rawMaterials: [
      {
        id: 'fwrm1',
        name: 'FSC-Certified Baltic Birch Plywood Sheets (18mm)',
        unit: 'Sheet',
        unitCostUSD: 52,
        monthlyQuantityNeeded: 110,
        supplierLocation: 'Timber Wholesale Hub'
      }
    ],
    suppliers: [
      {
        id: 'fwsup1',
        companyName: 'TimberCraft Lumber Co.',
        location: 'Woodworking Industrial Estate',
        rating: 4.7,
        moq: '20 sheets',
        leadTimeDays: 4,
        contactEmailMock: 'orders@timbercraft.mock',
        certified: true
      }
    ],
    packagingDetails: {
      materialType: 'Heavy-Duty Honeycomb Cardboard Box with foam corner guards',
      costPerUnitUSD: 1.80,
      sustainabilityGrade: 'A',
      notes: 'Flat-pack box optimized for parcel delivery.'
    },
    licenses: [
      {
        title: 'Carpentry Factory Safety & Environmental Permit',
        issuingAuthority: 'Municipal Safety Board',
        estimatedCostUSD: 250,
        timelineDays: 10,
        description: 'Required for saw-dust suction and fire safety setup.',
        mandatory: true
      }
    ],
    gstTaxRate: '18% GST (HSN 940330 - Wooden Office Furniture)',
    trademarkClass: 'Trademark Class 20 (Furniture, mirrors, wood products)',
    primaryChannels: [
      'D2C E-Commerce Store with 3D Customizer',
      'Interior Designer B2B Wholesale Contracts'
    ],
    launchTactics: [
      'Partner with top 20 interior designers for trade pricing',
      'Instagram showcase of custom desk build process videos'
    ],
    suggestedTaglines: [
      'Precision Wooden Crafts for Modern Spaces.',
      'Sustainably Made. Effortlessly Assembled.'
    ],
    cacUSD: 45.0,
    ltvUSD: 680.0,
    launchTimelineMonths: 5,
    launchTasks: [
      { id: 'fwt1', title: 'Lease Workshop Premises & Install Dust Extractor', phase: 'Phase 1: Planning', week: 1, category: 'Operations', completed: true },
      { id: 'fwt2', title: 'Procure CNC Router & Edge Bander', phase: 'Phase 2: Setup & Procurement', week: 3, category: 'Operations', completed: false }
    ],
    risks: [
      {
        category: 'Operational',
        title: 'Wood Dust Fire Hazard',
        severity: 'Medium',
        description: 'Combustible wood dust accumulation in workshop.',
        mitigationStrategy: 'Install a closed-loop cyclone dust extraction and spark detection system.'
      }
    ],
    growthMilestones: [
      { phase: 'Phase 1 (Months 1-5)', timeline: 'Months 1 to 5', objective: 'Ship 150 custom furniture pieces per month.' }
    ],
    monthlyFinancialProjections: [
      { month: 'M1', revenueUSD: 2500, expensesUSD: 8500, netProfitUSD: -6000 },
      { month: 'M2', revenueUSD: 7000, expensesUSD: 8200, netProfitUSD: -1200 },
      { month: 'M3', revenueUSD: 12000, expensesUSD: 8300, netProfitUSD: 3700 },
      { month: 'M4', revenueUSD: 15500, expensesUSD: 8400, netProfitUSD: 7100 },
      { month: 'M5', revenueUSD: 18000, expensesUSD: 8500, netProfitUSD: 9500 }
    ]
  },
  {
    id: 'organic-soap-skincare',
    slug: 'organic-soap-skincare',
    title: 'Artisanal Organic Soap & Herbal Skincare Lab',
    tagline: 'Cold-process botanical soaps, essential oil bars, and clean beauty personal care products.',
    category: 'FMCG & Consumer Products',
    complexity: 'Low',
    shortDescription: 'GMP-certified cold-process soap unit formulating natural shea butter and essential oil bars.',
    initialCapitalUSD: 22000,
    monthlyOpExUSD: 5400,
    estimatedMonthlyRevenueUSD: 13500,
    breakEvenMonth: 4,
    roiPercentage12M: 50,
    profitMarginPercent: 48,
    targetAudience: [
      'Eco-conscious beauty buyers & sensitive skin consumers',
      'Boutique spa resorts, organic stores & gift hamper curators',
      'Subscription box buyers seeking plastic-free body care'
    ],
    uniqueValueProp: 'Handcrafted cold-processed soap cured for 4 weeks using organic cold-pressed virgin coconut oil, french pink clay, and pure lavender essential oils.',
    industryTrends: [
      'Explosive growth in natural clean-beauty personal care products',
      'Consumer shift away from synthetic detergent bars containing sulfates and parabens'
    ],
    tamSize: '$5.8 Billion (Global Natural & Organic Soap Market)',
    samSize: '$410 Million (Specialty Artisanal Soap Segment)',
    somSize: '$1.9 Million (Target Year 2 regional output)',
    cagrGrowthRate: '10.5%',
    demandTrendData: [
      { year: '2022', index: 55 },
      { year: '2023', index: 70 },
      { year: '2024', index: 88 },
      { year: '2025', index: 110 },
      { year: '2026', index: 135 }
    ],
    competitors: [
      {
        name: 'PureBotanicals Soap',
        marketShare: '15%',
        strengths: 'Wide retail distribution.',
        weaknesses: 'Generic packaging, synthetic fragrance blends.',
        pricePoint: 'Mid-tier'
      }
    ],
    machines: [
      {
        id: 'spm1',
        name: 'Jacketed Stainless Steel Soap Batch Kettle & Mixer',
        purpose: 'Heats and saponifies organic oils with temperature-controlled stirring.',
        estimatedCostUSD: 6200,
        specifications: '200L capacity, 316 stainless steel, variable speed agitator.',
        essentialLevel: 'Mandatory'
      },
      {
        id: 'spm2',
        name: 'Pneumatic Multi-Blade Wire Soap Bar Cutter',
        purpose: 'Slices cured soap blocks into uniform, perfectly weighted bars.',
        estimatedCostUSD: 2800,
        specifications: '30 bars per stroke, adjustable wire spacing.',
        essentialLevel: 'Mandatory'
      }
    ],
    rawMaterials: [
      {
        id: 'sprm1',
        name: 'Organic Virgin Coconut Oil & Unrefined Shea Butter',
        unit: '50kg Drum',
        unitCostUSD: 210,
        monthlyQuantityNeeded: 8,
        supplierLocation: 'Organic Oils Importer'
      }
    ],
    suppliers: [
      {
        id: 'spsup1',
        companyName: 'Botanical Botanica Ingredients',
        location: 'Cosmetic Raw Materials Hub',
        rating: 4.9,
        moq: '2 drums',
        leadTimeDays: 3,
        contactEmailMock: 'info@botanica.mock',
        certified: true
      }
    ],
    packagingDetails: {
      materialType: 'Biodegradable Seed Paper Box with soy ink printing',
      costPerUnitUSD: 0.15,
      sustainabilityGrade: 'A+',
      notes: 'Paper box can be planted in soil to grow wildflowers.'
    },
    licenses: [
      {
        title: 'Cosmetics Manufacturing License & Health Clearance',
        issuingAuthority: 'State Drug Control & Health Authority',
        estimatedCostUSD: 650,
        timelineDays: 20,
        description: 'Mandatory license for manufacturing personal care skincare items.',
        mandatory: true
      }
    ],
    gstTaxRate: '18% GST (HSN 340111 - Toilet Soaps)',
    trademarkClass: 'Trademark Class 3 (Soaps, essential oils, cosmetics)',
    primaryChannels: [
      'D2C E-Commerce Brand & Amazon Handmade',
      'Wholesale to Boutique Spas & Organic Supermarkets'
    ],
    launchTactics: [
      'Influencer seeding campaign with beauty content creators',
      'Gift box bundles for holiday corporate gifting'
    ],
    suggestedTaglines: [
      'Pure Botanical Radiance in Every Bar.',
      'Kind to Skin. Gentle on Earth.'
    ],
    cacUSD: 5.5,
    ltvUSD: 42.0,
    launchTimelineMonths: 4,
    launchTasks: [
      { id: 'spt1', title: 'Obtain Cosmetic Manufacturing License', phase: 'Phase 1: Planning', week: 1, category: 'Legal', completed: true },
      { id: 'spt2', title: 'Procure Soap Kettle & Curing Racks', phase: 'Phase 2: Setup & Procurement', week: 3, category: 'Operations', completed: false }
    ],
    risks: [
      {
        category: 'Regulatory',
        title: 'Cosmetic Labeling Compliance',
        severity: 'Low',
        description: 'Strict FDA ingredient list formatting standards.',
        mitigationStrategy: 'Validate all product labels with a certified cosmetic chemist.'
      }
    ],
    growthMilestones: [
      { phase: 'Phase 1 (Months 1-4)', timeline: 'Months 1 to 4', objective: 'Sell 4,000 soap bars per month.' }
    ],
    monthlyFinancialProjections: [
      { month: 'M1', revenueUSD: 1800, expensesUSD: 5600, netProfitUSD: -3800 },
      { month: 'M2', revenueUSD: 4500, expensesUSD: 5400, netProfitUSD: -900 },
      { month: 'M3', revenueUSD: 8800, expensesUSD: 5500, netProfitUSD: 3300 },
      { month: 'M4', revenueUSD: 13500, expensesUSD: 5600, netProfitUSD: 7900 }
    ]
  },
  {
    id: 'gourmet-chocolate-factory',
    slug: 'gourmet-chocolate-factory',
    title: 'Artisanal Bean-to-Bar Gourmet Chocolate Factory',
    tagline: 'Crafting premium single-origin dark chocolates, cocoa butter truffles, and health-focused bars.',
    category: 'FMCG & Consumer Products',
    complexity: 'Medium',
    shortDescription: 'Single-origin cocoa bean roasting, melanging, tempering, and packaging facility.',
    initialCapitalUSD: 39000,
    monthlyOpExUSD: 9500,
    estimatedMonthlyRevenueUSD: 22000,
    breakEvenMonth: 5,
    roiPercentage12M: 48,
    profitMarginPercent: 45,
    targetAudience: [
      'Fine chocolate connoisseurs & gourmet gift buyers',
      'Luxury hotels, boutique bakeries & high-end grocery chains',
      'Corporate holiday gift corporate accounts'
    ],
    uniqueValueProp: '70% dark single-origin bean-to-bar chocolate made with organic coconut sugar, zero artificial additives, and unrefined cocoa butter.',
    industryTrends: [
      'Premiumization of dark chocolate driven by antioxidant health benefits',
      'High growth in direct-trade ethically sourced cocoa bean products'
    ],
    tamSize: '$12.8 Billion (Global Premium & Artisanal Chocolate Market)',
    samSize: '$920 Million (Single-Origin Craft Chocolate Segment)',
    somSize: '$3.4 Million (Target Year 2 regional output)',
    cagrGrowthRate: '9.8%',
    demandTrendData: [
      { year: '2022', index: 58 },
      { year: '2023', index: 72 },
      { year: '2024', index: 90 },
      { year: '2025', index: 114 },
      { year: '2026', index: 142 }
    ],
    competitors: [
      {
        name: 'ArtisanCocoa Co.',
        marketShare: '20%',
        strengths: 'Wide distribution in gourmet food stores.',
        weaknesses: 'High retail pricing ($12 per bar).',
        pricePoint: 'Premium'
      }
    ],
    machines: [
      {
        id: 'chm1',
        name: 'Granite Stone Melangeur & Chocolate Refiner',
        purpose: 'Grinds cocoa nibs and sugar into smooth 20-micron chocolate liquor.',
        estimatedCostUSD: 12500,
        specifications: '60kg batch capacity, granite rollers, continuous 24hr conching.',
        essentialLevel: 'Mandatory'
      },
      {
        id: 'chm2',
        name: 'Continuous Automatic Chocolate Tempering Machine',
        purpose: 'Precisely controls beta-crystal crystallization for crisp snap and glossy finish.',
        estimatedCostUSD: 8900,
        specifications: '24kg bowl capacity, vibrating table, heated dosing nozzle.',
        essentialLevel: 'Mandatory'
      }
    ],
    rawMaterials: [
      {
        id: 'chrm1',
        name: 'Fermented Fair-Trade Green Cocoa Beans (Ecuador/Madagascar)',
        unit: '60kg Jute Bag',
        unitCostUSD: 340,
        monthlyQuantityNeeded: 12,
        supplierLocation: 'Specialty Cocoa Importer'
      }
    ],
    suppliers: [
      {
        id: 'chsup1',
        companyName: 'FairOrigin Cocoa Beans',
        location: 'Port Terminal Warehouse',
        rating: 4.9,
        moq: '2 bags',
        leadTimeDays: 5,
        contactEmailMock: 'supply@fairorigincocoa.mock',
        certified: true
      }
    ],
    packagingDetails: {
      materialType: 'Gold Foil Inner Wrap with Embossed Recycled Cardstock Outer Sleeve',
      costPerUnitUSD: 0.35,
      sustainabilityGrade: 'A',
      notes: 'Luxurious gift-grade foil and cardstock packaging.'
    },
    licenses: [
      {
        title: 'Food Safety & Standards Authority (FSSAI) License',
        issuingAuthority: 'Food Safety Authority',
        estimatedCostUSD: 400,
        timelineDays: 14,
        description: 'Mandatory license for commercial confectionery manufacturing.',
        mandatory: true
      }
    ],
    gstTaxRate: '18% GST (HSN 180632 - Chocolate Bars)',
    trademarkClass: 'Trademark Class 30 (Chocolate, cocoa, confectionery)',
    primaryChannels: [
      'D2C E-Commerce Brand & Custom Corporate Gift Sets',
      'Gourmet Delis, Boutique Bakeries & Airport Duty-Free Shops'
    ],
    launchTactics: [
      'Gourmet tasting events at luxury food markets',
      'Limited-edition seasonal flavor releases (e.g., Sea Salt Caramel, Chili Dark)'
    ],
    suggestedTaglines: [
      'Pure Cocoa. Unrivaled Craft.',
      'Indulgence Redefined from Bean to Bar.'
    ],
    cacUSD: 14.0,
    ltvUSD: 110.0,
    launchTimelineMonths: 5,
    launchTasks: [
      { id: 'cht1', title: 'Food Safety Facility Audit & FSSAI Approval', phase: 'Phase 1: Planning', week: 1, category: 'Legal', completed: true },
      { id: 'cht2', title: 'Procure Roaster, Melangeur & Tempering Unit', phase: 'Phase 2: Setup & Procurement', week: 4, category: 'Operations', completed: false }
    ],
    risks: [
      {
        category: 'Operational',
        title: 'Chocolate Fat Bloom Risk',
        severity: 'Medium',
        description: 'Temperature spikes during shipping cause cocoa butter bloom.',
        mitigationStrategy: 'Use insulated thermal foil mailers and temperature-controlled cold shipping.'
      }
    ],
    growthMilestones: [
      { phase: 'Phase 1 (Months 1-5)', timeline: 'Months 1 to 5', objective: 'Produce 5,000 gourmet chocolate bars monthly.' }
    ],
    monthlyFinancialProjections: [
      { month: 'M1', revenueUSD: 3000, expensesUSD: 9800, netProfitUSD: -6800 },
      { month: 'M2', revenueUSD: 7500, expensesUSD: 9500, netProfitUSD: -2000 },
      { month: 'M3', revenueUSD: 13000, expensesUSD: 9600, netProfitUSD: 3400 },
      { month: 'M4', revenueUSD: 17500, expensesUSD: 9700, netProfitUSD: 7800 },
      { month: 'M5', revenueUSD: 22000, expensesUSD: 9800, netProfitUSD: 12200 }
    ]
  },
  {
    id: 'led-lighting-electronics',
    slug: 'led-lighting-electronics',
    title: 'Automated LED Lighting & SMT Electronics Assembly',
    tagline: 'High-efficiency industrial and residential LED fixtures engineered with automated Surface Mount Technology.',
    category: 'Hardware & Electronics',
    complexity: 'High',
    shortDescription: 'Automated SMT pick-and-place assembly line producing energy-saving LED panels and smart bulb drivers.',
    initialCapitalUSD: 58000,
    monthlyOpExUSD: 12800,
    estimatedMonthlyRevenueUSD: 29500,
    breakEvenMonth: 6,
    roiPercentage12M: 51,
    profitMarginPercent: 42,
    targetAudience: [
      'Commercial building developers & architectural lighting designers',
      'Electrical contractors & industrial warehouse fit-outs',
      'Smart home IoT lighting brands seeking OEM manufacturing'
    ],
    uniqueValueProp: 'High-lumen energy-efficient LED driver boards with 50,000-hour lifespan, surge protection, and Bluetooth/Zigbee smart dimming.',
    industryTrends: [
      'Global transition toward energy-efficient LED retrofits in commercial real estate',
      'Government subsidies and mandates for smart green building illumination'
    ],
    tamSize: '$75.0 Billion (Global LED Lighting Market)',
    samSize: '$4.2 Billion (Commercial & Industrial LED Fixtures)',
    somSize: '$5.5 Million (Target Year 2 regional output)',
    cagrGrowthRate: '12.4%',
    demandTrendData: [
      { year: '2022', index: 62 },
      { year: '2023', index: 78 },
      { year: '2024', index: 96 },
      { year: '2025', index: 120 },
      { year: '2026', index: 152 }
    ],
    competitors: [
      {
        name: 'LuminaTech Electronics',
        marketShare: '25%',
        strengths: 'Massive OEM production capacity.',
        weaknesses: 'Slow custom circuit engineering lead times.',
        pricePoint: 'Mid-tier'
      }
    ],
    machines: [
      {
        id: 'led1',
        name: 'High-Speed Automated SMT Pick and Place Machine',
        purpose: 'Mounts micro-LED chips and surface mount electronic components onto PCB boards.',
        estimatedCostUSD: 28500,
        specifications: '12,000 CPH (components per hour), dual vision alignment camera, 0201 chip accuracy.',
        essentialLevel: 'Mandatory'
      },
      {
        id: 'led2',
        name: 'Lead-Free 6-Zone Reflow Soldering Oven',
        purpose: 'Heats and solders PCB components with precise thermal profiling.',
        estimatedCostUSD: 9200,
        specifications: '6 top / 6 bottom heating zones, forced hot air convection, digital PID control.',
        essentialLevel: 'Mandatory'
      }
    ],
    rawMaterials: [
      {
        id: 'ledrm1',
        name: 'High-Lumen SMD 2835 LED Chips & Aluminum PCBs',
        unit: 'Reel of 5000',
        unitCostUSD: 65,
        monthlyQuantityNeeded: 40,
        supplierLocation: 'Semiconductor Component Hub'
      }
    ],
    suppliers: [
      {
        id: 'ledsup1',
        companyName: 'SemiTech Components Corp.',
        location: 'Electronics Industrial Zone',
        rating: 4.8,
        moq: '5 reels',
        leadTimeDays: 7,
        contactEmailMock: 'sales@semitech.mock',
        certified: true
      }
    ],
    packagingDetails: {
      materialType: 'Anti-Static ESD Bubble Bag inside Rigid Cardboard Master Carton',
      costPerUnitUSD: 0.40,
      sustainabilityGrade: 'A',
      notes: 'ESD protection against electro-static discharge during shipping.'
    },
    licenses: [
      {
        title: 'Bureau of Energy Efficiency (BEE) Star Rating & CE Approval',
        issuingAuthority: 'Energy Efficiency Bureau / Safety Standards',
        estimatedCostUSD: 1100,
        timelineDays: 30,
        description: 'Mandatory energy efficiency rating for commercial LED fixtures.',
        mandatory: true
      }
    ],
    gstTaxRate: '18% GST (HSN 940540 - LED Lamps & Drivers)',
    trademarkClass: 'Trademark Class 11 (Lighting apparatus, LED lamps)',
    primaryChannels: [
      'B2B Direct Wholesale to Electrical Contractors & Developers',
      'White-Label OEM Manufacturing for Smart Home Brands'
    ],
    launchTactics: [
      'Free 3-year warranty guarantee for commercial electrical contractors',
      'Energy saving ROI calculator demo presented to facility managers'
    ],
    suggestedTaglines: [
      'Brighter Light. Lower Energy.',
      'Precision Electronics Engineered for Longevity.'
    ],
    cacUSD: 210.0,
    ltvUSD: 8500.0,
    launchTimelineMonths: 6,
    launchTasks: [
      { id: 'ledt1', title: 'Factory ESD Flooring & SMT Power Setup', phase: 'Phase 1: Planning', week: 1, category: 'Operations', completed: true },
      { id: 'ledt2', title: 'Procure Pick-and-Place & Reflow Oven', phase: 'Phase 2: Setup & Procurement', week: 4, category: 'Operations', completed: false }
    ],
    risks: [
      {
        category: 'Supply Chain',
        title: 'Microchip Semiconductor Shortage',
        severity: 'Medium',
        description: 'Global component lead times can extend unexpectedly.',
        mitigationStrategy: 'Maintain 2 months of buffer inventory for critical micro-controller ICs.'
      }
    ],
    growthMilestones: [
      { phase: 'Phase 1 (Months 1-6)', timeline: 'Months 1 to 6', objective: 'Assemble 10,000 LED drivers/fixtures monthly.' }
    ],
    monthlyFinancialProjections: [
      { month: 'M1', revenueUSD: 4000, expensesUSD: 13500, netProfitUSD: -9500 },
      { month: 'M2', revenueUSD: 10000, expensesUSD: 12800, netProfitUSD: -2800 },
      { month: 'M3', revenueUSD: 17000, expensesUSD: 12900, netProfitUSD: 4100 },
      { month: 'M4', revenueUSD: 23000, expensesUSD: 13000, netProfitUSD: 10000 },
      { month: 'M5', revenueUSD: 27000, expensesUSD: 13100, netProfitUSD: 13900 },
      { month: 'M6', revenueUSD: 29500, expensesUSD: 13200, netProfitUSD: 16300 }
    ]
  }
];

/**
 * Intelligent helper that returns an exact match if available, or dynamically generates
 * a comprehensive, realistic BusinessIdea object tailored to any search query typed by the user!
 */
export function getOrCreateBusinessIdea(queryOrSlug: string): BusinessIdea | undefined {
  const normalized = queryOrSlug.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const queryTokens = queryOrSlug.trim().toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(Boolean);
  
  // 1. Check for exact slug or ID match
  let found = SAMPLE_BUSINESS_IDEAS.find(
    (b) => b.slug === normalized || b.id === normalized
  );
  if (found) return found;

  // 2. Intelligent Match (Fuzzy / Keyword / Plural)
  let bestMatch: BusinessIdea | undefined;
  let highestScore = 0;

  for (const idea of SAMPLE_BUSINESS_IDEAS) {
    const titleTokens = idea.title.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(Boolean);
    
    let matchCount = 0;
    for (let qt of queryTokens) {
      // Basic stemming for plural
      const qtStem = qt.endsWith('es') ? qt.slice(0, -2) : qt.endsWith('s') ? qt.slice(0, -1) : qt;
      
      const hasMatch = titleTokens.some(tt => {
        const ttStem = tt.endsWith('es') ? tt.slice(0, -2) : tt.endsWith('s') ? tt.slice(0, -1) : tt;
        return tt === qt || ttStem === qtStem || tt.includes(qtStem) || qtStem.includes(ttStem);
      });
      
      if (hasMatch) matchCount++;
    }
    
    const score = matchCount / Math.max(queryTokens.length, 1);
    if (score > highestScore) {
      highestScore = score;
      bestMatch = idea;
    }
  }

  // Threshold for fuzzy match
  if (highestScore >= 0.7) {
    return bestMatch;
  }

  // 3. Check if a generated roadmap exists in sessionStorage
  try {
    const saved = sessionStorage.getItem(`roadmap_${normalized}`);
    if (saved) {
      return JSON.parse(saved) as BusinessIdea;
    }
  } catch (e) {
    console.error("Failed to parse saved roadmap", e);
  }
  
  return undefined;
}
