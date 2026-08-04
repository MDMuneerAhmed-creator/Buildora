import { BusinessIdea } from '../types';
import { CurrencyCode, formatCurrency } from './formatters';

export interface CopilotReport {
  summary: string;
  recommendations: string[];
  estimatedCost: {
    title: string;
    items: { label: string; value: string; note?: string }[];
  };
  nextSteps: string[];
  tips: string[];
  importantNotes: string[];
}

export interface CopilotResponse {
  report?: CopilotReport;
  text?: string;
  isClarification?: boolean;
}

export function isInvalidInput(query: string): boolean {
  if (!query) return true;
  const q = query.trim().toLowerCase();
  if (q.length < 2) return true;

  // Reject only numbers or symbols
  const letters = q.replace(/[^a-z]/g, '');
  if (letters.length === 0) return true;

  // Detect high symbol ratio (>40%)
  const symbolCount = q.replace(/[a-z0-9\s]/g, '').length;
  if (q.length > 5 && symbolCount / q.length > 0.4) return true;

  // Detect repeated random characters (e.g. 'aaaa', '....', '@@@')
  if (/(.)\1{4,}/.test(q)) return true;

  const words = q.split(/[\s;,.!?_\-\/\\:()]+/).filter(w => w.length > 0);
  if (words.length === 0) return true;

  const validAcronyms = new Set([
    'ai', 'id', 'ui', 'hr', 'pr', 'it', 'tv', 'ip', 'vr', 'ar', 'cv', 'qa', 
    'b2b', 'd2c', 'roi', 'cac', 'ltv', 'gst', 'tam', 'sam', 'som', 'cagr', 
    'moq', 'oem', 'amc', 'fmcg', 'fssai', 'msme', 'ev', '3d', '2d', 'io',
    'ceo', 'cto', 'cfo', 'coo', 'vp', 'kpi', 'crm', 'erp', 'seo', 'sem', 'ppc',
    'kg', 'lb', 'ton', 'ml', 'sqft', 'sku', 'pos', 'cod', 'hi', 'ok', 'yes', 'no'
  ]);

  let gibberishWords = 0;
  for (const word of words) {
    const clean = word.replace(/[^a-z]/g, '');
    if (!clean) continue;
    
    // Check for keyboard smash patterns
    if (/asdf|qwer|zxcv|hjkl|dfgh|uiop|nmkl/i.test(clean)) {
      gibberishWords++;
      continue;
    }
    
    // Check for words without vowels
    if (clean.length >= 3 && !/[aeiouy]/.test(clean) && !validAcronyms.has(clean)) {
      gibberishWords++;
    }
  }

  if (gibberishWords > 0 && gibberishWords >= Math.ceil(words.length / 2)) {
    return true;
  }

  return false;
}

/**
 * Validates if a user prompt relates to entrepreneurship or business execution topics.
 * Returns false for random gibberish, invalid, or off-topic prompts.
 */
export function isBusinessQuery(query: string, idea: BusinessIdea | null): boolean {
  if (isInvalidInput(query)) return false;

  const q = query.trim().toLowerCase();

  // Domain & entrepreneurship keywords / stems
  const businessKeywords = [
    'business', 'startup', 'invest', 'capital', 'budget',
    'supplier', 'vendor', 'machin', 'equipment', 'factory', 'plant',
    'manufactur', 'producti', 'legal', 'licens', 'licence', 'gst',
    'fssai', 'msme', 'udyam', 'trademark', 'complian', 'registra',
    'financ', 'cost', 'expense', 'opex', 'capex', 'profit', 'margin',
    'roi', 'revenue', 'sale', 'sell', 'market', 'brand', 'logo',
    'tagline', 'packag', 'identity', 'roadmap', 'product', 'export',
    'import', 'ship', 'customer', 'audienc', 'strateg', 'swot',
    'risk', 'trend', 'compet', 'compar', 'expansion', 'opportunit',
    'lakh', 'crore', 'rupee', 'dollar', 'price', 'pricing', 'payback',
    'break-even', 'breakeven', 'franchis', 'kitchen', 'bakery', 'farm',
    'idea', 'plan', 'launch', 'b2b', 'd2c', 'agency', 'wholesal',
    'retail', 'industr', 'tam', 'sam', 'cagr', 'cac', 'ltv',
    'coffee', 'juice', 'paper', 'cup', 'solar', 'spice', 'tea',
    'ayurved', 'textile', 'garment', 'food', 'drink', 'beverage',
    'apparel', 'recycl', 'organic', 'roaster', 'e-commerce', 'ecommerce',
    'online', 'moq', 'amc', 'oem', 'inventory', 'cash flow', 'scale',
    'scaling', 'feasi'
  ];

  const hasKeyword = businessKeywords.some(kw => q.includes(kw));

  // Numeric monetary expressions (e.g. "5 lakh", "$5000", "10k", "₹500")
  const hasMonetary = /(\d+\s*(lakh|lac|k|m|cr|crore|USD|INR|₹|\$))/i.test(q) ||
                      /(\$|₹)\s*\d+/i.test(q);

  // Active business context matching
  let matchesIdea = false;
  if (idea) {
    const titleTerms = idea.title.toLowerCase().split(/\s+/).filter(w => w.length > 2);
    const catTerms = idea.category.toLowerCase().split(/\s+/).filter(w => w.length > 2);
    matchesIdea = titleTerms.some(term => q.includes(term)) ||
                  catTerms.some(term => q.includes(term));
  }

  return hasKeyword || hasMonetary || matchesIdea;
}

