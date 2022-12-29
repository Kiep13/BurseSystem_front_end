import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

import { AlertTypes } from '../enums';
import {IAlert} from '../interfaces';

@Injectable()
export class AlertService {
  public alert$ = new Subject<IAlert>();

  success(text: string) {
    this.alert$.next({type: AlertTypes.Success, text});
  }

  warning(text: string) {
    this.alert$.next({type: AlertTypes.Warning, text});
  }
  danger(text: string) {
    this.alert$.next({type: AlertTypes.Danger, text});
  }
}
