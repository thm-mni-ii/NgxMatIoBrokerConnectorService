import {Component, Input, OnInit} from '@angular/core';
import {NgxMatIoBrokerConnectorService} from "../ngx-mat-io-broker-connector-service.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'ioBrokerConn-lights',
  templateUrl: './lights.component.html',
  styleUrls: ['./lights.component.css']
})
export class LightsComponent implements OnInit {

  @Input() objectPath: string;
  @Input() onState: string;
  @Input() brightnessState: string;
  @Input() alias: string;
  @Input() minValue: number;
  @Input() maxValue: number;

  lightbulbState: boolean = true;
  sliderValue: number;

  socketServiceSubscription: Subscription;         // Represents the subscription to the behaviourSubject in the ioBrokerConn

  constructor(public ioBrokerConn: NgxMatIoBrokerConnectorService) {
  }

  ngOnInit(): void {
    this.socketServiceSubscription = this.ioBrokerConn.allData$
      .subscribe(x => {
        if (x.id === this.objectPath + '.' + this.onState) {
          if (this.lightbulbState != x.state.val) {
            this.lightbulbState = x.state.val;
            this.clickLightbulb();
          }
        }
        if (x.id === this.objectPath + '.' + this.brightnessState) {
          if (this.brightnessState != x.state.val) {
              this.sliderValue = x.state.val;
          }
        }
      });

    let this2 = this;
    setTimeout(function () {
      this2.sliderValue = this2.ioBrokerConn.getter(this2.objectPath, this2.brightnessState, 'val');
      this2.lightbulbState = this2.ioBrokerConn.getter(this2.objectPath, this2.onState, 'val');
    }, 1000);
  }

  sliderDataChanged(eventData: any) {
    if (this.lightbulbState) {
      this.ioBrokerConn.setter(this.objectPath, this.brightnessState, eventData.value);
    }
  }

  clickLightbulb() {
    if (this.lightbulbState) {
      this.ioBrokerConn.setter(this.objectPath, this.onState, false);
      this.lightbulbState = false;
    } else {
      this.ioBrokerConn.setter(this.objectPath, this.onState, true);
      this.ioBrokerConn.setter(this.objectPath, this.brightnessState, this.sliderValue);
      this.lightbulbState = true;
    }
  }
}
