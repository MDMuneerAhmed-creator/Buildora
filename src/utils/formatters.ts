export type CurrencyCode = 'INR' | 'USD' | 'EUR' | 'GBP';

export const CURRENCY_CONFIG: Record<CurrencyCode, { symbol: string; rateFromUSD: number; label: string; locale: string }> = {
  INR: { symbol: '₹', rateFromUSD: 83.5, label: 'INR (₹)', locale: 'en-IN' },
  USD: { symbol: '$', rateFromUSD: 1.0, label: 'USD ($)', locale: 'en-US' },
  EUR: { symbol: '€', rateFromUSD: 0.92, label: 'EUR (€)', locale: 'de-DE' },
  GBP: { symbol: '£', rateFromUSD: 0.78, label: 'GBP (£)', locale: 'en-GB' },
};

export function formatCurrency(amountUSD: number, currency: CurrencyCode = 'INR'): string {
  const config = CURRENCY_CONFIG[currency] || CURRENCY_CONFIG.INR;
  const converted = Math.round(amountUSD * config.rateFromUSD);
  return new Intl.NumberFormat(config.locale, {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: 0,
  }).format(converted);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-IN').format(value);
}

export function formatPercent(value: number): string {
  return `${value > 0 ? '+' : ''}${value}%`;
}

