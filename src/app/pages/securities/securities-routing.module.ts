import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import {
  SecuritiesComponent,
  SecurityFormComponent,
  SecurityUploadComponent
} from './components';

const routes: Routes = [
  {path: '', component: SecuritiesComponent},
  {path: 'create', component: SecurityFormComponent},
  {path: 'edit/:id', component: SecurityFormComponent},
  {path: 'upload', component: SecurityUploadComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecuritiesRoutingModule {
}
