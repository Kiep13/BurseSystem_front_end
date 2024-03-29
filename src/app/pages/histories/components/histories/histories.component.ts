import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, EMPTY, Observable } from 'rxjs';
import { catchError, take, tap } from 'rxjs/operators';
import { TableActionTypes } from '../../../../shared/enums';

import { IActionInfo, IColumn, IHistory, IOptions, IPageContent, ITableAction } from '../../../../shared/interfaces';
import { HttpService } from '../../../../shared/services';
import { HISTORIES_TABLE_ACTIONS, HISTORIES_TABLE_COLUMNS } from '../../constants';

@Component({
  selector: 'app-histories',
  templateUrl: './histories.component.html',
  styleUrls: ['./histories.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistoriesComponent implements OnInit {
  public histories: BehaviorSubject<IHistory[]> = new BehaviorSubject<IHistory[]>([]);
  public loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  public amountPages: number;
  public currentPage = 1;

  public readonly actions: ITableAction[] = HISTORIES_TABLE_ACTIONS;
  public readonly columns: IColumn[] = HISTORIES_TABLE_COLUMNS;

  constructor(private httpService: HttpService,
              private router: Router) {
  }

  public ngOnInit(): void {
    this.loadHistories();
  }

  public setPage(value: number): void {
    this.currentPage = value;
    this.loadHistories();
  }

  public handleRecordSelection(actionInfo: IActionInfo): void {
    switch (actionInfo.type) {
      case TableActionTypes.Edit: this.navigateToEditPage(actionInfo.id); break;
      case TableActionTypes.Delete: this.delete(actionInfo.id); break;
    }
  }

  private navigateToEditPage(id: string): void {
    this.router.navigate(['', 'histories', 'edit', id]);
  }

  private delete(id: string): void {
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
    this.loading.next(true);

    const options: IOptions = {
      page: this.currentPage
    };

    this.httpService.getHistories(options)
      .pipe(
        take(1),
        tap((response: IPageContent<IHistory>) => {
          this.histories.next(response.data);
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
