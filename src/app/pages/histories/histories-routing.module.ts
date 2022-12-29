import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import {
  HistoriesPageComponent,
  HistoryCreatePageComponent,
  HistoryEditPageComponent,
  HistoryUploadPageComponent
} from './components';

const routes: Routes = [
  {path: '', component: HistoriesPageComponent},
  {path: 'create', component: HistoryCreatePageComponent},
  {path: 'edit/:id', component: HistoryEditPageComponent},
  {path: 'upload', component: HistoryUploadPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistoriesRoutingModule {
}
