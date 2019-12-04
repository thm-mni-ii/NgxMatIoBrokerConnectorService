import {Component, Input, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {NgxMatIoBrokerConnectorService} from "../ngx-mat-io-broker-connector-service.service";
import {ChartDataSets, ChartOptions} from 'chart.js';
import {Label} from 'ng2-charts';

@Component({
  selector: 'ioBrokerConn-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  @Input() type: any;
  @Input() alias: string;
  @Input() objectPath: string;
  @Input() state: string;
  @Input() maxEntries: number;
  @Input() color: any;

  borderColor: string;

  socketServiceSubscription: Subscription;         // Represents the subscription to the behaviourSubject in the ioBrokerConn

  public lineChartData: ChartDataSets[] = [
    {data: [], label: ''},
  ];
  public lineChartLabels: Label[] = [];
  public lineChartOptions = {
    responsive: true
  };
  public lineChartColors: any[] = [
    {
      borderColor: '',
      backgroundColor: '',
    },
  ];
  public lineChartLegend = true;
  public lineChartType = '';
  public lineChartPlugins = [];

  constructor(public ioBrokerConn: NgxMatIoBrokerConnectorService) {
  }

  // Sets the chartColors and chart data initially
  ngOnInit() {
    this.lineChartType = this.type;

    if (this.type !== 'line') {
      this.borderColor = this.color.borderColor;
    }

    if (this.type === 'line') {
      this.lineChartColors = [
        {
          borderColor: this.color.borderColor,
          backgroundColor: this.color.backgroundColor,
        },
      ];
    } else {
      this.lineChartColors = [{
        backgroundColor: [],
        borderColor: []
      }];
    }

    this.lineChartData = [
      {data: [], label: this.alias}
    ];

    // Subscribes to the behaviourSubject in the socketService
    // that returns data whenever the socket adapter sends something to the data service
    // The returned data is filtered for the correct objectPath and state and then assigned to value
    // It then calls the addValue function and sends the value with it
    this.socketServiceSubscription = this.ioBrokerConn.allData$
      .subscribe(x => {
        if (x.id === this.objectPath + '.' + this.state) {
          let value = x.state.val;
          this.addValue(value);
        }
      });
  }

  // Function that adds a value to the chart arrays
  // Data is being handled differently, depending on the chart type
  // For a line chart, each value has to be stored individually
  // For other types of charts, like pie or bar charts, the values have to be cumulated and then stored in one value that
  // add them together
  addValue(value: any) {
    if (this.type === 'line') {
      this.lineChartData[0].data.push(value);
      this.lineChartLabels.push(value.toString());

      while (this.lineChartData[0].data.length > this.maxEntries) {
        this.lineChartData[0].data.shift();
        this.lineChartLabels.shift();
      }
    } else {
      if (this.lineChartLabels.includes(value.toString())) {
        let index = this.lineChartLabels.indexOf(value.toString());
        let helpArray: any[] = this.lineChartData[0].data;
        helpArray[index]++;

        this.lineChartData[0].data = [];
        for (let i = 0; i < helpArray.length; i++) {
          this.lineChartData[0].data.push(helpArray[i]);
        }
      } else {
        if (this.color.backgroundColors[this.lineChartLabels.length] !== undefined) {
          this.lineChartColors[0]['backgroundColor'].push(this.color.backgroundColors[this.lineChartLabels.length]);
          this.lineChartColors[0]['borderColor'].push(this.borderColor);
          this.lineChartLabels.push(value.toString());
          this.lineChartData[0].data.push(1);
        } else {
          let string = '#' + (0x1000000 + Math.random() * 0xFFFFFF).toString(16).substr(1, 6);
          while (this.lineChartColors[0]['backgroundColor'].includes(string)) {
            string = '#' + (0x1000000 + Math.random() * 0xFFFFFF).toString(16).substr(1, 6);
          }
          this.lineChartColors[0]['backgroundColor'].push(string);
          this.lineChartColors[0]['borderColor'].push(this.borderColor);
          this.lineChartLabels.push(value.toString());
          this.lineChartData[0].data.push(1);
        }
      }
    }
  }
}
