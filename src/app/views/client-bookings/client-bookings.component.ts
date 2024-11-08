import { Component, OnDestroy, OnInit } from '@angular/core';
import { SnackbarNotificationService } from '@tonys-barbers/shared';
import { Subscription } from 'rxjs';
import { ConfirmDialogService } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { Booking } from 'src/app/models/booking.model';
import { Client } from 'src/app/models/client.model';
import { AppStateService } from 'src/app/services/app-state.service';

@Component({
  selector: 'app-client-bookings',
  templateUrl: './client-bookings.component.html',
  styleUrls: ['./client-bookings.component.scss']
})
export class ClientBookingsComponent implements OnInit, OnDestroy {

  client = new Client();
  clientSubscription: Subscription;
  upcomingBookings: Booking[] = [];
  pastBookings: Booking[] = [];

  constructor(
    private appState: AppStateService,
    private confirmDialog: ConfirmDialogService,
    private notifications: SnackbarNotificationService,
  ) { }

  async ngOnInit(): Promise<void> 
  {
    this.client = this.appState.authedClient;

    this.clientSubscription = this.appState.authedClient$
      .subscribe(async (response) => {
        this.appState.setLoading(true);

        if (!response.id) return;

        this.client = new Client(response);
        await this._getBookings();
        this.appState.setLoading(false);
    })
  }

  ngOnDestroy(): void 
  {
    this.clientSubscription.unsubscribe();
  }

  async onCancelBooking(booking: Booking): Promise<void> 
  {
    const shouldCancel = await this.confirmDialog.open({
      title: 'Confirm Cancellation',
      message: 'Are you sure you want to cancel this booking?',
    })

    if (! shouldCancel) { return; }

    this.appState.setLoading(true);

    try 
    {
      await booking.cancel()
      this.notifications.success('Booking cancelled');
      await this._getBookings();
    }
    catch (error) 
    {
      this.notifications.error(error.error.message)
    }
    finally
    {
      this.appState.setLoading(false);
    }
  }

  private async _getBookings(): Promise<void>
  {
    this.upcomingBookings = await this.client.upcomingBookings()
    this.pastBookings =  await this.client.passedBookings()
  }
}
