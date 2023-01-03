import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable } from 'rxjs';
import { catchError, take, tap } from 'rxjs/operators';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { AlertService, HttpService } from '../../../../shared/services';
import { FormValidators } from '../../../../shared/validators';
import { IHistory, ISecurity } from '../../../../shared/interfaces';
import {
  ERROR_CREATE_SECURITY_MESSAGE,
  ERROR_UPDATE_SECURITY_MESSAGE,
  FORM_CREATE_TITLE,
  FORM_EDIT_TITLE,
  SUCCESS_ADD_SECURITY_MESSAGE,
  SUCCESS_UPDATE_SECURITY_MESSAGE
} from '../../constants';

@Component({
  selector: 'app-security-form',
  templateUrl: './security-form.component.html',
  styleUrls: ['./security-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SecurityFormComponent implements OnInit {
  public form: UntypedFormGroup = new UntypedFormGroup({
    secid: new UntypedFormControl('', [Validators.required]),
    shortName: new UntypedFormControl('', [Validators.required]),
    regNumber: new UntypedFormControl('', [Validators.required]),
    name: new UntypedFormControl('', [Validators.required, FormValidators.securityName]),
    isIn: new UntypedFormControl('', [Validators.required]),
    isTraded: new UntypedFormControl(''), // boolean
    emitentId: new UntypedFormControl('', [Validators.required, FormValidators.negativeNumber]),
    emitentTitle: new UntypedFormControl('', [Validators.required]),
    emitentInn: new UntypedFormControl('', [Validators.required]),
    emitentOkpo: new UntypedFormControl('', [Validators.required]),
    gosReg: new UntypedFormControl('', [Validators.required]),
    type: new UntypedFormControl('', [Validators.required]),
    group_: new UntypedFormControl('', [Validators.required]),
    primaryBoarDid: new UntypedFormControl('', [Validators.required]),
    marketPriceBoarDid: new UntypedFormControl('', [Validators.required])
  });

  public isEditMode = false;
  public editedSecurity: ISecurity;

  public submitted: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  public get formTitle(): string {
    return this.isEditMode ? FORM_EDIT_TITLE : FORM_CREATE_TITLE;
  }

  constructor(private activatedRoute: ActivatedRoute,
              private httpService: HttpService,
              private router: Router,
              private alert: AlertService) {
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

    const security: ISecurity = {
      ...(this.isEditMode ? this.editedSecurity : {}),
      ...this.form.getRawValue()
    };

    this.getActionForSubmit()(security)
      .pipe(
        take(1),
        tap(() => {
          const message = this.isEditMode ? SUCCESS_UPDATE_SECURITY_MESSAGE : SUCCESS_ADD_SECURITY_MESSAGE;
          this.alert.success(message);
          this.router.navigate(['/securities']);
        }),
        catchError(() => {
          const message = this.isEditMode ? ERROR_UPDATE_SECURITY_MESSAGE : ERROR_CREATE_SECURITY_MESSAGE;
          return this.handleError(message);
        })
      )
      .subscribe();
  }

  private prepareEditMode(id: number): void {
    this.isEditMode = true;

    this.httpService.getSecurity(id)
      .pipe(
        take(1),
        tap((security: ISecurity) => {
          this.editedSecurity = security;
          this.form.patchValue(security);

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
    return EMPTY;
  }

  private getActionForSubmit(): (security: ISecurity) => Observable<ISecurity> {
    return this.isEditMode ? this.httpService.editSecurity : this.httpService.addSecurity;
  }
}
