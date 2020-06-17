export interface Entity {
  id?: number;
}

export interface Security extends Entity{
  secid: string;
  shortName: string;
  regNumber: string;
  name: string;
  isIn: string;
  traded: boolean;
  emitentId: number;
  emitentTitle: string;
  emitentInn: string;
  emitentOkpo: string;
  gosReg: string;
  type: string;
  group_: string;
  primaryBoarDid: string;
  marketPriceBoarDid: string;
}

export interface History extends Entity{
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
}

export interface HistorySecurity extends Entity{
  secid: string;
  tradedate: Date;
  numTrades: number;
  open: number;
  close: number;
  security: Security;
}

export interface Alert {
  type: AlertType;
  text: string;
}

export type AlertType = 'success' | 'warning' | 'danger';

export interface Options {
  direction: string;
  sortField: string;
  filterDate?: Date;
  filterTitle?: string;
}
