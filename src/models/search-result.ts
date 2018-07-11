import { Flight } from './flight';
import { BookingDetails } from './booking-details';

export interface SearchResponse {
    oneWayFlights: Flight[];
    returningFlights?: Flight[];
    oneway: boolean;
    bookingDetails: BookingDetails;
}
