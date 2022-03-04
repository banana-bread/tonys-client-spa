import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Booking } from "src/app/models/booking/booking.model";

@Component({
    selector: 'app-client-booking-card',
    templateUrl: './client-booking-card.component.html',
    styleUrls: ['./client-booking-card.component.scss']
})
export class ClientBookingCardComponent {
    @Input() booking: Booking;

    @Output() cancel = new EventEmitter<Booking>();

    onCancel()
    {
        this.cancel.emit(this.booking);
    }
}
