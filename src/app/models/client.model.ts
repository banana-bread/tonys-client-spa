import { BaseModel } from "./base.model";
import { Booking } from "./booking/booking.model";
import * as moment from 'moment'

export class Client extends BaseModel {

  id?: string = null;
  first_name?: string = null;
  last_name?: string = null;
  email?: string = null;
  phone?: string = null;

  constructor(data: any = {}) 
  {
    super();
    this.map(data);
  }

  dates = {}
  relations = {};

  static async authed(): Promise<Client>
  {
    const response = await Client.api.getAuthedClient()

    return new Client(response.data.client)
  }

  async upcomingBookings(): Promise<Booking[]>
  {
    const dateFrom = moment().unix().toString()
    const dateTo = moment().add(60, 'days').unix().toString()
    const response = await Client.api.getClientBookings(this.id, dateFrom, dateTo)

    return response.data.bookings.map(booking => new Booking(booking))
  }

  async passedBookings(): Promise<Booking[]>
  {
    // currently will only show bookings for past year
    const dateFrom = moment().subtract(365, 'days').unix().toString()
    const dateTo = moment().unix().toString()
    const response = await Client.api.getClientBookings(this.id, dateFrom, dateTo)

    return response.data.bookings.map(booking => new Booking(booking))
  }


  get full_name(): string
  {
    return `${this.first_name} ${this.last_name}`
  }
}
