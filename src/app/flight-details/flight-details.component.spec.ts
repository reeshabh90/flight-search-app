import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppMaterialModules } from '../material.module';
import { FlightDetailsComponent } from './flight-details.component';
import { DebugElement } from '../../../node_modules/@angular/core';
import { By } from '@angular/platform-browser';

describe('FlightDetailsComponent', () => {
  let component: FlightDetailsComponent;
  let fixture: ComponentFixture<FlightDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppMaterialModules],
      declarations: [FlightDetailsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightDetailsComponent);
    component = fixture.componentInstance;
    component.searchResults = {
      'bookingDetails': {
        source: '', destination: '',
        oneway: true, passengers: 1, refine: 1000, departDate: new Date()
      },
      oneway: true, oneWayFlights: [], returningFlights: []
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
