import { FormControl } from '@angular/forms';

export interface ISecurityForm {
  secid: FormControl<string>;
  shortName: FormControl<string>;
  regNumber: FormControl<string>;
  name: FormControl<string>;
  isIn: FormControl<string>;
  isTraded: FormControl<boolean>;
  emitentId: FormControl<number>;
  emitentTitle: FormControl<string>;
  emitentInn: FormControl<string>;
  emitentOkpo: FormControl<string>;
  gosReg: FormControl<string>;
  type: FormControl<string>;
  group_: FormControl<string>;
  primaryBoarDid: FormControl<string>;
  marketPriceBoarDid: FormControl<string>;
}
