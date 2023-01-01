import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { catchError, take, tap } from 'rxjs/operators';
import { BehaviorSubject, EMPTY } from 'rxjs';
import { Router } from '@angular/router';

import { AlertService, HttpService } from '../../../../shared/services';
import { FormValidators } from '../../../../shared/validators';
import { IHistory } from '../../../../shared/interfaces';

@Component({
  selector: 'app-history-form',
  templateUrl: './history-form.component.html',
  styleUrls: ['./history-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistoryFormComponent {
  public form: UntypedFormGroup = new UntypedFormGroup({
    boardid: new UntypedFormControl('', [Validators.required]),
    tradedate: new UntypedFormControl('', [Validators.required]),
    shortName: new UntypedFormControl('', [Validators.required]),
    secid: new UntypedFormControl('', [Validators.required]),
    numTrades: new UntypedFormControl('',
      [FormValidators.negativeNumber]),
    value: new UntypedFormControl('',
      [FormValidators.negativeNumber]),
    open: new UntypedFormControl('',
      [FormValidators.negativeNumber]),
    low: new UntypedFormControl('',
      [FormValidators.negativeNumber]),
    high: new UntypedFormControl('',
      [FormValidators.negativeNumber]),
    legalClosePrice: new UntypedFormControl('',
      [FormValidators.negativeNumber]),
    waprice: new UntypedFormControl('',
      [FormValidators.negativeNumber]),
    close: new UntypedFormControl('',
      [FormValidators.negativeNumber]),
    volume: new UntypedFormControl('',
      [FormValidators.negativeNumber]),
    marketPrice2: new UntypedFormControl('',
      [FormValidators.negativeNumber]),
    marketPrice3: new UntypedFormControl('',
      [FormValidators.negativeNumber]),
    admittedQuite: new UntypedFormControl('',
      [FormValidators.negativeNumber]),
    mp2ValTrd: new UntypedFormControl('',
      [FormValidators.negativeNumber]),
    marketPrice3TradeValue: new UntypedFormControl('',
      [FormValidators.negativeNumber]),
    admittedValue: new UntypedFormControl('',
      [FormValidators.negativeNumber]),
    waVal: new UntypedFormControl('',
      [FormValidators.negativeNumber])
  });
  public submitted: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private httpService: HttpService,
              private router: Router,
              private alert: AlertService) {
  }

  public submit(): void {
    if (this.form.invalid) {
      return;
    }

    this.submitted.next(true);

    const date = new Date(this.form.get('tradedate').value);
    date.setMinutes(date.getTimezoneOffset());
    console.log(date);

    const history: IHistory = {
      ...this.form.getRawValue(),
      tradedate: date,
    };

    this.httpService.addHistory(history)
      .pipe(
        take(1),
        tap(() => {
          this.alert.success('The history was added successfully');
          this.router.navigate(['/histories']);
          this.submitted.next(false);
        }),
        catchError(() => {
          this.alert.danger('Error when trying to add the history');
          this.submitted.next(false);
          return EMPTY;
        })
      )
      .subscribe();
  }
}
