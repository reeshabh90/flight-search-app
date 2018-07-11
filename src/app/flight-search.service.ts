import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Flight } from '../models/flight';
import { BookingDetails } from '../models/booking-details';
import { map } from 'rxjs/operators';

const apiUrl = 'assets/flight-data.json';
@Injectable({
  providedIn: 'root'
})
export class FlightSearchService {

  constructor(private http: HttpClient) { }

  /**
 * Search for availablity of flight from server(JSON data in this case)
 * @param searchParams;
 */
  public searchFlightAvailability(searchParams: BookingDetails) {
    return this.http.get(apiUrl)
      .pipe(map(data => this.searchAndSort(data, searchParams)));
  }

  /**
   * Gets the cities available for search from server.
   * NOTE: Usually server side code provides a REST api
   * to get teh cities availablr for search thereby reducing 
   * client side dependency. Thin client approach :)
   */
  public getCitiesListedOnServer() {
    return this.http.get(apiUrl)
      .pipe(map(data => this.extractCities(data)));
  }

  /**
   * Extracts and returns filtered array of cities,
   * available on server.
   * @param flightData;
   */
  public extractCities(flightData: any) {
    const allCities: string[] = [];
    flightData.flights.map(x => {
      allCities.push(x.source);
      allCities.push(x.destination);
    });

    const distinctCities = allCities.filter((x, index, originalArr) => {
      return index === originalArr.indexOf(x);
    });
    return distinctCities;
  }

  /**
   * Sorts the incoming data and sends for searching
   * @param data;
   */
  private searchAndSort(data: any, searchParams: BookingDetails) {
    data.flights.map(x => x.fare = parseInt(x.fare, 10));
    const allFlights: Flight[] = data.flights;
    return this.getMatchingItemsFromArray(this.sortFlightArray(allFlights), searchParams);
  }

  /**
   * Sort the flight data w.r.t amount
   * @param flightData;
   */
  private sortFlightArray(flightData: Flight[]) {
    flightData.sort((x, y) => {
      return x.fare - y.fare;
    });
    return flightData;
  }

  /**
   * Returns a new array of matching items based on search.
   * @param sortedFlightData;
   * @param searchParams;
   */
  private getMatchingItemsFromArray(sortedFlightData: Flight[], searchParams: BookingDetails) {
    const filteredItmes: Flight[] = [];
    // create a new array which contains the items that are ;
    // in our range to make. Makes sense , eases pain :P
    const dataInRange: Flight[] = [];
    sortedFlightData.map((x) => {
      x.fare <= searchParams.refine ? dataInRange.push(x) : console.log('Not in range');
    });
    dataInRange.map((x) => {
      // console.log('x', x.date.toString().slice(0, 10));
      // console.log('searchparam', this.formatDate(searchParams.departDate));
      if (x.date.toString().slice(0, 10) === this.formatDate(searchParams.departDate).toString()) {
        if ((x.source === searchParams.source
          && x.destination === searchParams.destination)) {
          filteredItmes.push(x);
        }
      }
    });
    console.log('filter', filteredItmes);
    return filteredItmes;
  }

  private formatDate(date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    month.length < 2 ? (month = '0' + month) : month = month;
    day.length < 2 ? (day = '0' + day) : day = day;

    return [year, month, day].join('-');
  }
}
