import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable } from 'rxjs';
import { catchError, take, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { IColumn, IOptions, IPageContent, ISecurity } from '../../../../shared/interfaces';
import { HttpService } from '../../../../shared/services';
import { SECURITIES_TABLE_COLUMNS } from '../../constants';

@Component({
  selector: 'app-securities',
  templateUrl: './securities.component.html',
  styleUrls: ['./securities.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SecuritiesComponent implements OnInit {
  public securities: BehaviorSubject<ISecurity[]> = new BehaviorSubject<ISecurity[]>([]);
  public loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  public amountPages: number;
  public currentPage = 1;

  public readonly columns: IColumn[] = SECURITIES_TABLE_COLUMNS;

  constructor(private httpService: HttpService,
              private router: Router) {
  }

  public ngOnInit(): void {
    this.loadSecurities();
  }

  public setPage(value: number): void {
    this.currentPage = value;
    this.loadSecurities();
  }

  public delete(id: number): void {
    this.httpService.deleteSecurity(id)
      .pipe(
        take(1),
        tap(() => {
          this.loadSecurities();
        }),
        catchError(() => {
          return this.handleError();
        })
      )
      .subscribe();
  }

  private loadSecurities(): void {
    this.loading.next(true);

    const options: IOptions = {
      page: this.currentPage
    };

    this.httpService.getSecurities(options)
      .pipe(
        take(1),
        tap((response: IPageContent<ISecurity>) => {
          this.securities.next(response.data);
          this.amountPages = response.totalPages;
          this.loading.next(false);
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
