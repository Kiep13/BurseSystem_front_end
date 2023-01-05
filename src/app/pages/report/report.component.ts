import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { catchError, map, take, tap } from 'rxjs/operators';
import { BehaviorSubject, EMPTY, Observable } from 'rxjs';
import { Router } from '@angular/router';

import { IColumn, IHistory, IOptions, IPageContent, ISortRule } from '../../shared/interfaces';
import { HttpService } from '../../shared/services';
import { SortDirections } from '../../shared/enums';
import { REPORT_TABLE_COLUMNS } from './constants';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ReportComponent implements OnInit {
  public histories: BehaviorSubject<IHistory[]> = new BehaviorSubject<IHistory[]>([]);
  public loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  public amountPages: number;
  public currentPage = 1;
  public sortRule: ISortRule = {
    columnName: REPORT_TABLE_COLUMNS[0].name,
    direction: SortDirections.Increase
  };

  public form: UntypedFormGroup = new UntypedFormGroup({
    dateMask: new UntypedFormControl(''),
    titleMask: new UntypedFormControl('', Validators.required)
  });

  public readonly columns: IColumn[] = REPORT_TABLE_COLUMNS;
  public readonly sortDirections = SortDirections;

  constructor(private httpService: HttpService,
              private router: Router) {
  }

  public ngOnInit(): void {
    this.loadData();
  }

  public setPage(value: number): void {
    this.currentPage = value;
    this.loadData();
  }

  public handleSortChange(column: IColumn): void {
    this.sortRule = {
      columnName: column.name,
      direction: column.name === this.sortRule.columnName ?
        this.sortRule.direction === SortDirections.Decrease ?
          SortDirections.Increase : SortDirections.Decrease
        : SortDirections.Increase
    };

    this.loadData();
  }

  public setSortField(): void {
    this.loadData();
  }

  public setFilterType(): void {
    if (this.form.get('filterList').value === 'no filter') {
      this.loadData();
      this.form.get('dateMask').reset();
      this.form.get('titleMask').reset();
      return;
    } else if (this.form.get('filterList').value === 'emitentTitle') {
      this.form.get('titleMask').reset();
    } else {
      this.form.get('dateMask').reset();
    }
  }

  private loadData(): void {
    this.loading.next(true);

    const date = new Date(this.form.get('dateMask').value);
    date.setMinutes(date.getTimezoneOffset());

    const filterTitle = this.form.get('titleMask').value;

    const options: IOptions = {
      sortField: this.sortRule.columnName,
      direction: this.sortRule.direction,
      page: this.currentPage,
      ...(date ? {filterDate: date} : {}),
      ...(filterTitle ? {filterTitle} : {})
    };

    this.httpService.getHistories(options)
      .pipe(
        take(1),
        map((response: IPageContent<IHistory>) => {
          return {
            ...response,
            data: response.data.map((history: IHistory) => {
              return {
                ...history,
                regNumber__security_c: history.security.regNumber,
                name__security_c: history.security.name,
                emitentTitle__security_c: history.security.emitentTitle
              };
            })
          };
        }),
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
