import { Component } from '@angular/core';
import { SearchResponse } from '../models/search-result';
import { BookingDetails } from '../models/booking-details';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  bookingInfo: BookingDetails;
  searchResults: SearchResponse;
  loading = true;
  fly = false;

  public updateInputParams(searchResults: SearchResponse) {
    console.log('Ok got that emitted value mate', searchResults);
    this.bookingInfo = searchResults.bookingDetails;
    this.searchResults = searchResults;
  }

  public swapLoading(loading: boolean) {
    console.log('Swapping', loading);
    this.loading = loading;
  }

}
