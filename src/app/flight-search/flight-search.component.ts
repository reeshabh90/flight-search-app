import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Flight } from '../../models/flight';
import { BookingDetails } from '../../models/booking-details';
import { SearchResponse } from '../../models/search-result';
import { FlightSearchService } from '../flight-search.service';
import { map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css']
})
export class FlightSearchComponent implements OnInit {

  @Output() searchResults = new EventEmitter<SearchResponse>();
  @Output() loadingComponent = new EventEmitter<boolean>();
  public bookingDetails: BookingDetails;
  public filteredOriginCities = [];
  public filteredDestinationCities = [];
  public citiesList = [];
  constructor(private flightService: FlightSearchService) {
    this.bookingDetails = {
      destination: 'mumbai', source: 'pune', departDate: new Date(), returnDate: new Date(), oneway: true, passengers: 1,
      refine: 5000
    };
  }

  ngOnInit() {
    this.flightService.getCitiesListedOnServer().subscribe(cities => {
      this.citiesList = cities; console.log('city list', this.citiesList);
    });

  }

  changeBookingType(type: boolean) {
    this.bookingDetails.oneway = type;
  }

  onSubmit() {
    this.bookingDetails.destination = this.bookingDetails.destination.toLowerCase();
    this.bookingDetails.source = this.bookingDetails.source.toLowerCase();
    console.log('refine', this.bookingDetails.refine);
    this.search(this.bookingDetails);
  }

  onSelectionChanged(city: string, isOrigin: boolean) {
    isOrigin ? this.bookingDetails.source = city : this.bookingDetails.destination = city;
    isOrigin ? this.filteredOriginCities = [] : this.filteredDestinationCities = [];
  }

  suggestCity(city: string, isOrigin: boolean) {
    city = city.toLowerCase(); // convert to lowercase
    isOrigin ? this.filteredOriginCities = [] : this.filteredDestinationCities = [];
    if (city) {
      this.citiesList.filter((item) => {
        if (item.includes(city)) {
          isOrigin ? this.filteredOriginCities.push(item) : this.filteredDestinationCities.push(item);
        }
      });
    }
  }

  search(searchParams: BookingDetails) {
    if (searchParams.oneway) {
      let flights;
      this.performSearch(searchParams).subscribe(res => {
        flights = res;
        if (flights) {
          const searchResults: SearchResponse = {
            oneWayFlights: flights, oneway: true,
            returningFlights: [], bookingDetails: searchParams
          };
          this.searchResults.emit(searchResults);
          this.loadingComponent.emit(false);
        }
      });
    } else {
      let oneWayFlights;
      this.performSearch(searchParams).subscribe(res => {
        oneWayFlights = res;
        if (oneWayFlights) {
          const returnSearchParams: BookingDetails = {
            source: searchParams.destination,
            destination: searchParams.source,
            departDate: searchParams.returnDate,
            refine: searchParams.refine,
            passengers: searchParams.passengers,
            oneway: true
          };
          let returningFlights;
          this.performSearch(returnSearchParams).subscribe(result => {
            returningFlights = result;
            if (returningFlights) {
              const searchResults: SearchResponse = {
                oneWayFlights: oneWayFlights,
                oneway: false,
                returningFlights: returningFlights,
                bookingDetails: searchParams
              };
              this.searchResults.emit(searchResults);
              this.loadingComponent.emit(false);
            }
          });
        }
      });
    }
  }


  performSearch(searchParams: BookingDetails) {
    let flightList: Flight[];
    return this.flightService.searchFlightAvailability(searchParams)
      .pipe(map((flights: Flight[]) => {
        flightList = flights;
        return flightList;
      }));
  }
}