export async function generateCopilotResponse(
  query: string,
  idea: BusinessIdea | null,
  currency: CurrencyCode = 'INR',
  mode: 'general' | 'business' = 'business'
): Promise<CopilotResponse> {
  const q = query.toLowerCase().trim();

  // 1. Strict validation: Do not generate report for invalid/random/off-topic inputs
  if (isInvalidInput(query) || !isBusinessQuery(query, idea)) {
    return {
      text: 'invalid input',
      isClarification: true
    };
  }

  // 2. Route to report generators if valid
  try {
    const res = await fetch('/api/copilot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: query, idea, currency, mode })
    });

    if (res.ok) {
      const data = await res.json();
      if (data.report) {
         return { report: data.report };
      }
      if (data.text) {
         return { text: data.text };
      }
    }
  } catch (err) {
    console.error('AI Copilot request failed, falling back to static engine', err);
  }

  // Fallback to static rules
  if (mode === 'general' || !idea) {
    return { report: generateGeneralCopilotResponse(q, currency) };
  }

  return { report: generateSpecificCopilotResponse(q, idea, currency) };
}

function generateSpecificCopilotResponse(
  q: string,
  idea: BusinessIdea,
  currency: CurrencyCode
): CopilotReport {

  // ==========================================
  // MODE 2 — BUSINESS CONTEXT ADVISOR (Specific Idea)
  // ==========================================

  // 1. Investment / Financial / Profit / Break-even queries
  if (
    q.includes('investment') ||
    q.includes('cost') ||
    q.includes('financial') ||
    q.includes('profit') ||
    q.includes('margin') ||
    q.includes('break-even') ||
    q.includes('breakeven') ||
    q.includes('roi') ||
    q.includes('expense') ||
    q.includes('pricing')
  ) {
    const estProfitUSD = idea.estimatedMonthlyRevenueUSD * (idea.profitMarginPercent / 100);
    return {
      summary: `Comprehensive financial feasibility report for starting ${idea.title}. This business model operates at an estimated ${idea.profitMarginPercent}% net profit margin with a break-even projection of ${idea.breakEvenMonth} months.`,
      recommendations: [
        `Secure an initial capital pool of ${formatCurrency(idea.initialCapitalUSD, currency)} covering physical setup and initial batch inventory.`,
        `Maintain a 3-month working capital reserve of ${formatCurrency(idea.monthlyOpExUSD * 3, currency)} to safeguard against early operational cash flow gaps.`,
        `Focus early sales efforts on high-margin channels to achieve monthly revenue of ${formatCurrency(idea.estimatedMonthlyRevenueUSD, currency)}.`
      ],
      estimatedCost: {
        title: `Financial Capital & Operating Breakdown (${currency})`,
        items: [
          { label: 'Initial CapEx (Setup & Equipment)', value: formatCurrency(idea.initialCapitalUSD, currency), note: 'One-time initial investment' },
          { label: 'Est. Monthly OpEx (Rent, Utilities, Payroll)', value: formatCurrency(idea.monthlyOpExUSD, currency), note: 'Recurring monthly expense' },
          { label: 'Est. Monthly Target Revenue', value: formatCurrency(idea.estimatedMonthlyRevenueUSD, currency), note: 'Target sales capacity' },
          { label: 'Est. Monthly Net Profit', value: formatCurrency(estProfitUSD, currency), note: `Based on ${idea.profitMarginPercent}% margin` },
          { label: 'Expected 12-Month ROI', value: `+${idea.roiPercentage12M}%`, note: 'Projected 1-year ROI' },
          { label: 'Break-Even Period', value: `${idea.breakEvenMonth} Months`, note: 'Months to operational payback' }
        ]
      },
      nextSteps: [
        'Open a dedicated Business Current Bank Account to track capital inflows.',
        'Finalize machinery equipment quotes and negotiate 15-20% advance terms.',
        'Apply for MSME/Udyam schemes for potential interest subvention on capital loans.'
      ],
      tips: [
        'Buffer 10-15% extra contingency on CapEx for site electrical/civil preparation.',
        'Reinvest early profits into inventory buildup during peak demand cycles.'
      ],
      importantNotes: [
        'Operating expenses assume 80% line utilization rate during initial 90 days.',
        'Tax rates depend on GST classification (typically 12%-18% GST).'
      ]
    };
  }

  // 2. Suppliers / Machinery / Vendor / Equipment / Materials
  if (
    q.includes('supplier') ||
    q.includes('machinery') ||
    q.includes('vendor') ||
    q.includes('equipment') ||
    q.includes('material') ||
    q.includes('machine') ||
    q.includes('moq')
  ) {
    const machines = idea.machines || [];
    const suppliers = idea.suppliers || [];
    const totalMachineCost = machines.reduce((sum, m) => sum + m.estimatedCostUSD, 0);

    const machineCostItems = machines.slice(0, 4).map(m => ({
      label: m.name,
      value: formatCurrency(m.estimatedCostUSD, currency),
      note: `${m.essentialLevel} • ${m.purpose}`
    }));

    if (machineCostItems.length === 0) {
      machineCostItems.push({
        label: 'Core Commercial Production Line',
        value: formatCurrency(idea.initialCapitalUSD * 0.55, currency),
        note: 'Primary automated machinery setup'
      });
    }

    return {
      summary: `Procurement & Machinery Sourcing Brief for ${idea.title}. High-volume consistency requires certified industrial machinery paired with verified raw material suppliers.`,
      recommendations: [
        `Source core production equipment from certified OEMs with on-site installation and 1-year AMC warranty.`,
        `Establish primary and secondary raw material supplier contracts to prevent supply chain bottlenecks.`,
        `Negotiate minimum order quantities (MOQs) with regional vendors for bulk batch discounts.`
      ],
      estimatedCost: {
        title: `Key Equipment & Sourcing Estimates (${currency})`,
        items: [
          ...machineCostItems,
          {
            label: 'Total Machinery Budget',
            value: formatCurrency(totalMachineCost > 0 ? totalMachineCost : idea.initialCapitalUSD * 0.55, currency),
            note: 'Estimated machinery setup cost'
          },
          {
            label: 'Monthly Raw Material Est.',
            value: formatCurrency(idea.monthlyOpExUSD * 0.4, currency),
            note: 'Estimated monthly material intake'
          }
        ]
      },
      nextSteps: [
        `Request formal Quotations & Technical Data Sheets (TDS) from top shortlisted suppliers${suppliers.length > 0 ? `: ${suppliers.map(s => s.companyName).join(', ')}` : ''}.`,
        'Inspect sample batches and test material grade durability before issuing full purchase order.',
        'Ensure factory floor has appropriate 3-phase power supply and ventilation for machinery.'
      ],
      tips: [
        'Always request factory acceptance testing (FAT) before releasing final machinery payment.',
        'Stock a 2-week safety reserve of critical wear-and-tear replacement spare parts.'
      ],
      importantNotes: [
        'Machinery lead times typically range between 14 to 30 days depending on custom tooling requirements.',
        'Check if machinery qualifies for government technology upgrade subsidies.'
      ]
    };
  }

  // 3. Roadmap / How to start / Starting steps / Launch checklist
  if (
    q.includes('start') ||
    q.includes('roadmap') ||
    q.includes('process') ||
    q.includes('first') ||
    q.includes('how to') ||
    q.includes('checklist') ||
    q.includes('timeline') ||
    q.includes('steps')
  ) {
    const tasks = idea.launchTasks || [];
    return {
      summary: `Execution Roadmap & Launch Strategy for ${idea.title}. Recommended launch timeline is approximately ${idea.launchTimelineMonths || 4} months across 4 distinct operational phases.`,
      recommendations: [
        'Phase 1 (Month 1): Complete entity registration, legal licensing, and finalize factory premises lease.',
        'Phase 2 (Month 2): Order machinery, execute supplier agreements, and complete site electrical/civil setup.',
        'Phase 3 (Month 3): Install machinery, perform trial calibration runs, and obtain health/safety clearances.',
        'Phase 4 (Month 4+): Initiate soft launch, send sample kits to B2B clients, and scale digital campaigns.'
      ],
      estimatedCost: {
        title: `Phased Capital Rollout (${currency})`,
        items: [
          { label: 'Phase 1: Planning & Legal', value: formatCurrency(idea.initialCapitalUSD * 0.1, currency), note: 'Entity, licenses, site deposit' },
          { label: 'Phase 2: Setup & Machinery', value: formatCurrency(idea.initialCapitalUSD * 0.65, currency), note: 'Equipment & raw materials' },
          { label: 'Phase 3: Testing & Trial Runs', value: formatCurrency(idea.initialCapitalUSD * 0.15, currency), note: 'Calibrations & staffing' },
          { label: 'Phase 4: Launch & Scaling', value: formatCurrency(idea.initialCapitalUSD * 0.1, currency), note: 'Initial marketing & outreach' }
        ]
      },
      nextSteps: [
        tasks[0] ? tasks[0].title : 'Register legal business entity (Pvt Ltd / LLP / OPC).',
        tasks[1] ? tasks[1].title : 'Finalize location/commercial lease agreement.',
        tasks[2] ? tasks[2].title : 'Issue advance payment for primary machinery.'
      ],
      tips: [
        'Run utility connection applications simultaneously with site leasing to save 3-4 weeks.',
        'Maintain a digital Kanban launch board to track weekly task dependencies.'
      ],
      importantNotes: [
        'Do not skip trial batch testing; quality variations in early orders can harm customer retention.',
        'Total estimated launch window: ' + (idea.launchTimelineMonths || 4) + ' months.'
      ]
    };
  }

  // 4. Legal / License / GST / FSSAI / Compliance / MSME / Trademark
  if (
    q.includes('legal') ||
    q.includes('license') ||
    q.includes('licence') ||
    q.includes('gst') ||
    q.includes('fssai') ||
    q.includes('msme') ||
    q.includes('trademark') ||
    q.includes('compliance') ||
    q.includes('registration')
  ) {
    const licenses = idea.licenses || [];
    const licenseItems = licenses.slice(0, 4).map(l => ({
      label: l.title,
      value: formatCurrency(l.estimatedCostUSD, currency),
      note: `${l.mandatory ? 'Mandatory' : 'Recommended'} • Authority: ${l.issuingAuthority}`
    }));

    if (licenseItems.length === 0) {
      licenseItems.push(
        { label: 'MSME / Udyam Registration', value: 'Free / Nominal', note: 'Central Govt portal for small business' },
        { label: 'GST Registration', value: formatCurrency(50, currency), note: 'Tax Identification Number' }
      );
    }

    return {
      summary: `Regulatory Compliance & Licensing Brief for ${idea.title}. Compliance ensures smooth commercial operations and opens eligibility for government tenders and bank financing.`,
      recommendations: [
        `Register as an MSME (Udyam) to unlock priority sector lending and government subsidies.`,
        `Obtain GST Registration under ${idea.gstTaxRate || 'applicable commercial tax codes'}.`,
        `File for Brand Name Trademark Protection under ${idea.trademarkClass || 'Class 35 / Class 7'}.`,
        ...(idea.category === 'FMCG & Consumer Products' || q.includes('fssai') ? ['Obtain FSSAI Food Safety License prior to commercial production & packaging.'] : [])
      ],
      estimatedCost: {
        title: `Estimated Regulatory & Legal Costs (${currency})`,
        items: [
          ...licenseItems,
          { label: 'Tax Classification', value: idea.gstTaxRate || '18% GST', note: 'Standard commercial slab' },
          { label: 'Trademark Class', value: idea.trademarkClass || 'Class 35 / Class 7', note: 'Brand protection class' }
        ]
      },
      nextSteps: [
        'Engage a qualified Chartered Accountant (CA) or Legal Advisor for company incorporation.',
        'Apply for Udyam MSME certificate online (requires Aadhaar & PAN).',
        'Prepare Factory Fire & Safety clearance documents for local municipal approval.'
      ],
      tips: [
        'MSME registered units receive 50% discount on official Government Trademark filing fees.',
        'Maintain digital copies of all license approvals in a secure cloud repository for annual renewal tracking.'
      ],
      importantNotes: [
        'Operating without mandatory licenses can lead to penalties or operational shutdown notices.',
        'Ensure the registered company name matches the current account and GST records exactly.'
      ]
    };
  }

  // 5. Marketing / Selling / Instagram / Amazon / Export
  if (
    q.includes('market') ||
    q.includes('sell') ||
    q.includes('instagram') ||
    q.includes('amazon') ||
    q.includes('export') ||
    q.includes('channel') ||
    q.includes('customer') ||
    q.includes('audience') ||
    q.includes('strategy')
  ) {
    const audience = idea.targetAudience?.join(' • ') || 'Target B2B and D2C clients';
    const channels = idea.primaryChannels?.join(' • ') || 'D2C E-commerce, B2B Wholesale, Social Ads';

    return {
      summary: `Go-To-Market & Revenue Growth Strategy for ${idea.title}. Growth relies on a blended model of direct-to-consumer digital channels and bulk B2B wholesale partnerships.`,
      recommendations: [
        `Target Core Audience: ${audience}.`,
        `Primary Sales Channels: ${channels}.`,
        `Offer free sample kits or trial discounts to first 50 regional B2B buyers.`,
        `Build brand credibility through video demonstrations showing product quality and manufacturing standards.`
      ],
      estimatedCost: {
        title: `Marketing & Customer Acquisition Metrics (${currency})`,
        items: [
          { label: 'Est. Monthly Ad Budget', value: formatCurrency(idea.monthlyOpExUSD * 0.18, currency), note: 'Digital Meta/Google Ads' },
          { label: 'Target CAC (Acquisition Cost)', value: formatCurrency(idea.cacUSD || 14, currency), note: 'Cost per acquired customer' },
          { label: 'Est. Customer LTV (Lifetime Value)', value: formatCurrency(idea.ltvUSD || 150, currency), note: 'Expected long term revenue' },
          { label: 'LTV to CAC Ratio', value: `${Math.round((idea.ltvUSD || 150) / (idea.cacUSD || 14))}x`, note: 'Healthy benchmark > 3x' }
        ]
      },
      nextSteps: [
        'Create professional brand assets (Logo, Product Catalog PDF, E-commerce Store).',
        'Launch Instagram & LinkedIn business pages with behind-the-scenes production videos.',
        'List products on Amazon Seller Central / IndiaMART for inbound B2B discovery.'
      ],
      tips: [
        'Short-form Instagram Reels showing automated factory machinery generate high engagement.',
        'Implement automated WhatsApp Business follow-ups for abandoned carts and B2B quote requests.'
      ],
      importantNotes: [
        'Keep marketing spend under 20% of total monthly operating revenue.',
        'Export opportunities exist in European and Middle Eastern markets for eco-certified products.'
      ]
    };
  }

  // 6. Brand Name / Logo / Tagline / Packaging
  if (
    q.includes('brand') ||
    q.includes('logo') ||
    q.includes('name') ||
    q.includes('tagline') ||
    q.includes('packaging') ||
    q.includes('identity')
  ) {
    const cleanTitle = idea.title.replace(/Manufacturing|Unit|Lab|Service|Roastery|Store/gi, '').trim();
    const taglines = idea.suggestedTaglines || [
      `Next-Generation ${cleanTitle} Solutions.`,
      `Quality. Innovation. Sustainability.`,
      `Engineered for Excellence, Built for Value.`
    ];

    return {
      summary: `Brand Identity & Product Positioning Blueprint for ${idea.title}. Positioning emphasizes ${idea.uniqueValueProp || 'premium quality, modern aesthetic, and customer trust'}.`,
      recommendations: [
        `Selected Unique Value Prop: "${idea.uniqueValueProp || 'High performance eco-friendly solutions with transparent sourcing.'}"`,
        `Choose a memorable, modern brand name that conveys quality and sustainability.`,
        `Adopt clean, minimalist packaging with eco-friendly certifications prominently displayed.`
      ],
      estimatedCost: {
        title: `Branding & Packaging Design Investment (${currency})`,
        items: [
          { label: 'Brand Identity (Logo & Style Guide)', value: formatCurrency(400, currency), note: 'Professional vector branding' },
          { label: 'Packaging Design & Mockups', value: formatCurrency(350, currency), note: 'Dieline & print-ready files' },
          { label: 'Trademark Search & Filing', value: formatCurrency(150, currency), note: 'Official filing fee' }
        ]
      },
      nextSteps: [
        `Test suggested brand names for domain availability (.com / .in):`,
        `1. ${cleanTitle} Crafted`,
        `2. Pure${cleanTitle.replace(/\s+/g, '')}`,
        `3. Next${cleanTitle.replace(/\s+/g, '')} Lab`,
        `4. ${cleanTitle} Essentials`,
        `5. Apex ${cleanTitle}`
      ],
      tips: [
        `Recommended Taglines: "${taglines.join('" | "')}"`,
        'Ensure the logo scales cleanly down to 32x32px for social media profile icons.'
      ],
      importantNotes: [
        'Verify brand name availability on IP India Trademark portal before printing bulk packaging.',
        'Include mandatory QR code on packaging linking to your digital catalog and certifications.'
      ]
    };
  }

  // 7. SWOT / Compare / Risk / Profitability / Trend
  if (
    q.includes('swot') ||
    q.includes('risk') ||
    q.includes('trend') ||
    q.includes('competitor') ||
    q.includes('compare') ||
    q.includes('future') ||
    q.includes('expansion') ||
    q.includes('opportunity')
  ) {
    const risks = idea.risks || [];
    const competitors = idea.competitors || [];

    return {
      summary: `Strategic SWOT & Market Risk Evaluation for ${idea.title}. Market demand is projected at ${idea.cagrGrowthRate || '12.5%'} CAGR with a Total Addressable Market (TAM) of ${idea.tamSize || '$2.5 Billion'}.`,
      recommendations: [
        `Strengths: ${idea.uniqueValueProp || 'Automated modern line with high gross margin potential.'}`,
        `Weaknesses: Initial capital intensity and machinery calibration learning curve.`,
        `Opportunities: Expanding consumer preference for sustainable, local, high-quality products.`,
        `Threats: Price competition from established legacy market players.`
      ],
      estimatedCost: {
        title: `Market & Financial Benchmarks (${currency})`,
        items: [
          { label: 'Total Addressable Market (TAM)', value: idea.tamSize || '$3.5B', note: 'Global industry market size' },
          { label: 'Serviceable Addressable Market (SAM)', value: idea.samSize || '$450M', note: 'Regional accessible market' },
          { label: 'Industry Growth Rate (CAGR)', value: idea.cagrGrowthRate || '14.2%', note: 'Annual market expansion' },
          { label: 'Est. 12-Month Net Profit Margin', value: `${idea.profitMarginPercent}%`, note: 'Expected operating efficiency' }
        ]
      },
      nextSteps: [
        `Benchmark product specifications against key competitors${competitors.length > 0 ? `: ${competitors.map(c => c.name).join(', ')}` : ''}.`,
        risks[0] ? `Implement risk mitigation: ${risks[0].mitigationStrategy}` : 'Set up a 15% emergency cash reserve to handle supply disruptions.',
        'Review regional distributor feedback every 60 days to refine product offerings.'
      ],
      tips: [
        'Differentiate through superior customer service and rapid turnaround times rather than discounting.',
        'Monitor monthly trend indices to adjust raw material purchasing ahead of price spikes.'
      ],
      importantNotes: [
        'Overall Feasibility Score: EXCELLENT (High market demand with clear ROI within 12 months).',
        'Always keep operational contracts non-exclusive in the first year to retain strategic flexibility.'
      ]
    };
  }

  // 8. Default fallback for business specific queries
  return {
    summary: `Business Advisory Dossier for ${idea.title}. Buildora AI Copilot has synthesized core operational, financial, and strategic parameters for this business.`,
    recommendations: [
      `Target Initial Investment: ${formatCurrency(idea.initialCapitalUSD, currency)} (CapEx) + ${formatCurrency(idea.monthlyOpExUSD * 3, currency)} working capital.`,
      `Target Monthly Revenue: ${formatCurrency(idea.estimatedMonthlyRevenueUSD, currency)} at a ${idea.profitMarginPercent}% net margin.`,
      `Unique Value Positioning: "${idea.uniqueValueProp || 'Premium quality, reliable supply chain, and competitive price point.'}"`,
      `Estimated Launch Timeline: ${idea.launchTimelineMonths || 4} months from planning to commercial launch.`
    ],
    estimatedCost: {
      title: `Core Financial Highlights (${currency})`,
      items: [
        { label: 'Initial CapEx Requirement', value: formatCurrency(idea.initialCapitalUSD, currency), note: 'One-time setup cost' },
        { label: 'Monthly OpEx', value: formatCurrency(idea.monthlyOpExUSD, currency), note: 'Operating overhead' },
        { label: 'Target Monthly Sales', value: formatCurrency(idea.estimatedMonthlyRevenueUSD, currency), note: 'Monthly gross sales' },
        { label: 'Projected 12M ROI', value: `+${idea.roiPercentage12M}%`, note: 'First year ROI' }
      ]
    },
    nextSteps: [
      'Review the step-by-step 7-tab roadmap on Buildora for detailed supplier and legal lists.',
      'Export the full execution dossier to share with investors or banking partners.',
      'Ask Buildora AI Copilot specific questions about Machinery, Suppliers, Legal, or Marketing.'
    ],
    tips: [
      'Click any suggestion chip below (e.g. Investment, Machinery, Legal) to get deep instant analysis.',
      'Switch currency preferences in the top navigation bar to view all numbers in INR or USD.'
    ],
    importantNotes: [
      `Active Business Context: ${idea.title} (${idea.category})`,
      'Data is based on verified feasibility benchmarks calibrated for Indian & global market conditions.'
    ]
  };
}

