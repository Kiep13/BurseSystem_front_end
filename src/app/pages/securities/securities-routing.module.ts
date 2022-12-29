import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import {
  SecuritiesPageComponent,
  SecurityCreatePageComponent,
  SecurityEditPageComponent,
  SecurityUploadPageComponent
} from './components';

const routes: Routes = [
  {path: '', component: SecuritiesPageComponent},
  {path: 'create', component: SecurityCreatePageComponent},
  {path: 'edit/:id', component: SecurityEditPageComponent},
  {path: 'upload', component: SecurityUploadPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecuritiesRoutingModule {
}
