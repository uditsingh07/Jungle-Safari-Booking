import { EventEmitter, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Booking } from 'src/models/booking';


@Injectable({
  providedIn: 'root'
})
export class BookingService {
  bookings: Booking[] = [];
  bookingDeleted: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  addBooking(booking: Booking) {
    booking.days = this.totalDays(booking);
    booking.totalCost = this.calculateTotalCost(booking);
    this.bookings.push(booking);
  }
  updateBooking(index: number, booking: Booking): Observable<Booking> {
    booking.days = this.totalDays(booking);
    booking.totalCost = this.calculateTotalCost(booking);

    this.bookings[index] = booking;
    return of(this.bookings[index]);
  }

  getBooking(index: number): Booking {
    return this.bookings[index];
  }
  getBookings() {
    return this.bookings;
  }

  deleteBooking(index: number): Observable<Booking[]> {
    this.bookings.splice(index, 1);
    return of(this.bookings);
  }
  clearBookings() {
    this.bookings = [];
    return this.bookings;
  }

  /**
   * returns number of Days or -1
   * @param booking
   */
  private totalDays(booking: Booking): number {
    if (booking.dateFrom && booking.dateTo) {
      return (booking.dateTo.valueOf() - booking.dateFrom.valueOf()) / (1000 * 3600 * 24);
    }
      return -1;
  }
  public calculateTotalCost(booking: Booking): number {
    const startDate = booking.dateFrom
    const endDate = booking.dateTo
    const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
    const numDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); // Convert milliseconds to days
    const costPerDay = 2500;
    return numDays * costPerDay;
  }
}
