import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import {
  SecuritiesComponent,
  SecurityCreatePageComponent,
  SecurityEditPageComponent,
  SecurityUploadPageComponent
} from './components';

const routes: Routes = [
  {path: '', component: SecuritiesComponent},
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
