import { Component, OnInit } from '@angular/core';
import {Booking} from '../../models/booking';
import { FormBuilder, FormControl } from '@angular/forms';
import { BookingService } from 'src/services/booking.service';

@Component({
  selector: 'app-book-now',
  templateUrl: './book-now.component.html',
  styleUrls: ['./book-now.component.css']
})
export class BookNowComponent {
bookings = this.bookingService.getBookings();
bookingForm = this.formBuilder.group({
  name: '',
  dateFrom: new Date(),
  dateTo: new Date()
  // days: new FormControl(0),
});

constructor(
  private formBuilder: FormBuilder,
  private bookingService: BookingService
) {}

calculateTotalCost(): number {
  const startDate = this.bookingForm.get('dateFrom')?.value || new Date();
  const endDate = this.bookingForm.get('dateTo')?.value || new Date;
  const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
  const numDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); // Convert milliseconds to days
  const costPerDay = 2500;
  return numDays * costPerDay;
}


onSubmit(){
  //converts formData to Booking type
  const booking: Booking = {
    name: this.bookingForm.get('name')?.value || '',
    dateFrom: this.bookingForm.get('dateFrom')?.value || new Date(),
    dateTo: this.bookingForm.get('dateTo')?.value || new Date(),
    // days: this.bookingForm.get('days')?.value || 0,
  };

  //add too bookings
  this.bookingService.addBooking(booking);
  console.log(this.bookingService.getBookings());

  //form reset
  this.bookingForm.reset();
}
}
