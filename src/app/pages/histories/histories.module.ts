import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { HistoriesRoutingModule } from './histories-routing.module';
import {
  HistoriesComponent,
  HistoryFormComponent,
  HistoryEditPageComponent,
  HistoryUploadComponent
} from './components';

@NgModule({
  declarations: [
    HistoriesComponent,
    HistoryFormComponent,
    HistoryEditPageComponent,
    HistoryUploadComponent
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
