import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BehaviorSubject, EMPTY, Observable } from 'rxjs';
import { catchError, take, tap } from 'rxjs/operators';

import { AlertService, HttpService } from '../../../../shared/services';
import { FormValidators } from '../../../../shared/validators';
import { ISecurity } from '../../../../shared/interfaces';
import {
  ERROR_CREATE_SECURITY_MESSAGE,
  ERROR_UPDATE_SECURITY_MESSAGE,
  FORM_CREATE_TITLE,
  FORM_EDIT_TITLE,
  SUCCESS_ADD_SECURITY_MESSAGE,
  SUCCESS_UPDATE_SECURITY_MESSAGE
} from '../../constants';
import { ISecurityForm } from '../../interfaces';

@Component({
  selector: 'app-security-form',
  templateUrl: './security-form.component.html',
  styleUrls: ['./security-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SecurityFormComponent implements OnInit {
  public form: FormGroup<ISecurityForm> = new FormGroup<ISecurityForm>({
    secid: new FormControl('', [Validators.required]),
    shortName: new FormControl('', [Validators.required]),
    regNumber: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required, FormValidators.securityName]),
    isIn: new FormControl('', [Validators.required]),
    isTraded: new FormControl(false),
    emitentId: new FormControl(0, [Validators.required, FormValidators.negativeNumber]),
    emitentTitle: new FormControl('', [Validators.required]),
    emitentInn: new FormControl('', [Validators.required]),
    emitentOkpo: new FormControl('', [Validators.required]),
    gosReg: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    group_: new FormControl('', [Validators.required]),
    primaryBoarDid: new FormControl('', [Validators.required]),
    marketPriceBoarDid: new FormControl('', [Validators.required])
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
      ...this.form.getRawValue(),
      traded: this.form.get('isTraded').value
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
          this.form.patchValue({
            ...security,
            isTraded: security.traded
          });

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
