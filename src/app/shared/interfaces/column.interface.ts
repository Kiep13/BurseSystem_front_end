import { TableFormatters } from '../enums';

export interface IColumn {
  title: string;
  name: string;
  formatter?: TableFormatters;
  extraForFormatter?: any;
}
