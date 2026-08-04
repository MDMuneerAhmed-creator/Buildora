export type BusinessCategory =
  | 'Manufacturing'
  | 'FMCG & Consumer Products'
  | 'Agro-Tech & Organic'
  | 'Green Tech & Clean Energy'
  | 'Hardware & Electronics'
  | 'Artisanal & Crafts'
  | 'Services & Franchise';

export type ComplexityLevel = 'Low' | 'Medium' | 'High';

export interface MachineRequirement {
  id: string;
  name: string;
  purpose: string;
  estimatedCostUSD: number;
  specifications: string;
  essentialLevel: 'Mandatory' | 'Optional' | 'Phase 2';
}

export interface RawMaterial {
  id: string;
  name: string;
  unit: string;
  unitCostUSD: number;
  monthlyQuantityNeeded: number;
  supplierLocation: string;
}

export interface Supplier {
  id: string;
  companyName: string;
  location: string;
  rating: number;
  moq: string; // Minimum Order Quantity
  leadTimeDays: number;
  contactEmailMock: string;
  certified: boolean;
}

export interface Competitor {
  name: string;
  marketShare: string;
  strengths: string;
  weaknesses: string;
  pricePoint: 'Budget' | 'Mid-tier' | 'Premium';
}

export interface LicenseRequirement {
  title: string;
  issuingAuthority: string;
  estimatedCostUSD: number;
  timelineDays: number;
  description: string;
  mandatory: boolean;
}

export interface LaunchTask {
  id: string;
  title: string;
  phase: 'Phase 1: Planning' | 'Phase 2: Setup & Procurement' | 'Phase 3: Testing & Licensing' | 'Phase 4: Launch & Scale';
  week: number;
  category: 'Operations' | 'Legal' | 'Marketing' | 'Financial';
  completed: boolean;
}

export interface RiskFactor {
  category: 'Operational' | 'Market & Revenue' | 'Supply Chain' | 'Regulatory';
  title: string;
  severity: 'Low' | 'Medium' | 'High';
  description: string;
  mitigationStrategy: string;
}

export interface MonthlyFinancialPoint {
  month: string;
  revenueUSD: number;
  expensesUSD: number;
  netProfitUSD: number;
}

export interface BusinessIdea {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  category: BusinessCategory;
  shortDescription: string;
  complexity: ComplexityLevel;
  
  // Financial Highlights
  initialCapitalUSD: number; // CapEx
  monthlyOpExUSD: number;
  estimatedMonthlyRevenueUSD: number;
  breakEvenMonth: number;
  roiPercentage12M: number;
  profitMarginPercent: number;
  
  // Overview
  targetAudience: string[];
  uniqueValueProp: string;
  industryTrends: string[];

  // Market Metrics
  tamSize: string; // Total Addressable Market
  samSize: string;
  somSize: string;
  cagrGrowthRate: string;
  demandTrendData: { year: string; index: number }[];
  competitors: Competitor[];

  // Operations
  machines: MachineRequirement[];
  rawMaterials: RawMaterial[];
  suppliers: Supplier[];
  packagingDetails: {
    materialType: string;
    costPerUnitUSD: number;
    sustainabilityGrade: 'A+' | 'A' | 'B';
    notes: string;
  };

  // Compliance
  licenses: LicenseRequirement[];
  gstTaxRate: string; // e.g., "18% GST (HSN 3401)"
  trademarkClass: string; // e.g., "Class 3 - Bleaching preparations and soaps"

  // Marketing & Sales
  primaryChannels: string[];
  launchTactics: string[];
  suggestedTaglines: string[];
  cacUSD: number;
  ltvUSD: number;

  // Timeline & Tasks
  launchTimelineMonths: number;
  launchTasks: LaunchTask[];

  // Risk & Growth
  risks: RiskFactor[];
  growthMilestones: {
    phase: string;
    timeline: string;
    objective: string;
  }[];

  // Financial chart breakdown
  monthlyFinancialProjections: MonthlyFinancialPoint[];
}

export interface SavedRoadmapState {
  ideaId: string;
  savedAt: string;
  completedTasks: string[]; // Task IDs
  notes?: string;
  customUnitVolume?: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  password?: string;
  phoneNumber?: string;
  university?: string;
  occupation?: string;
  location?: string;
  bio?: string;
  preferredCategory?: BusinessCategory | string;
  currency?: 'INR' | 'USD' | 'EUR' | 'GBP';
  language?: string;
  avatarUrl?: string;
  joinedDate: string;
  isGuest?: boolean;
}

