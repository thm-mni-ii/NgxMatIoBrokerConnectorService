import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatadisplayComponent } from './datadisplay.component';

describe('DatadisplayComponent', () => {
  let component: DatadisplayComponent;
  let fixture: ComponentFixture<DatadisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatadisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatadisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a specific object path', () => {
    component.objectPath = 'testObjectPath';
    expect(component.objectPath).toBe('testObjectPath');
  });

  it('should create a specific state', () => {
    component.state = 'testState';
    expect(component.state).toBe('testState');
  });

  it('should handle bold properly', () => {
    component.bold = true;
    expect(component.bold).toBe(true);
    component.bold = false;
    expect(component.bold).toBe(false);
  });
});
