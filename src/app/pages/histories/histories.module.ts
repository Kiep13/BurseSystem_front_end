import { NgModule } from '@angular/core';

import { HistoriesRoutingModule } from './histories-routing.module';
import {
  HistoriesPageComponent,
  HistoryCreatePageComponent,
  HistoryEditPageComponent,
  HistoryUploadPageComponent
} from './components';

@NgModule({
  declarations: [
    HistoriesPageComponent,
    HistoryCreatePageComponent,
    HistoryEditPageComponent,
    HistoryUploadPageComponent
  ],
  imports: [HistoriesRoutingModule]
})
export class HistoriesModule {
}
