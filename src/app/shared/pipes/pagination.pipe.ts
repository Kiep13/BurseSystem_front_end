import { Pipe, PipeTransform } from '@angular/core';
import {History, HistorySecurity, Security} from '../interfaces';

const ITEMS_AMOUNT = 10;

@Pipe({
  name: 'paginationPipe',
  pure: false
})
export class PaginationPipe implements PipeTransform {

  transform(list: Array<History| Security| HistorySecurity>, numberPage: number ): Array<History| Security| HistorySecurity> {
    numberPage--;
    return list.filter((item, idx) => {
      return idx >= (numberPage * 10) && idx < (numberPage * 10 + ITEMS_AMOUNT);
    });
  }

}
