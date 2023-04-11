import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Booking } from 'src/models/booking';
import { BookingService } from 'src/services/booking.service';


@Component({
  selector: 'app-edit-booking',
  templateUrl: './edit-booking.component.html',
  styleUrls: ['./edit-booking.component.css']
})
export class EditBookingComponent {
  booking: Booking;
  index: number;

  constructor(
    private bookingService: BookingService,
    private route: ActivatedRoute,
    private router: Router
  ) {

    this.index = Number(this.route.snapshot.paramMap.get('index'));
    this.booking = this.bookingService.getBooking(this.index);
  }

  ngOnInit(): void {
    // this.index = Number(this.route.snapshot.paramMap.get('index'));
    // this.booking = this.bookingService.getBooking(this.index);
  }

  calculateTotalCost(): number {
    const startDate = this.booking.dateFrom
    const endDate = this.booking.dateTo
    const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
    const numDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); // Convert milliseconds to days
    const costPerDay = 2500;
    return numDays * costPerDay;
  }

  onSubmit(): void {
    // update the booking
    this.bookingService.updateBooking(this.index, this.booking).subscribe(() => {
      // navigate back to the bookings page
      this.router.navigate(['/bookings']);
    });
  }
}
