import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { ErrorComponent } from './error.component';

const routes: Routes = [
  {path: '', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorRoutingModule {
}
