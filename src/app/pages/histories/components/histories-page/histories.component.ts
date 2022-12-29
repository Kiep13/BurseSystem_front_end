import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { catchError, take, tap } from 'rxjs/operators';
import { EMPTY, Observable } from 'rxjs';
import { Router } from '@angular/router';

import { HttpService } from '../../../../shared/services';
import { History } from '../../../../shared/interfaces';

@Component({
  selector: 'app-histories',
  templateUrl: './histories.component.html',
  styleUrls: ['./histories.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistoriesComponent implements OnInit {
  public histories: History[] = [];
  public loading = true;

  public amountPages: number;
  public currentPage = 1;

  constructor(private httpService: HttpService,
              private router: Router) {
  }

  public ngOnInit(): void {
    this.loadHistories();
  }

  public setPage(value: number): void {
    this.currentPage = value;
  }

  public delete(id: number): void {
    this.httpService.deleteHistory(id)
      .pipe(
        take(1),
        tap(() => {
          //TODO add alert 'Successful deleted'
          this.loadHistories();
        }),
        catchError(() => {
          return this.handleError();
        })
      )
      .subscribe();
  }

  private loadHistories(): void {
    this.httpService.getHistories()
      .pipe(
        take(1),
        tap((response: History[]) => {
          this.histories = response;
          this.amountPages = Math.ceil(this.histories.length / 10);
          this.loading = false;
        }),
        catchError(() => {
          return this.handleError();
        })
      )
      .subscribe();
  }

  private handleError(): Observable<never> {
    this.router.navigate(['/error']);
    return EMPTY;
  }
}
