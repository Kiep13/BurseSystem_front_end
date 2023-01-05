import { SortDirections } from '../enums';

export interface ISortRule {
  columnName: string;
  direction: SortDirections;
}
