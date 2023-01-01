import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { catchError, take, tap } from 'rxjs/operators';
import { BehaviorSubject, EMPTY, Observable } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { AlertService, HttpService } from '../../../../shared/services';
import { FormValidators } from '../../../../shared/validators';
import { IHistory } from '../../../../shared/interfaces';
import { FORM_CREATE_TITLE, FORM_EDIT_TITLE } from '../../constants/form-titles';

@Component({
  selector: 'app-history-form',
  templateUrl: './history-form.component.html',
  styleUrls: ['./history-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistoryFormComponent implements OnInit {
  public form: UntypedFormGroup = new UntypedFormGroup({
    boardid: new UntypedFormControl('', [Validators.required]),
    tradedate: new FormControl<Date>(null, [Validators.required]),
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

  public isEditMode = false;
  public editedHistory: IHistory;

  public submitted: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  public get formTitle(): string {
    return this.isEditMode ? FORM_EDIT_TITLE : FORM_CREATE_TITLE;
  }

  constructor(private activatedRoute: ActivatedRoute,
              private httpService: HttpService,
              private alert: AlertService,
              private router: Router) {
  }

  public ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        take(1),
        tap((params: Params) => {
          if (params.id) {
            this.prepareEditMode(params.id);
            return;
          }

          this.loading.next(false);
        })
      )
      .subscribe();
  }

  public submit(): void {
    if (this.form.invalid) {
      return;
    }

    this.submitted.next(true);

    const date = new Date(this.form.get('tradedate').value);
    date.setMinutes(date.getTimezoneOffset());

    const history: IHistory = {
      ...(this.isEditMode ? this.editedHistory : {}),
      ...this.form.getRawValue(),
      tradedate: date,
    };

    this.getActionForSubmit()(history)
      .pipe(
        take(1),
        tap(() => {
          this.alert.success('The history was added successfully');
          this.router.navigate(['/histories']);
          this.submitted.next(false);
        }),
        catchError(() => {
          return this.handleError('Error when trying to add the history');
        })
      )
      .subscribe();
  }

  private prepareEditMode(id: number): void {
    this.isEditMode = true;

    this.httpService.getHistory(id)
      .pipe(
        take(1),
        tap((history: IHistory) => {
          this.editedHistory = history;

          this.form.patchValue(history);
          this.form.get('tradedate').setValue(new Date(history.tradedate));

          console.log(history.tradedate, this.form.get('tradedate').value);

          this.loading.next(false);
        }),
        catchError(() => {
          this.router.navigate(['/error']);
          return EMPTY;
        })
      )
      .subscribe();
  }

  private handleError(message: string): Observable<never> {
    this.alert.danger(message);
    this.submitted.next(false);
    return EMPTY;
  }

  private getActionForSubmit(): (history: IHistory) => Observable<IHistory> {
    return this.isEditMode ? this.httpService.editHistory : this.httpService.addHistory;
  }
}
