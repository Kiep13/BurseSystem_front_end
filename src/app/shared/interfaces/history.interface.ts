import { ISecurity } from './security.interface';

export interface IHistory {
  id?: string;
  boardid: string;
  tradedate: Date;
  shortName: string;
  secid: string;
  numTrades: number;
  value: number;
  open: number;
  low: number;
  high: number;
  legalClosePrice: number;
  waprice: number;
  close: number;
  volume: number;
  marketPrice2: number;
  marketPrice3: number;
  admittedQuite: number;
  mp2ValTrd: number;
  marketPrice3TradeValue: number;
  admittedValue: number;
  waVal: number;
  security?: ISecurity;

  regNumber__security_c: string;
  name__security_c: string;
  emitentTitle__security_c: string;
}
