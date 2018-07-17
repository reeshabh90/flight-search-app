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
    this.bookingInfo = searchResults.bookingDetails;
    this.searchResults = searchResults;
  }

  public toggle(loading: boolean) {
    this.loading = loading;
  }

}
