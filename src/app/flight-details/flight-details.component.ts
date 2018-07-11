import { Component, OnInit, Input } from '@angular/core';
import { SearchResponse } from '../../models/search-result';

@Component({
  selector: 'app-flight-details',
  templateUrl: './flight-details.component.html',
  styleUrls: ['./flight-details.component.css']
})
export class FlightDetailsComponent implements OnInit {

  constructor() { }
  @Input() searchResults: SearchResponse;
  ngOnInit() {
  }

}
