import { DateValueAccessorModule } from 'angular-date-value-accessor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AlertService, HttpService } from './shared/services';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DateValueAccessorModule,
    SharedModule
  ],
  providers: [
    AlertService,
    HttpService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
