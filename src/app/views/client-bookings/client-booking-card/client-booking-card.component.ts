import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Booking } from "src/app/models/booking.model";

@Component({
    selector: 'app-client-booking-card',
    templateUrl: './client-booking-card.component.html',
    styleUrls: ['./client-booking-card.component.scss']
})
export class ClientBookingCardComponent {
    @Input() booking: Booking;

    @Output() cancel = new EventEmitter<Booking>();

    getServices(): string
    {
        return this.booking.services.map(service =>
            service.name
        ).join(', ');
    }

    onCancel()
    {
        this.cancel.emit(this.booking);
    }
}
