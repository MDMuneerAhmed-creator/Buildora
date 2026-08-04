import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

function isInvalidInput(query: string): boolean {
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

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini
  let ai: GoogleGenAI | null = null;
  const geminiKey = process.env.GEMINI_API_KEY;
  if (geminiKey) {
    ai = new GoogleGenAI({
      apiKey: geminiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  app.post('/api/copilot', async (req, res) => {
    try {
      if (!ai) {
        return res.status(503).json({ error: 'Gemini API is not configured' });
      }

      const { prompt } = req.body;
      if (!prompt || typeof prompt !== 'string' || isInvalidInput(prompt)) {
        return res.json({ text: 'invalid input' });
      }

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: [{
          role: 'user',
          parts: [{ text: `You are BusinessPilot AI Copilot, a senior business advisor.
The user prompt is: "${prompt.trim()}"

CRITICAL INSTRUCTION:
Check if the user prompt is invalid input, keyboard mashing (e.g. "vljn ;dbn", "asdfgh"), random letters/characters, meaningless gibberish, or non-business nonsense.
If it IS invalid input or gibberish, reply strictly and exclusively with:
invalid input

Otherwise, answer the user's entrepreneurship question concisely.` }]
        }],
        config: {
          temperature: 0.1,
        }
      });

      if (!response.text) {
        throw new Error('No text returned from Gemini');
      }

      const text = response.text.trim();
      if (text.toLowerCase() === 'invalid input' || text.toLowerCase().includes('invalid input')) {
        return res.json({ text: 'invalid input' });
      }

      res.json({ text });

    } catch (error: any) {
      console.error('Gemini API Error:', error);
      const isQuotaError = error?.message?.includes('429') || error?.message?.includes('quota') || error?.status === 429;
      if (isQuotaError) {
        return res.status(429).json({ error: 'Gemini API quota exceeded. Please wait a moment and try again.' });
      }
      res.status(500).json({ error: error.message || 'Failed to generate response' });
    }
  });


  app.post('/api/generate-roadmap', async (req, res) => {
    try {
      if (!ai) {
        return res.status(503).json({ error: 'Gemini API is not configured' });
      }

      const { query } = req.body;
      if (!query || query.trim().length < 3 || isInvalidInput(query)) {
        return res.status(400).json({ error: 'invalid input' });
      }

      const prompt = `
You are an expert business planner and market analyst. 
The user wants to generate a business roadmap for the following idea: "${query}"

1. Validate the idea. If it's gibberish, random letters/characters or unknown abbreviations (like 'svs', 'asdfgh', 'xyz'), just numbers, or generally meaningless and not a real business, product, service, or industry, return exactly this JSON: {"error": "invalid input"}
2. If it is a valid business idea, generate a complete business roadmap adhering EXACTLY to the following TypeScript interface (do not include the interface in the output, just the JSON data that matches it). 
Provide realistic, professional, and well-researched numbers and data. DO NOT hallucinate fake company names for competitors, use real ones or realistic general types.

export interface BusinessIdea {
  id: string; // generate a unique slug, e.g., 'custom-bakery'
  title: string;
  slug: string; // same as id
  tagline: string;
  category: 'Manufacturing' | 'FMCG & Consumer Products' | 'Agro-Tech & Organic' | 'Green Tech & Clean Energy' | 'Hardware & Electronics' | 'Artisanal & Crafts' | 'Services & Franchise';
  shortDescription: string;
  complexity: 'Low' | 'Medium' | 'High';
  
  initialCapitalUSD: number;
  monthlyOpExUSD: number;
  estimatedMonthlyRevenueUSD: number;
  breakEvenMonth: number;
  roiPercentage12M: number;
  profitMarginPercent: number;
  
  targetAudience: string[];
  uniqueValueProp: string;
  industryTrends: string[];

  tamSize: string;
  samSize: string;
  somSize: string;
  cagrGrowthRate: string;
  demandTrendData: { year: string; index: number }[]; // 5 items
  competitors: { name: string; marketShare: string; strengths: string; weaknesses: string; pricePoint: 'Budget' | 'Mid-tier' | 'Premium' }[];

  machines: { id: string; name: string; purpose: string; estimatedCostUSD: number; specifications: string; essentialLevel: 'Mandatory' | 'Optional' | 'Phase 2' }[];
  rawMaterials: { id: string; name: string; unit: string; unitCostUSD: number; monthlyQuantityNeeded: number; supplierLocation: string }[];
  suppliers: { id: string; companyName: string; location: string; rating: number; moq: string; leadTimeDays: number; contactEmailMock: string; certified: boolean }[];
  packagingDetails: { materialType: string; costPerUnitUSD: number; sustainabilityGrade: 'A+' | 'A' | 'B'; notes: string };

  licenses: { title: string; issuingAuthority: string; estimatedCostUSD: number; timelineDays: number; description: string; mandatory: boolean }[];
  gstTaxRate: string;
  trademarkClass: string;

  primaryChannels: string[];
  launchTactics: string[];
  suggestedTaglines: string[];
  cacUSD: number;
  ltvUSD: number;

  launchTimelineMonths: number;
  launchTasks: { id: string; title: string; phase: 'Phase 1: Planning' | 'Phase 2: Setup & Procurement' | 'Phase 3: Testing & Licensing' | 'Phase 4: Launch & Scale'; week: number; category: 'Operations' | 'Legal' | 'Marketing' | 'Financial'; completed: boolean }[];

  risks: { category: 'Operational' | 'Market & Revenue' | 'Supply Chain' | 'Regulatory'; title: string; severity: 'Low' | 'Medium' | 'High'; description: string; mitigationStrategy: string }[];
  growthMilestones: { phase: string; timeline: string; objective: string }[];

  monthlyFinancialProjections: { month: string; revenueUSD: number; expensesUSD: number; netProfitUSD: number }[]; // 6 to 12 items
}

Return ONLY valid JSON.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: [{
          role: 'user',
          parts: [{ text: prompt }]
        }],
        config: {
          temperature: 0.1,
          responseMimeType: "application/json"
        }
      });

      if (!response.text) {
        throw new Error('No text returned from Gemini');
      }

      const data = JSON.parse(response.text);
      if (data.error) {
        return res.status(400).json({ error: data.error });
      }

      res.json(data);

    } catch (error: any) {
      console.error('Gemini Generate Roadmap Error:', error);
      const isQuotaError = error?.message?.includes('429') || error?.message?.includes('quota') || error?.status === 429;
      if (isQuotaError) {
        return res.status(429).json({ error: 'Gemini API quota reached. Please wait a few seconds and try again.' });
      }
      res.status(500).json({ error: error.message || 'Failed to generate roadmap' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { 
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR !== 'true'
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
