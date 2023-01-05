import { TableActionTypes } from '../../../shared/enums';
import { ITableAction } from '../../../shared/interfaces';

export const HISTORIES_TABLE_ACTIONS: ITableAction[] = [
  {
    styleClass: 'btn-sm btn-outline-warning my-1 mr-2 item-control d-inline',
    icon: 'fa-pencil',
    type: TableActionTypes.Edit
  },
  {
    styleClass: 'btn-sm btn-outline-danger my-1 item-control d-inline',
    icon: 'fa-pencil',
    type: TableActionTypes.Delete
  }
];
