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
   *
   * @param searchParams Search flight availability based on Booking Details recieved in Search parameters
   */
  public searchFlightAvailability(searchParams: BookingDetails) {
    return this.http.get(apiUrl)
      .pipe(map(data => this.flightSearch(data, searchParams)));
  }

  /**
   * fetch the list of cities from data available
   */
  public getCityList() {
    return this.http.get(apiUrl)
      .pipe(map(data => this.extractCities(data)));
  }

  /**
   * Filter out cities from data available for Flight Booking.
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
   * Flight search after sorting out data based on Fare
   * @param data;
   */
  private flightSearch(data: any, searchParams: BookingDetails) {
    data.flights.map(x => x.fare = parseInt(x.fare, 10));
    const allFlights: Flight[] = data.flights;
    return this.getAvailableFlights(this.sortFlightArray(allFlights), searchParams);
  }

  /**
   * Method to sort flights based on fare
   * @param flightData;
   */
  private sortFlightArray(flightData: Flight[]) {
    flightData.sort((x, y) => {
      return x.fare - y.fare;
    });
    return flightData;
  }

  /**
   * Filtered list of flights from the data available
   * @param sortedFlightData;
   * @param searchParams;
   */
  private getAvailableFlights(sortedFlightData: Flight[], searchParams: BookingDetails) {
    const filteredItmes: Flight[] = [];
    const dataInRange: Flight[] = [];
    sortedFlightData.map((x) => {
      x.fare <= searchParams.refine ? dataInRange.push(x) : console.log('Not in range');
    });
    dataInRange.map((x) => {
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

  /**
   *
   * @param date Date Formattter
   */
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
