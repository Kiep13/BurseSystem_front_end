import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {HistoriesPageComponent} from './components/histories/histories-page/histories-page.component';
import {SecuritiesPageComponent} from './components/securities/securities-page/securities-page.component';
import {TotalPageComponent} from './components/totalpage/total-page.component';
import {HistoryUploadPageComponent} from './components/histories/history-upload-page/history-upload-page.component';
import {SecurityUploadPageComponent} from './components/securities/security-upload-page/security-upload-page.component';
import {HistoryCreatePageComponent} from './components/histories/history-create-page/history-create-page.component';
import {HistoryEditPageComponent} from './components/histories/history-edit-page/history-edit-page.component';
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
  {path: 'histories', component: HistoriesPageComponent},
  {path: 'createHistory', component: HistoryCreatePageComponent},
  {path: 'editHistory/:id', component: HistoryEditPageComponent},
  {path: 'uploadHistory', component: HistoryUploadPageComponent},
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
