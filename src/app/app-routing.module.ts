import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

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
  {
    path: 'securities',
    loadChildren: () => {
      return import('./pages/securities/securities.module').then((m) => m.SecuritiesModule);
    },
    title: 'Securities'
  },
  {
    path: 'total',
    loadChildren: () => {
      return import('./pages/report/report.module').then((m) => m.ReportModule);
    },
    title: 'Total'
  },
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
