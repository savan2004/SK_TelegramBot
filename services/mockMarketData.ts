
import { PriceData, CPR, SupportResistance, OIData, Greeks } from '../types';
import { DEFAULT_NIFTY_PRICE } from '../constants';

export class MarketDataService {
  private eodSnapshot: PriceData;
  private dayOpen: number = 25915.20;

  constructor() {
    this.eodSnapshot = this.createEODSnapshot(DEFAULT_NIFTY_PRICE);
  }

  private createEODSnapshot(price: number): PriceData {
    const stdDev = price * 0.0012;
    return {
      time: 'EOD SNAPSHOT',
      price: Number(price.toFixed(2)),
      open: 25915.20,
      high: 25960.45,
      low: 25820.10,
      close: Number(price.toFixed(2)),
      ma10: 25895.30,
      ma20: 25912.45,
      ma50: 25740.20,
      ma100: 25420.15,
      ma200: 25110.80,
      rsi: 48.25,
      adx: 21.40,
      upperBand: Number((price + (stdDev * 2)).toFixed(2)),
      lowerBand: Number((price - (stdDev * 2)).toFixed(2)),
    };
  }

  public getDayOpen(): number {
    return this.dayOpen;
  }

  public getEODData(): PriceData {
    return this.eodSnapshot;
  }

  public getHistory(): PriceData[] {
    // Return a single snapshot as history for EOD mode
    return [this.eodSnapshot];
  }

  public calculateCPR(high: number, low: number, close: number): CPR {
    const pivot = (high + low + close) / 3;
    const bc = (high + low) / 2;
    const tc = (pivot - bc) + pivot;
    return { pivot, tc, bc };
  }

  public getSupportResistance(high: number, low: number, close: number): SupportResistance {
    const pivot = (high + low + close) / 3;
    const range = high - low;
    return {
      r1: (2 * pivot) - low,
      r2: pivot + range,
      r3: high + 2 * (pivot - low),
      s1: (2 * pivot) - high,
      s2: pivot - range,
      s3: low - 2 * (high - pivot)
    };
  }

  public getOIData(): OIData {
    return {
      pcr: 0.92,
      maxPain: 25850,
      callOI: 22400000,
      putOI: 20600000
    };
  }

  public getGreeks(): Greeks {
    return { delta: 0.49, theta: -12.5, gamma: 0.0022, vega: 0.138 };
  }
}

export const marketService = new MarketDataService();
