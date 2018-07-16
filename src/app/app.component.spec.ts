import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MockComponent } from 'ng2-mock-component';
import { AppMaterialModules } from './material.module';


describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppMaterialModules],
      declarations: [
        AppComponent,
         MockComponent({ selector: 'app-flight-search' }),
         MockComponent({ selector: 'app-flight-details', inputs: ['searchResults'] })
      ],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
