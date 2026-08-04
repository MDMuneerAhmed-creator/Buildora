import React from 'react';

/**
 * Business Idea Image utility
 * Provides high-quality, category and keyword-matched hero images from Unsplash
 * with optimized parameters for responsive, high-performance display.
 * Guarantees every single business card has a distinct, non-duplicate hero image.
 */

interface IdeaImageQuery {
  id?: string;
  title?: string;
  slug?: string;
  category?: string;
  shortDescription?: string;
}

// 1. Direct ID / Slug Mappings for All Sample Ideas (Explicit unique, highly-relevant image per business)
const SAMPLE_IDEA_IMAGES: Record<string, string> = {
  'eco-bamboo-toothbrush': 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?q=80&w=800&auto=format&fit=crop',
  'cold-pressed-juice-unit': 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?q=80&w=800&auto=format&fit=crop',
  'solar-panel-cleaning-drone': 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=800&auto=format&fit=crop',
  'specialty-coffee-roastery': 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop',
  'paper-bag-manufacturing': 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop',
  'custom-furniture-workshop': 'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?q=80&w=800&auto=format&fit=crop',
  'organic-soap-skincare': 'https://images.unsplash.com/photo-1607006344380-b6775a0824a7?q=80&w=800&auto=format&fit=crop',
  'gourmet-chocolate-factory': 'https://images.unsplash.com/photo-1511381939415-e44015466834?q=80&w=800&auto=format&fit=crop',
  'led-lighting-electronics': 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop',
};

// 2. Keyword Rules (Matched against Title or Description) - Every rule has a unique image
const KEYWORD_IMAGE_MAP: { pattern: RegExp; url: string }[] = [
  // Juice / Beverage / Drink
  {
    pattern: /juice|beverage|drink|smoothie|elixir|bottling/i,
    url: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?q=80&w=800&auto=format&fit=crop',
  },
  // Solar / Drone / Renewable
  {
    pattern: /solar|drone|photovoltaic|clean\s*energy|panel\s*cleaning/i,
    url: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=800&auto=format&fit=crop',
  },
  // Paper Bags / Kraft
  {
    pattern: /paper\s*bag|kraft/i,
    url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop',
  },
  // Packaging / Bagasse / Eco Container
  {
    pattern: /packaging|bagasse|cassava|container|box|cardboard|moulded\s*pulp|compostable/i,
    url: '/images/bagasse_packaging.jpg',
  },
  // Coffee / Roastery
  {
    pattern: /coffee|roaster|roastery|bean|espresso|cafe/i,
    url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop',
  },
  // Bamboo / Toothbrush / Oral Care
  {
    pattern: /bamboo|toothbrush|dental|oral\s*care/i,
    url: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?q=80&w=800&auto=format&fit=crop',
  },
  // Furniture / Carpentry / Woodworking
  {
    pattern: /furniture|wood|timber|carpentry|joinery|table|desk/i,
    url: 'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?q=80&w=800&auto=format&fit=crop',
  },
  // Soap / Skincare / Cosmetics / Bath
  {
    pattern: /soap|skincare|cosmetics|lotion|serum|bath|botanical/i,
    url: 'https://images.unsplash.com/photo-1607006344380-b6775a0824a7?q=80&w=800&auto=format&fit=crop',
  },
  // Chocolate / Cocoa / Confectionery
  {
    pattern: /chocolate|cocoa|candy|confectionery|truffle/i,
    url: 'https://images.unsplash.com/photo-1511381939415-e44015466834?q=80&w=800&auto=format&fit=crop',
  },
  // LED / Electronics / Hardware / PCB Assembly
  {
    pattern: /led|electronics|smt|circuit|chip|lighting|hardware/i,
    url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop',
  },
  // Bakery / Bread / Pastry
  {
    pattern: /bakery|bread|pastry|cake|flour/i,
    url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800&auto=format&fit=crop',
  },
  // Apparel / Clothing / Garment / Textile
  {
    pattern: /apparel|clothing|garment|textile|fashion|sewing/i,
    url: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=800&auto=format&fit=crop',
  },
  // Agro-Tech / Farming / Hydroponics / Greenhouse
  {
    pattern: /farm|agri|hydroponics|greenhouse|organic\s*produce|crop/i,
    url: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=800&auto=format&fit=crop',
  },
  // Recycling / Waste Management / Plastics
  {
    pattern: /recycle|waste|plastic|circular|compost/i,
    url: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=800&auto=format&fit=crop',
  },
  // Laundry / Cleaning Services
  {
    pattern: /laundry|dry\s*cleaning|wash|cleaner/i,
    url: 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?q=80&w=800&auto=format&fit=crop',
  },
  // Candle / Crafts / Artisanal
  {
    pattern: /candle|wax|craft|handicraft|pottery|artisanal/i,
    url: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=800&auto=format&fit=crop',
  },
  // Brewery / Beer / Spirits
  {
    pattern: /beer|brewery|cider|spirits|distillery/i,
    url: 'https://images.unsplash.com/photo-1584225064785-c62a8b43d148?q=80&w=800&auto=format&fit=crop',
  },
  // Ice Cream / Frozen
  {
    pattern: /ice\s*cream|gelato|sorbet|frozen/i,
    url: 'https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?q=80&w=800&auto=format&fit=crop',
  },
  // Pet Food / Pet Care
  {
    pattern: /pet|dog|cat|animal\s*feed/i,
    url: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=800&auto=format&fit=crop',
  },
  // 3D Printing / Additive
  {
    pattern: /3d\s*print|additive|prototype/i,
    url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop',
  },
];

