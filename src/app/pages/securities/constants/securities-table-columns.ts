import { TableFormatters } from '../../../shared/enums';
import { IColumn } from '../../../shared/interfaces';

export const SECURITIES_TABLE_COLUMNS: IColumn[] = [
  {
    title: 'Secid',
    name: 'secid'
  },
  {
    title: 'Short name',
    name: 'shortName'
  },
  {
    title: 'Registration number',
    name: 'regNumber'
  },
  {
    title: 'Name',
    name: 'name'
  },
  {
    title: 'Identification code',
    name: 'isIn'
  },
  {
    title: 'Is traded',
    name: 'traded',
    formatter: TableFormatters.Boolean
  },
  {
    title: 'Emitent title',
    name: 'emitentTitle'
  },
  {
    title: 'Emitent inn',
    name: 'emitentInn'
  },
  {
    title: 'Emitent okpo',
    name: 'emitentOkpo'
  },
  {
    title: 'Goverment registration',
    name: 'gosReg'
  },
  {
    title: 'Type',
    name: 'type'
  },
  {
    title: 'Group',
    name: 'group_'
  },
  {
    title: 'Primary code',
    name: 'primaryBoarDid'
  },
  {
    title: 'Market price code',
    name: 'marketPriceBoarDid'
  }
];
