import { UntypedFormControl } from '@angular/forms';

export class FormValidators {

  static NAME_REG_EXP = new RegExp('[^а-яА-Я0-9 ]+');

  static negativeNumber(control: UntypedFormControl): { [key: string]: boolean } {
    const value = Number(control.value);
    if (value < 0 && value !== null) {
      return {negativeNumbers: true};
    }
    return null;
  }

  static securityName(control: UntypedFormControl): { [key: string]: boolean } {
    const value = control.value;
    if (FormValidators.NAME_REG_EXP.test(value)) {
      return {invalidSecName: true};
    }
    return null;
  }

}
