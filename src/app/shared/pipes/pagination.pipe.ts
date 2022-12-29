import { Pipe, PipeTransform } from '@angular/core';
import {IHistory, ISecurity} from '../interfaces';

const ITEMS_AMOUNT = 10;

@Pipe({
  name: 'paginationPipe',
  pure: false
})
export class PaginationPipe implements PipeTransform {

  transform(list: Array<IHistory| ISecurity>, numberPage: number ): Array<IHistory | ISecurity> {
    numberPage--;
    return list.filter((item, idx) => {
      return idx >= (numberPage * 10) && idx < (numberPage * 10 + ITEMS_AMOUNT);
    });
  }

}
