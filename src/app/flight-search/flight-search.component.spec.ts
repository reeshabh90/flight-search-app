import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FlightSearchComponent } from './flight-search.component';
import { FormsModule } from '../../../node_modules/@angular/forms';
import { AppMaterialModules } from '../material.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '../../../node_modules/@angular/platform-browser/animations';

describe('FlightSearchComponent', () => {
  let component: FlightSearchComponent;
  let fixture: ComponentFixture<FlightSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({

      imports: [FormsModule, AppMaterialModules, HttpClientModule, BrowserAnimationsModule],
      declarations: [ FlightSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