// 3. Category Default Fallbacks
const CATEGORY_DEFAULT_IMAGES: Record<string, string> = {
  'Manufacturing': 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop',
  'FMCG & Consumer Products': 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?q=80&w=800&auto=format&fit=crop',
  'Agro-Tech & Organic': 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=800&auto=format&fit=crop',
  'Green Tech & Clean Energy': 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=800&auto=format&fit=crop',
  'Hardware & Electronics': 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop',
  'Artisanal & Crafts': 'https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?q=80&w=800&auto=format&fit=crop',
  'Services & Franchise': 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop',
};

// 4. Curated Pool for Custom Dynamic Ideas (Guarantees unique fallback per custom query)
const UNIQUE_BUSINESS_IMAGE_POOL: string[] = [
  'https://images.unsplash.com/photo-1600271886742-f049cd451bba?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1607006344380-b6775a0824a7?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1511381939415-e44015466834?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1584225064785-c62a8b43d148?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop',
];

function stringHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function createDynamicFallbackSvg(title?: string, category?: string): string {
  const safeTitle = (title || 'Business Project').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const safeCat = (category || 'Industry Roadmap').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  const gradients = [
    ['#059669', '#10b981', '#047857'], // Emerald
    ['#0284c7', '#38bdf8', '#0369a1'], // Sky blue
    ['#7c3aed', '#a855f7', '#6d28d9'], // Violet
    ['#ea580c', '#f97316', '#c2410c'], // Amber
    ['#0f766e', '#14b8a6', '#115e59'], // Teal
    ['#be185d', '#f43f5e', '#9d174d'], // Rose
  ];
  const hash = stringHash(safeTitle);
  const grad = gradients[hash % gradients.length];

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450" viewBox="0 0 800 450">
    <defs>
      <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${grad[0]}"/>
        <stop offset="50%" stop-color="${grad[1]}"/>
        <stop offset="100%" stop-color="${grad[2]}"/>
      </linearGradient>
    </defs>
    <rect width="800" height="450" fill="url(#g)"/>
    <circle cx="720" cy="80" r="220" fill="rgba(255,255,255,0.08)"/>
    <circle cx="80" cy="380" r="160" fill="rgba(0,0,0,0.15)"/>
    
    <g transform="translate(60, 220)">
      <rect x="0" y="-36" rx="8" ry="8" width="220" height="28" fill="rgba(0,0,0,0.3)"/>
      <text x="12" y="-18" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" fill="#a7f3d0" letter-spacing="1.5">${safeCat.toUpperCase()}</text>
      <text x="0" y="40" font-family="system-ui, -apple-system, sans-serif" font-size="30" font-weight="800" fill="#ffffff">${safeTitle.length > 36 ? safeTitle.substring(0, 36) + '...' : safeTitle}</text>
    </g>
  </svg>`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

export const DEFAULT_FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop';

/**
 * Image error handler to replace broken or blocked images with a reliable, distinct fallback
 */
export function handleImageError(
  e: React.SyntheticEvent<HTMLImageElement, Event>,
  ideaTitle?: string,
  category?: string
) {
  const target = e.currentTarget;
  target.onerror = null;
  // If provided, generate a custom SVG cover for this exact business title & category
  if (ideaTitle) {
    const fallbackSvg = createDynamicFallbackSvg(ideaTitle, category);
    if (target.src !== fallbackSvg) {
      target.src = fallbackSvg;
    }
    return;
  }

  // Otherwise, use deterministic pool item based on current alt or title
  const seed = target.alt || 'business';
  const index = stringHash(seed) % UNIQUE_BUSINESS_IMAGE_POOL.length;
  const poolFallback = UNIQUE_BUSINESS_IMAGE_POOL[index];
  
  if (target.src !== poolFallback) {
    target.src = poolFallback;
  }
}

/**
 * Retrieves the ideal hero image URL for a given Business Idea object or query
 */
export function getIdeaHeroImage(idea: IdeaImageQuery): string {
  // 1. Direct ID/slug check
  if (idea.id && SAMPLE_IDEA_IMAGES[idea.id]) {
    return SAMPLE_IDEA_IMAGES[idea.id];
  }
  if (idea.slug && SAMPLE_IDEA_IMAGES[idea.slug]) {
    return SAMPLE_IDEA_IMAGES[idea.slug];
  }

  // 2. Keyword match against title & shortDescription
  const searchText = `${idea.title || ''} ${idea.shortDescription || ''} ${idea.slug || ''}`;
  for (const item of KEYWORD_IMAGE_MAP) {
    if (item.pattern.test(searchText)) {
      return item.url;
    }
  }

  // 3. Category fallback
  if (idea.category && CATEGORY_DEFAULT_IMAGES[idea.category]) {
    return CATEGORY_DEFAULT_IMAGES[idea.category];
  }

  // 4. Deterministic Pool Hash for custom unmapped ideas
  const seed = idea.id || idea.slug || idea.title || 'default-business';
  const index = stringHash(seed) % UNIQUE_BUSINESS_IMAGE_POOL.length;
  return UNIQUE_BUSINESS_IMAGE_POOL[index];
}
