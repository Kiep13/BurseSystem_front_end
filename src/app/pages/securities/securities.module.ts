import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { SecuritiesRoutingModule } from './securities-routing.module';
import {
  SecuritiesPageComponent,
  SecurityCreatePageComponent,
  SecurityEditPageComponent,
  SecurityUploadPageComponent
} from './components';

@NgModule({
  declarations: [
    SecuritiesPageComponent,
    SecurityCreatePageComponent,
    SecurityEditPageComponent,
    SecurityUploadPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SecuritiesRoutingModule,
    SharedModule
  ]
})
export class SecuritiesModule {
}
