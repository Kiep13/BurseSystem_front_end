import { ChangeDetectionStrategy, Component } from '@angular/core';
import { catchError, take, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';

import { AlertService, HttpService } from '../../../../shared/services';

@Component({
  selector: 'app-security-upload',
  templateUrl: './security-upload.component.html',
  styleUrls: ['./security-upload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SecurityUploadComponent {
  public file: File | null;
  public submitted = false;

  constructor(private httpService: HttpService,
              private router: Router,
              private alert: AlertService) {
  }

  public submit(): void {
    if (!this.file) {
      return;
    }

    this.submitted = true;
    const data = new FormData();
    data.append('file', this.file);

    this.httpService.uploadSecurity(data)
      .pipe(
        take(1),
        tap((response) => {
          console.log(response);
          this.submitted = false;
          this.alert.success('The file was read successfully');
          this.router.navigate(['/securities']);
        }),
        catchError((error) => {
          console.log(error);
          this.submitted = false;
          this.alert.danger('Error when trying to read the file');
          return EMPTY;
        })
      )
      .subscribe();
  }
}
