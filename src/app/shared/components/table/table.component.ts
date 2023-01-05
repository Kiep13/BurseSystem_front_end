import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { SortDirections, TableActionTypes, TableFormatters } from '../../enums';

import { IActionInfo, IColumn, ISortRule, ITableAction } from '../../interfaces';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent {
  @Input() public columns: IColumn[] = [];
  @Input() public actions: ITableAction[] = [];
  @Input() public data: any[] = [];
  @Input() public sortRule: ISortRule;

  @Output() public selected: EventEmitter<IActionInfo> = new EventEmitter<IActionInfo>();
  @Output() public sorted: EventEmitter<IColumn> = new EventEmitter<IColumn>();

  public readonly sortDirections = SortDirections;

  public handleAction(id: string, actionType: TableActionTypes): void {
    this.selected.next({
      type: actionType,
      id,
    });
  }

  public handleSortChange(column: IColumn): void {
    this.sorted.next(column);
  }
}
