import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { SecuritiesRoutingModule } from './securities-routing.module';
import {
  SecuritiesComponent,
  SecurityFormComponent,
  SecurityUploadComponent
} from './components';

@NgModule({
  declarations: [
    SecuritiesComponent,
    SecurityFormComponent,
    SecurityUploadComponent
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
