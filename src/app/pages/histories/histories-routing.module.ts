import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import {
  HistoriesComponent,
  HistoryFormComponent,
  HistoryUploadComponent
} from './components';

const routes: Routes = [
  {path: '', component: HistoriesComponent},
  {path: 'create', component: HistoryFormComponent},
  {path: 'edit/:id', component: HistoryFormComponent},
  {path: 'upload', component: HistoryUploadComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistoriesRoutingModule {
}
