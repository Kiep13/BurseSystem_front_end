import { TableFormatters } from '../../../shared/enums';
import { IColumn } from '../../../shared/interfaces';

export const REPORT_TABLE_COLUMNS: IColumn[] = [
  {
    title: 'Secid',
    name: 'secid'
  },
  {
    title: 'Registration number',
    name: 'regNumber__security_c'
  },
  {
    title: 'Name',
    name: 'name__security_c'
  },
  {
    title: 'Emitent title',
    name: 'emitentTitle__security_c'
  },
  {
    title: 'Trade date',
    name: 'tradedate',
    formatter: TableFormatters.Date,
    extraForFormatter: 'dd.MM.yyyy'
  },
  {
    title: 'Number of trades',
    name: 'numTrades'
  },
  {
    title: 'Starting price',
    name: 'open'
  },
  {
    title: 'Price for the last transaction',
    name: 'close'
  }
]
