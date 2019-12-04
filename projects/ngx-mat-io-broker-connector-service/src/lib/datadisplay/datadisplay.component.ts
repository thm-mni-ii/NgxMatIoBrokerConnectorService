import {Component, Input, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {NgxMatIoBrokerConnectorService} from "../ngx-mat-io-broker-connector-service.service";

@Component({
  selector: 'ioBrokerConn-datadisplay',
  templateUrl: './datadisplay.component.html',
  styleUrls: ['./datadisplay.component.css']
})
export class DatadisplayComponent implements OnInit {

  @Input() objectPath: string;
  @Input() state: string;
  @Input() bold: boolean;
  @Input() color: string;

  value: string;

  socketServiceSubscription: Subscription;         // Represents the subscription to the behaviourSubject in the ioBrokerConn

  constructor(public ioBrokerConn: NgxMatIoBrokerConnectorService) {
  }

  ngOnInit() {
    this.socketServiceSubscription = this.ioBrokerConn.allData$
      .subscribe(x => {
        if (x.id === this.objectPath + '.' + this.state) {
          this.value = x.state.val;
        }
      });
  }
}
