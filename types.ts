
export interface PriceData {
  time: string;
  price: number;
  ma10: number;
  ma20: number;
  ma50: number;
  ma100: number;
  ma200: number;
  rsi: number;
  adx: number;
  open: number;
  high: number;
  low: number;
  close: number;
  upperBand: number;
  lowerBand: number;
}

export interface CPR {
  pivot: number;
  tc: number;
  bc: number;
}

export interface SupportResistance {
  r1: number;
  r2: number;
  r3: number;
  s1: number;
  s2: number;
  s3: number;
}

export interface OIData {
  pcr: number;
  maxPain: number;
  callOI: number;
  putOI: number;
}

export interface Greeks {
  delta: number;
  theta: number;
  gamma: number;
  vega: number;
}

export enum SignalType {
  BUY = 'BUY',
  SELL = 'SELL'
}

export interface TradeSignal {
  id: string | number;
  type: SignalType;
  strike: string;
  timestamp: string;
  entry: number;
  riskReward: string;
  stopLoss: number;
  target: number;
}

export interface UserSession {
  email: string;
  name: string;
  picture?: string;
  mobile: string;
  loginTime: string;
  authenticated: boolean;
  acceptedRisk: boolean;
}

export interface AdminLog {
  email: string;
  mobile: string;
  timestamp: string;
  metadata: string;
}

export interface CompanyIntelligence {
  ticker: string;
  name: string;
  audit?: {
    roe: number;
    pe: number;
    debtToEquity: number;
    currentRatio: number;
    revenue: string;
    netProfit: string;
    operatingCashFlow: string;
    freeCashFlow: string;
  };
  narrativeScore: number;
  verdict: string;
}

export interface TopDownOpportunity {
  company: string;
  ticker: string;
  sector: string;
  rating: 'BUY' | 'ACCUMULATE' | 'HOLD' | 'REDUCE';
  upside: string;
  rationale: string;
  institutionalScore: number; // 0-100
}

export interface IPOData {
  company: string;
  openDate: string;
  closeDate: string;
  priceBand: string;
  lotSize: string;
  gmp: string;
  listingEstimate: string;
  institutionalSuggestion: 'APPLY' | 'AVOID' | 'MAYBE';
  auditSummary: string;
}

export interface ResearchOutput {
  text: string;
  sources: { title: string; uri: string }[];
  structuredData?: CompanyIntelligence;
  topDownOpportunities?: TopDownOpportunity[];
  ipoData?: IPOData[];
  alphaIntel?: {
    entity: string;
    moatScore: number;
    riskRating: 'LOW' | 'MEDIUM' | 'HIGH' | 'EXTREME';
    swot: { s: string[]; w: string[]; o: string[]; t: string[] };
    impactVelocity?: { name: string; impact: 'POSITIVE' | 'NEGATIVE'; reason: string }[];
  };
}

export interface NarrativeFidelity {
  managementTone: number;
  executionReality: number;
  innovationDelta: number;
  fidelityScore: number;
  summary: string;
}

export interface FinancialStatement {
  revenue: string;
  netProfit: string;
  debt: string;
  cash: string;
  operatingCashFlow: string;
  freeCashFlow: string;
}
