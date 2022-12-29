import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { catchError, take, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';

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
  submitted = false;

  constructor(private httpService: HttpService,
              private changeDetector: ChangeDetectorRef,
              private router: Router,
              private alert: AlertService) {
  }

  public submit(): void {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;
    this.changeDetector.detectChanges();

    const date = new Date(this.form.get('tradedate').value);
    date.setMinutes(date.getTimezoneOffset());
    console.log(date);

    const history: IHistory = {
      boardid: this.form.get('boardid').value,
      tradedate: date,
      shortName: this.form.get('shortName').value,
      secid: this.form.get('secid').value,
      numTrades: parseFloat(this.form.get('numTrades').value),
      value: parseFloat(this.form.get('value').value),
      open: parseFloat(this.form.get('open').value),
      low: parseFloat(this.form.get('low').value),
      high: parseFloat(this.form.get('high').value),
      legalClosePrice: parseFloat(this.form.get('legalClosePrice').value),
      waprice: parseFloat(this.form.get('waprice').value),
      close: parseFloat(this.form.get('close').value),
      volume: parseFloat(this.form.get('volume').value),
      marketPrice2: parseFloat(this.form.get('marketPrice2').value),
      marketPrice3: parseFloat(this.form.get('marketPrice3').value),
      admittedQuite: parseFloat(this.form.get('admittedQuite').value),
      mp2ValTrd: parseFloat(this.form.get('mp2ValTrd').value),
      marketPrice3TradeValue: parseFloat(this.form.get('marketPrice3TradeValue').value),
      admittedValue: parseFloat(this.form.get('admittedValue').value),
      waVal: parseFloat(this.form.get('waVal').value)
    };

    this.httpService.addHistory(history)
      .pipe(
        take(1),
        tap(() => {
          this.form.reset();
          this.submitted = false;
          this.alert.success('The history was added successfully');
          this.router.navigate(['/histories']);
        }),
        catchError(() => {
          this.alert.danger('Error when trying to add the history');
          this.submitted = false;
          this.changeDetector.detectChanges();
          return EMPTY;
        })
      )
      .subscribe();
  }
}
