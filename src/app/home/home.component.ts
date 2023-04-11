import { Component } from '@angular/core';
import { BookingService } from 'src/services/booking.service';
import {Booking} from '../../models/booking';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

constructor(
  private bookingService: BookingService
) {}
  quickPopulate() {
    let bookings: Booking[] = [
      {
        name: "Raj",
        dateFrom: new Date('2023-04-15'),
        dateTo: new Date('2023-04-17'),
      },
      {
        name: "Jay",
        dateFrom: new Date('2023-04-18'),
        dateTo: new Date('2023-04-19'),
      },
      {
        name: "Shiavam",
        dateFrom: new Date('2023-04-18'),
        dateTo: new Date('2023-04-19'),
      },
      {
        name: "Rahul",
        dateFrom: new Date('2023-04-12'),
        dateTo: new Date('2023-04-16'),
      },
    ]
    bookings.forEach(booking => {
      this.bookingService.addBooking(booking);
    });
  // this.bookingService.
}
}
