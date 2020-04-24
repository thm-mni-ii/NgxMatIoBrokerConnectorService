import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxMatIoBrokerConnectorServiceComponent } from './ngx-mat-io-broker-connector-service.component';
import { ChartComponent } from './chart/chart.component';
import { ChartsModule } from 'ng2-charts';
import { DatadisplayComponent } from './datadisplay/datadisplay.component';
import { LightsComponent } from './lights/lights.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {MatSliderModule} from "@angular/material";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [NgxMatIoBrokerConnectorServiceComponent, ChartComponent, DatadisplayComponent, LightsComponent],
  imports: [ChartsModule, BrowserModule,
    MatSliderModule,
    FontAwesomeModule, FormsModule],
  exports: [NgxMatIoBrokerConnectorServiceComponent, ChartComponent, DatadisplayComponent, LightsComponent]
})
export class NgxMatIoBrokerConnectorServiceModule { }
