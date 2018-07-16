import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { FlightSearchComponent } from './flight-search/flight-search.component';
import { AppMaterialModules } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '../../node_modules/@angular/common/http';
import { FlightDetailsComponent } from './flight-details/flight-details.component';
import { FlightInfoComponent } from './flight-info/flight-info.component';

@NgModule({
  declarations: [
    AppComponent,
    FlightSearchComponent,
    FlightDetailsComponent,
    FlightInfoComponent
  ],
  imports: [
    BrowserModule, FormsModule, AppMaterialModules, BrowserAnimationsModule, HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
