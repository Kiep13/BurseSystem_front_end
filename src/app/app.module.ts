import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {FileInputValueDirective} from './shared/direcrives/file-input-value-accessor.directive';
import { HeaderComponent } from './components/blocks/header/header.component';
import { SpinnerComponent } from './components/blocks/spinner/spinner.component';
import { TotalPageComponent } from './components/totalpage/total-page.component';
import { PaginationPipe } from './shared/pipes/pagination.pipe';
import { DateValueAccessorModule} from 'angular-date-value-accessor';
import { YesNoPipe } from './shared/pipes/yes-no.pipe';
import { PaginationBlockComponent } from './components/blocks/pagination-block/pagination-block.component';
import { NoDataBlockComponent } from './components/blocks/no-data-block/no-data-block.component';
import { SmallSpinnerComponent } from './components/blocks/small-spinner/small-spinner.component';
import { AlertComponent } from './components/blocks/alert/alert.component';
import { AlertService} from './shared/services/alert-service';

@NgModule({
  declarations: [
    AppComponent,
    FileInputValueDirective,
    HeaderComponent,
    SpinnerComponent,
    TotalPageComponent,
    PaginationPipe,
    YesNoPipe,
    PaginationBlockComponent,
    NoDataBlockComponent,
    SmallSpinnerComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DateValueAccessorModule
  ],
  providers: [
    AlertService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
