import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable } from 'rxjs';
import { catchError, take, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { IActionInfo, IColumn, IOptions, IPageContent, ISecurity, ITableAction } from '../../../../shared/interfaces';
import { TableActionTypes } from '../../../../shared/enums';
import { HttpService } from '../../../../shared/services';
import { SECURITIES_TABLE_ACTIONS, SECURITIES_TABLE_COLUMNS } from '../../constants';

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

  public readonly actions: ITableAction[] = SECURITIES_TABLE_ACTIONS;
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

  public handleRecordSelection(actionInfo: IActionInfo): void {
    switch (actionInfo.type) {
      case TableActionTypes.Edit: this.navigateToEditPage(actionInfo.id); break;
      case TableActionTypes.Delete: this.delete(actionInfo.id); break;
    }
  }

  private navigateToEditPage(id: string): void {
    this.router.navigate(['', 'securities', 'edit', id]);
  }

  private delete(id: string): void {
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
