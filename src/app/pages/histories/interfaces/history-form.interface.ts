import { FormControl } from '@angular/forms';

export interface IHistoryForm {
  boardid: FormControl<string>;
  tradedate: FormControl<Date>;
  shortName: FormControl<string>;
  secid: FormControl<string>;
  numTrades: FormControl<number>;
  value: FormControl<number>;
  open: FormControl<number>;
  low: FormControl<number>;
  high: FormControl<number>;
  legalClosePrice: FormControl<number>;
  waprice: FormControl<number>;
  close: FormControl<number>;
  volume: FormControl<number>;
  marketPrice2: FormControl<number>;
  marketPrice3: FormControl<number>;
  admittedQuite: FormControl<number>;
  mp2ValTrd: FormControl<number>;
  marketPrice3TradeValue: FormControl<number>;
  admittedValue: FormControl<number>;
  waVal: FormControl<number>;
}
