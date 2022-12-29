import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { AlertService, HttpService } from '../../../../shared/services';

@Component({
  selector: 'app-history-upload',
  templateUrl: './history-upload.component.html',
  styleUrls: ['./history-upload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistoryUploadComponent {
  public file: File | null;
  public submitted = false;

  constructor(private httpService: HttpService,
              private changeDetector: ChangeDetectorRef,
              private router: Router,
              private alert: AlertService) {
  }

  public submit(): void {
    if (!this.file) {
      return;
    }

    this.submitted = true;
    this.changeDetector.detectChanges();

    const data = new FormData();
    data.append('file', this.file);

    this.httpService.uploadHistory(data)
      .pipe(
        tap(() => {
          this.submitted = false;
          this.alert.success('The file was read successfully');
          this.router.navigate(['/histories']);
        }),
        catchError(() => {
          this.submitted = false;
          this.changeDetector.detectChanges();

          this.alert.danger('Error when trying to read the file');
          return EMPTY;
        })
      )
      .subscribe();
  }
}
