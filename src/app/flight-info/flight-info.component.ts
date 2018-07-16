import { Component, OnInit, Input } from '@angular/core';
import { BookingDetails } from '../../models/booking-details';

@Component({
  selector: 'app-flight-info',
  templateUrl: './flight-info.component.html',
  styleUrls: ['./flight-info.component.css']
})
export class FlightInfoComponent implements OnInit {
  @Input() queriedData: BookingDetails;
  constructor() { }

  ngOnInit() {
  }

}
