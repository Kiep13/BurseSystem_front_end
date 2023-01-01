import { TableFormatters } from '../../../shared/enums';
import { IColumn } from '../../../shared/interfaces';

export const HISTORIES_TABLE_COLUMNS: IColumn[] = [
  {
    title: 'Code of trad.mode',
    name: 'boardid'
  },
  {
    title: 'Trade date',
    name: 'tradedate',
    formatter: TableFormatters.Date,
    extraForFormatter: 'dd.MM.yyyy'
  },
  {
    title: 'Short name',
    name: 'shortName'
  },
  {
    title: 'Secid',
    name: 'secid'
  },
  {
    title: 'Number of trades',
    name: 'numTrades'
  },
  {
    title: 'Value',
    name: 'value'
  },
  {
    title: 'Starting price',
    name: 'open'
  },
  {
    title: 'Minimum price',
    name: 'low'
  },
  {
    title: 'Maximum price',
    name: 'high'
  },
  {
    title: 'Closing price',
    name: 'legalClosePrice'
  },
  {
    title: 'Weighted average price',
    name: 'waprice'
  },
  {
    title: 'Price for the last transaction',
    name: 'close'
  },
  {
    title: 'Volume of securities',
    name: 'volume'
  },
  {
    title: 'Market price №2',
    name: 'marketPrice2'
  },
  {
    title: 'Market price №3',
    name: 'marketPrice3'
  },
  {
    title: 'Admitted quite',
    name: 'admittedQuite'
  },
  {
    title: 'Market price №2 trade value',
    name: 'mp2ValTrd'
  },
  {
    title: 'Market price №3 trade value',
    name: 'marketPrice3TradeValue'
  },
  {
    title: 'Admitted value',
    name: 'admittedValue'
  },
  {
    title: 'Weighted average value',
    name: 'waVal'
  }
];
