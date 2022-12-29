import { NgModule } from '@angular/core';

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
  imports: [SecuritiesRoutingModule]
})
export class SecuritiesModule {
}
