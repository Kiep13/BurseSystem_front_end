import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import {
  SecuritiesComponent,
  SecurityFormComponent,
  SecurityEditPageComponent,
  SecurityUploadPageComponent
} from './components';

const routes: Routes = [
  {path: '', component: SecuritiesComponent},
  {path: 'create', component: SecurityFormComponent},
  {path: 'edit/:id', component: SecurityEditPageComponent},
  {path: 'upload', component: SecurityUploadPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecuritiesRoutingModule {
}
