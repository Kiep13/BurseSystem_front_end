import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BehaviorSubject, EMPTY, Observable } from 'rxjs';
import { catchError, take, tap } from 'rxjs/operators';

import { AlertService, HttpService } from '../../../../shared/services';
import { FormValidators } from '../../../../shared/validators';
import { IHistory } from '../../../../shared/interfaces';
import {
  FORM_CREATE_TITLE,
  FORM_EDIT_TITLE,
  ERROR_CREATE_HISTORY_MESSAGE,
  ERROR_UPDATE_HISTORY_MESSAGE,
  SUCCESS_ADD_HISTORY_MESSAGE, SUCCESS_UPDATE_HISTORY_MESSAGE
} from '../../constants';
import { IHistoryForm } from '../../interfaces';

@Component({
  selector: 'app-history-form',
  templateUrl: './history-form.component.html',
  styleUrls: ['./history-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistoryFormComponent implements OnInit {
  public form: FormGroup<IHistoryForm> = new FormGroup<IHistoryForm>({
    boardid: new FormControl('', [Validators.required]),
    tradedate: new FormControl<Date>(new Date(), [Validators.required]),
    shortName: new FormControl('', [Validators.required]),
    secid: new FormControl('', [Validators.required]),
    numTrades: new FormControl(0, [FormValidators.negativeNumber]),
    value: new FormControl(0, [FormValidators.negativeNumber]),
    open: new FormControl(0, [FormValidators.negativeNumber]),
    low: new FormControl(0, [FormValidators.negativeNumber]),
    high: new FormControl(0, [FormValidators.negativeNumber]),
    legalClosePrice: new FormControl(0, [FormValidators.negativeNumber]),
    waprice: new FormControl(0, [FormValidators.negativeNumber]),
    close: new FormControl(0, [FormValidators.negativeNumber]),
    volume: new FormControl(0, [FormValidators.negativeNumber]),
    marketPrice2: new FormControl(0, [FormValidators.negativeNumber]),
    marketPrice3: new FormControl(0, [FormValidators.negativeNumber]),
    admittedQuite: new FormControl(0, [FormValidators.negativeNumber]),
    mp2ValTrd: new FormControl(0, [FormValidators.negativeNumber]),
    marketPrice3TradeValue: new FormControl(0, [FormValidators.negativeNumber]),
    admittedValue: new FormControl(0, [FormValidators.negativeNumber]),
    waVal: new FormControl(0, [FormValidators.negativeNumber])
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
      tradedate: date
    };

    this.getActionForSubmit()(history)
      .pipe(
        take(1),
        tap(() => {
          const message = this.isEditMode ? SUCCESS_UPDATE_HISTORY_MESSAGE : SUCCESS_ADD_HISTORY_MESSAGE;
          this.alert.success(message);
          this.router.navigate(['/histories']);
          this.submitted.next(false);
        }),
        catchError(() => {
          const message = this.isEditMode ? ERROR_UPDATE_HISTORY_MESSAGE : ERROR_CREATE_HISTORY_MESSAGE;
          return this.handleError(message);
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

          const tradeDate = new Date(history.tradedate);
          this.form.get('tradedate').setValue(tradeDate);

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
