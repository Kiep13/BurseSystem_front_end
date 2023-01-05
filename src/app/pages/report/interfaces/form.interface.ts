import { FormControl } from '@angular/forms';

export interface IForm {
  date: FormControl<Date>;
  title: FormControl<string>;
}
