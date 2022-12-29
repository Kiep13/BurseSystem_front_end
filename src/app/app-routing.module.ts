import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {SecuritiesPageComponent} from './components/securities/securities-page/securities-page.component';
import {TotalPageComponent} from './components/totalpage/total-page.component';
import {SecurityUploadPageComponent} from './components/securities/security-upload-page/security-upload-page.component';
import {SecurityCreatePageComponent} from './components/securities/security-create-page/security-create-page.component';
import {SecurityEditPageComponent} from './components/securities/security-edit-page/security-edit-page.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => {
      return import('./pages/home/home.module').then((m) => m.HomeModule);
    },
    title: 'Home'
  },
  {
    path: 'histories',
    loadChildren: () => {
      return import('./pages/histories/histories.module').then((m) => m.HistoriesModule);
    },
    title: 'Histories'
  },
  {path: 'createSecurity', component: SecurityCreatePageComponent},
  {path: 'editSecurity/:id', component: SecurityEditPageComponent},
  {path: 'securities', component: SecuritiesPageComponent},
  {path: 'uploadSecurity', component: SecurityUploadPageComponent},
  {path: 'total', component: TotalPageComponent},
  {
    path: 'error',
    loadChildren: () => {
      return import('./pages/error/error.module').then((m) => m.ErrorModule);
    },
    title: 'Error'
  },
  {path: '**', redirectTo: '/error'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
