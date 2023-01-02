import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable } from 'rxjs';
import { catchError, take, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { AlertService, HttpService } from '../../../../shared/services';
import { FormValidators } from '../../../../shared/validators';
import { ISecurity } from '../../../../shared/interfaces';

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
  public submitted: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private httpService: HttpService,
              private router: Router,
              private alert: AlertService) {
  }

  public ngOnInit(): void {

  }

  public submit(): void {
    if (this.form.invalid) {
      return;
    }

    this.submitted.next(true);

    const security: ISecurity = {
      ...this.form.getRawValue()
    };

    this.httpService.addSecurity(security)
      .pipe(
        take(1),
        tap(() => {
          this.alert.success('The security was added successfully');
          this.router.navigate(['/securities']);
        }),
        catchError(() => {
          return this.handleError('Error when trying to add the security');
        })
      )
      .subscribe();
  }

  private handleError(message: string): Observable<never> {
    this.alert.danger(message);
    return EMPTY;
  }
}
