import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxMatIoBrokerConnectorServiceComponent } from './ngx-mat-io-broker-connector-service.component';
import { ChartComponent } from './chart/chart.component';
import { ChartsModule } from 'ng2-charts';
import { DatadisplayComponent } from './datadisplay/datadisplay.component';

@NgModule({
  declarations: [NgxMatIoBrokerConnectorServiceComponent, ChartComponent, DatadisplayComponent],
  imports: [ChartsModule, BrowserModule],
  exports: [NgxMatIoBrokerConnectorServiceComponent, ChartComponent, DatadisplayComponent]
})
export class NgxMatIoBrokerConnectorServiceModule { }
