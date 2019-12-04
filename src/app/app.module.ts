import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {NgxMatIoBrokerConnectorServiceModule} from "ngx-mat-io-broker-connector-service";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxMatIoBrokerConnectorServiceModule,
    NgxMatIoBrokerConnectorServiceModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
