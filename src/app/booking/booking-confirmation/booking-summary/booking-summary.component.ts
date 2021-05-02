import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-booking-summary',
  templateUrl: './booking-summary.component.html',
  styleUrls: ['./booking-summary.component.scss']
})
export class BookingSummaryComponent implements OnInit {

  @Output() create = new EventEmitter<null>();

  // TODO: this component in useless... just move it into booking-confirmation.
  constructor() { }

  ngOnInit(): void {}


}
