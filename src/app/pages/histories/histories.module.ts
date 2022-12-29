import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
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
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HistoriesRoutingModule,
    SharedModule
  ]
})
export class HistoriesModule {
}