// ==========================================
// MODE 1 — GENERAL BUSINESS ADVISOR ENGINE
// ==========================================

function generateGeneralCopilotResponse(q: string, currency: CurrencyCode): CopilotReport {
  // 1. Capital / Budget / 5 lakh / 10 lakh / Low investment queries
  if (
    q.includes('5 lakh') ||
    q.includes('5lakh') ||
    q.includes('lakh') ||
    q.includes('budget') ||
    q.includes('low investment') ||
    q.includes('capital') ||
    q.includes('under') ||
    q.includes('invest')
  ) {
    return {
      summary: `General Startup Advisory: Capital Budget Analysis (~₹5 Lakh / $6,000 USD). Starting a business with ₹5 Lakh capital is highly viable across light manufacturing, FMCG processing, and service/tech ventures with 30-50% net profit margins.`,
      recommendations: [
        'Option 1: Paper Cup & Biodegradable Packaging (~₹4.5 - ₹5.5 Lakh setup, 32% net margin, 6-month payback).',
        'Option 2: Specialty Coffee Roastery & Dark Kitchen (~₹3.5 - ₹5 Lakh setup, 40% net margin, 5-month payback).',
        'Option 3: Solar Panel Cleaning & Maintenance Agency (~₹2.5 - ₹3.5 Lakh setup, 60% net margin, 3-month payback).',
        'Option 4: Cold-Pressed Organic Juice & Beverage Processing (~₹4 - ₹6 Lakh setup, 45% net margin, 5-month payback).'
      ],
      estimatedCost: {
        title: `Sample Capital Allocation for ₹5 Lakh Setup (${currency})`,
        items: [
          { label: 'Core Machinery / Equipment', value: formatCurrency(3200, currency), note: '~60% of total capital' },
          { label: 'Initial Raw Materials & Stock', value: formatCurrency(1000, currency), note: 'First batch inventory' },
          { label: 'Entity, GST & License Fees', value: formatCurrency(300, currency), note: 'Udyam, GST, FSSAI / Legal' },
          { label: 'Working Capital Reserve (2 Months)', value: formatCurrency(1500, currency), note: 'Rent, power, emergency' }
        ]
      },
      nextSteps: [
        'Browse Buildora\'s curated roadmaps to view complete machinery supplier lists for these options.',
        'Apply for Udyam MSME registration online (Free) to unlock Mudra & CGTMSE collateral-free loans.',
        'Conduct a 3-mile radius competitor pricing survey before finalizing your product offer.'
      ],
      tips: [
        'Prioritize B2B clients (wholesale traders, corporate offices) for consistent weekly cash flow.',
        'Keep lease security deposits low by negotiating short-term commercial agreements.'
      ],
      importantNotes: [
        'Mode: General Business Advisor.',
        'Mudra Tarun/Kishore loans offer up to ₹10 Lakh collateral-free capital for eligible startups.'
      ]
    };
  }

  // 2. Trending / Manufacturing Ideas
  if (
    q.includes('trending') ||
    q.includes('manufacturing') ||
    q.includes('manufacture') ||
    q.includes('factory') ||
    q.includes('production') ||
    q.includes('product ideas') ||
    q.includes('ideas')
  ) {
    return {
      summary: `General Business Advisory: Top Trending Manufacturing & High-Demand Business Ideas for 2026. Driven by sustainability mandates, urbanization, and automated micro-factories.`,
      recommendations: [
        '1. Paper Cup & Eco Packaging Manufacturing: Banning single-use plastics has created a massive 18.5% annual demand surge.',
        '2. Cold-Pressed Juice & Herbal Beverage Processing: High consumer trend toward clean-label organic wellness drinks.',
        '3. Spices & Organic Food Processing: Staple daily consumption with strong domestic and export margins (35%+).',
        '4. Specialty Coffee Roasting & D2C Brands: Premium artisanal coffee consumption growing at 22% CAGR.'
      ],
      estimatedCost: {
        title: `Industry Benchmark Comparison (${currency})`,
        items: [
          { label: 'Paper Cup Manufacturing', value: '₹5L - ₹8L CapEx', note: '32% Margin • 6M Payback' },
          { label: 'Cold-Pressed Juice Unit', value: '₹4L - ₹7L CapEx', note: '45% Margin • 5M Payback' },
          { label: 'Organic Spices Unit', value: '₹3L - ₹6L CapEx', note: '38% Margin • 4M Payback' },
          { label: 'Specialty Coffee Roastery', value: '₹4L - ₹8L CapEx', note: '42% Margin • 5M Payback' }
        ]
      },
      nextSteps: [
        'Select any business idea on Buildora to generate its full 7-step execution roadmap.',
        'Evaluate local raw material availability and 3-phase industrial power infrastructure.',
        'Request quotes from 3 OEM machinery suppliers listed in Buildora roadmaps.'
      ],
      tips: [
        'Automated semi-robotic machinery drastically reduces labor dependence and wastage.',
        'Exporting eco-certified products to Middle East & EU commands 2x-3x higher price premiums.'
      ],
      importantNotes: [
        'Mode: General Business Advisor.',
        'Government subsidies (PMEGP, MSME schemes) offer 15-35% capital subsidy on manufacturing projects.'
      ]
    };
  }

  // 3. High Profit / Highest ROI
  if (
    q.includes('profit') ||
    q.includes('roi') ||
    q.includes('highest') ||
    q.includes('margin') ||
    q.includes('return')
  ) {
    return {
      summary: `General Business Advisory: High-ROI Business Sectors. The highest return-on-investment ventures balance fast payback timelines (<6 months) with strong net margins (30-60%).`,
      recommendations: [
        'Service & B2B Tech Agencies: 50-70% net margins (e.g. Solar Maintenance, Industrial Equipment AMC).',
        'Specialty Beverage & D2C Brands: 40-50% net margins (e.g. Cold-Pressed Juice, Artisan Coffee).',
        'Micro-Manufacturing: 30-40% net margins (e.g. Paper Packaging, Bio-Cutlery, Spices).'
      ],
      estimatedCost: {
        title: `High-ROI Financial Benchmarks (${currency})`,
        items: [
          { label: 'Solar Maintenance Agency', value: '60% Net Margin', note: '3-Month Break-Even' },
          { label: 'Cold-Pressed Organic Juice', value: '45% Net Margin', note: '5-Month Break-Even' },
          { label: 'Artisan Coffee Roastery', value: '42% Net Margin', note: '5-Month Break-Even' },
          { label: 'Paper Cup Manufacturing', value: '32% Net Margin', note: '6-Month Break-Even' }
        ]
      },
      nextSteps: [
        'Review the financial calculator tabs inside Buildora roadmaps for detailed unit economics.',
        'Target B2B recurring subscription contracts to stabilize cash flows from Month 1.',
        'Set aside 15% of net profits for reinvestment into production capacity.'
      ],
      tips: [
        'Direct-to-Consumer (D2C) online sales eliminate distributor cuts, increasing gross margins by 20%.',
        'Pre-sell monthly supply contracts to office parks and hotel chains before launch.'
      ],
      importantNotes: [
        'Mode: General Business Advisor.',
        'ROI calculations account for machinery depreciation and working capital buffers.'
      ]
    };
  }

  // 4. Export / Easiest to Export
  if (
    q.includes('export') ||
    q.includes('global') ||
    q.includes('foreign') ||
    q.includes('overseas') ||
    q.includes('ship')
  ) {
    return {
      summary: `General Business Advisory: Top Export-Oriented Business Opportunities. Exporting leverages high foreign currency margins with zero domestic GST burden via Duty Drawback.`,
      recommendations: [
        '1. Organic Spices & Herbal Extracts: India dominates 70% of global spice supply. High international demand.',
        '2. Jute, Cotton & Eco Packaging: Duty-free import incentives in US, UAE, and EU markets.',
        '3. Artisanal Coffee & Tea: Premium specialty packaging sells at $25-$40/kg in overseas retail.',
        '4. Bio-degradable Cutlery: Strict EU packaging laws create high B2B import demand.'
      ],
      estimatedCost: {
        title: `Export Setup & License Requirements (${currency})`,
        items: [
          { label: 'IEC Code (Import Export Code)', value: formatCurrency(50, currency), note: 'DGFT Portal Lifetime License' },
          { label: 'RCMB (Spices Board / APEDA)', value: formatCurrency(150, currency), note: 'Export Promotion Council' },
          { label: 'GST LUT (Letter of Undertaking)', value: 'Free', note: 'Allows tax-free exports' },
          { label: 'Customs Freight & Port Clearance', value: formatCurrency(400, currency), note: 'Per LCL shipment estimate' }
        ]
      },
      nextSteps: [
        'Register for an IEC (Import Export Code) on the official DGFT portal.',
        'Create product listings on Alibaba, IndiaMART, and international B2B directories.',
        'Partner with DHL / FedEx / Sea Freight aggregators for door-to-door logistics.'
      ],
      tips: [
        'Always secure Export Credit Guarantee Corporation (ECGC) insurance to protect against buyer payment default.',
        'Provide certified lab test reports (SGS / Eurofins) with every international shipment.'
      ],
      importantNotes: [
        'Mode: General Business Advisor.',
        'Government RoDTEP scheme refunds embedded taxes on exported goods.'
      ]
    };
  }

  // 5. Sustainable / Eco-friendly / AI
  if (
    q.includes('sustainable') ||
    q.includes('eco') ||
    q.includes('green') ||
    q.includes('ai') ||
    q.includes('tech')
  ) {
    return {
      summary: `General Business Advisory: Sustainable & Tech-Enabled Businesses. Green initiatives and AI productivity tools are receiving high investor interest and government grants.`,
      recommendations: [
        'Paper & Bio-Packaging Units: Replacing single-use plastic with biodegradable paper products.',
        'Solar Operation & Cleaning: High-recurring maintenance services for residential and commercial solar rooftops.',
        'AI SME Workflow Automation: Helping local businesses automate inventory, invoicing, and customer support.',
        'Organic Food & Cold-Pressed Processing: Zero-chemical food manufacturing with eco-packaging.'
      ],
      estimatedCost: {
        title: `Sustainable Business Metrics (${currency})`,
        items: [
          { label: 'Eco Packaging Manufacturing', value: '18.5% Market Growth', note: 'High B2B replacement demand' },
          { label: 'Solar Maintenance Agency', value: '25.4% Market Growth', note: 'Recurring service contract model' },
          { label: 'AI Workflow Agency', value: '35.0% Market Growth', note: 'Zero heavy machinery CapEx' }
        ]
      },
      nextSteps: [
        'Select any sustainable idea in Buildora to explore full supplier contacts and licenses.',
        'Apply for ESG (Environmental, Social, Governance) compliance certifications.',
        'Inquire about green technology subsidies at regional MSME development centers.'
      ],
      tips: [
        'Highlight eco-friendly certifications prominently on product packaging to justify a 15-20% price premium.',
        'Offer zero-waste recycling programs for commercial clients.'
      ],
      importantNotes: [
        'Mode: General Business Advisor.',
        'Many banks offer reduced interest rates for eco-certified green business projects.'
      ]
    };
  }

  // 6. Default General Entrepreneurship Response
  return {
    summary: `Buildora AI Business Advisor. I can help you find profitable business ideas, compare industries, estimate startup costs, suggest machinery, recommend suppliers, explain legal licenses, and build step-by-step business roadmaps.`,
    recommendations: [
      'Find Business Ideas: Ask me about trending manufacturing, low investment, or high-profit sectors.',
      'Estimate Costs: Ask me about initial CapEx, working capital, or machinery budgets for any industry.',
      'Explore Roadmaps: Click on any business idea on Buildora to open its dedicated step-by-step roadmap.',
      'Legal & Compliance: Ask me about Udyam MSME, GST rates, FSSAI, or Trademark registrations.'
    ],
    estimatedCost: {
      title: `General Startup Cost Averages (${currency})`,
      items: [
        { label: 'Micro Business / Service', value: formatCurrency(2000, currency), note: 'Low investment setup' },
        { label: 'Small Manufacturing Unit', value: formatCurrency(6000, currency), note: 'Automated line & machinery' },
        { label: 'Commercial FMCG Unit', value: formatCurrency(10000, currency), note: 'High volume production' },
        { label: 'Average Payback Period', value: '4 to 8 Months', note: 'Standard break-even horizon' }
      ]
    },
    nextSteps: [
      'Type any question below like "What business can I start with ₹5 lakh?" or "Suggest trending manufacturing businesses".',
      'Or open any roadmap from the Browse Ideas page to get business-specific advisor responses.',
      'Use quick suggestion chips below to explore popular startup topics instantly.'
    ],
    tips: [
      'Switch between General Mode and Business Context Mode anytime by navigating between the home/ideas pages and specific roadmaps.',
      'Export any chat report as a clean PDF for bank or investor presentations.'
    ],
    importantNotes: [
      'Mode: General Business Advisor.',
      'All estimates are calibrated using real industry benchmarks and updated market rates.'
    ]
  };
}
