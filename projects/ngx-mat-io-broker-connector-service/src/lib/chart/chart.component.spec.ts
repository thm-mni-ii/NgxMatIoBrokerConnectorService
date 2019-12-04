import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ChartsModule} from 'ng2-charts';

import {ChartComponent} from './chart.component';
import {NgxMatIoBrokerConnectorService} from "../ngx-mat-io-broker-connector-service.service";

describe('ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChartComponent],
      imports: [ChartsModule],
      providers: [NgxMatIoBrokerConnectorService, ChartComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartComponent);
    component = fixture.componentInstance;
    component.type = 'line';
    component.alias ='Alias';
    component.objectPath = 'deconz.0.Sensors.2';
    component.state = 'buttonevent';
    component.maxEntries = 10;
    component.color = {'borderColor': 'black', 'backgroundColor': 'yellow'};
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    const testComponent: ChartComponent = TestBed.get(ChartComponent);
    expect(testComponent).toBeTruthy();
  });

  it('should create a line chart', () => {
    component.type = 'line';
    component.maxEntries = 10;
    component.color = {'borderColor': 'black', 'backgroundColor': 'yellow'};
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.type).toBe('line');
  });

  it('should create a pie chart', () => {
    component.color = {'borderColor': 'black',
      'backgroundColors': ['#4cee17','#e5d92d','#a9b88d','#41096a','#6015fc','#59cf51','#290f9b','#9ac621']};
    component.type = 'pie';
    expect(component.type).toBe('pie');
  });

  it('should create a specific alias', () => {
    component.alias = 'testAlias';
    expect(component.alias).toBe('testAlias');
  });

  it('should create a specific object path', () => {
    component.objectPath = 'testObjectPath';
    expect(component.objectPath).toBe('testObjectPath');
  });

  it('should create a specific state', () => {
    component.state = 'testState';
    expect(component.state).toBe('testState');
  });
});
