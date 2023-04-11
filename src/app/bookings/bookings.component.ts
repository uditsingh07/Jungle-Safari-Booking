import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Booking } from 'src/models/booking';
import { BookingService } from 'src/services/booking.service';


@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit{
bookings: Booking[] = this.bookingService.getBookings();

constructor(
  private bookingService: BookingService,
  private router: Router
  ) {}
  ngOnInit(): void {

  }
  modifyBooking(i:number){

    this.router.navigate(['/edit-booking/'+i]);
  }
  deleteBooking(index:number){
    console.log ("bookings pehle wali", this.bookings);
    this.bookingService.deleteBooking(index).subscribe(() => {
      this.bookings = JSON.parse(JSON.stringify( this.bookingService.getBookings()));
      console.log ("bookings now", this.bookings);
    })
  }
}
