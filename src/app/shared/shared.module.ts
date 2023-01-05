import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {
  AlertComponent,
  HeaderComponent,
  NoDataBlockComponent,
  PaginationBlockComponent,
  SmallSpinnerComponent,
  SpinnerComponent,
  TableComponent
} from './components';
import { FileInputValueDirective } from './direcrives';
import { YesNoPipe } from './pipes';

const COMPONENTS = [
  AlertComponent,
  HeaderComponent,
  NoDataBlockComponent,
  PaginationBlockComponent,
  SmallSpinnerComponent,
  SpinnerComponent,
  TableComponent
];

const DIRECTIVES = [ FileInputValueDirective ];

const PIPES = [
  YesNoPipe
];

@NgModule({
  declarations: [
    ...COMPONENTS,
    ...DIRECTIVES,
    ...PIPES
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    ...COMPONENTS,
    ...DIRECTIVES,
    ...PIPES
  ]
})
export class SharedModule {
}
