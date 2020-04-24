import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LightsComponent} from './lights.component';
import {MatSliderModule} from "@angular/material";
import {FormsModule} from "@angular/forms";
import {NO_ERRORS_SCHEMA} from "@angular/core";

describe('LightsComponent', () => {
  let component: LightsComponent;
  let fixture: ComponentFixture<LightsComponent>;

  class MockedSliderDataChangedFunction {
    lightbulbState;
    newValue;

    sliderDataChanged(eventData: any) {
      if (this.lightbulbState) {
        this.newValue = eventData;
      }
    }
  }

  class MockedClickLightbulbFunction {
    lightbulbState;

    clickLightbulb() {
      if (this.lightbulbState) {
        this.lightbulbState = false;
      } else {
        this.lightbulbState = true;
      }
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LightsComponent],
      imports: [MatSliderModule, FormsModule],
      providers: [LightsComponent],
      schemas:[NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LightsComponent);
    component = fixture.componentInstance;
    component.objectPath = "deconz.0.Lights.2";
    component.onState = "on";
    component.brightnessState = "bri";
    component.alias = "Wohnzimmer";
    component.minValue = 0;
    component.maxValue = 255;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    const testComponent: LightsComponent = TestBed.get(LightsComponent);
    expect(testComponent).toBeTruthy();
  });

  it('should create a function that handles the slider data changes', () => {
    expect(component.sliderDataChanged).toBeTruthy();
  });

  it('should create a function that handles the click on the lightbulb icons', () => {
    expect(component.clickLightbulb).toBeTruthy();
  });

  it('should handle the sliderDataChanged function properly when lightbulb is turned on', () => {
    let mock = new MockedSliderDataChangedFunction();
    mock.lightbulbState = true;
    mock.sliderDataChanged(100);
    expect(mock.newValue).toBe(100);
    mock.sliderDataChanged(255);
    expect(mock.newValue).toBe(255);
    mock.sliderDataChanged(3);
    expect(mock.newValue).toBe(3);
  });

  it('should handle the sliderDataChanged function properly when lightbulb is turned off', () => {
    let mock = new MockedSliderDataChangedFunction();
    mock.lightbulbState = false;
    mock.sliderDataChanged(100);
    expect(mock.newValue).toBe(undefined);
    mock.sliderDataChanged(255);
    expect(mock.newValue).toBe(undefined);
    mock.sliderDataChanged(3);
    expect(mock.newValue).toBe(undefined);
  });

  it('should handle the clickLightbulb function properly', () => {
    let mock = new MockedClickLightbulbFunction();
    mock.lightbulbState = true;
    mock.clickLightbulb();
    expect(mock.lightbulbState).toBe(false);
    mock.clickLightbulb();
    expect(mock.lightbulbState).toBe(true);
    mock.clickLightbulb();
    expect(mock.lightbulbState).toBe(false);
    mock.clickLightbulb();
    expect(mock.lightbulbState).toBe(true);
  });
});
