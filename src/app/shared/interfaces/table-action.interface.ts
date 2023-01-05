import { TableActionTypes } from '../enums';

export interface ITableAction {
  styleClass: string;
  icon: string;
  type: TableActionTypes;
}
