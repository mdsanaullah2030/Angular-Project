import { Component, OnInit } from '@angular/core';
import { RoomService } from '../../service/room.service';
import { HotelService } from '../../service/hotel.service';
import { Router } from '@angular/router';
import { LocationService } from '../../service/location.service';
import { BookingService } from '../../service/booking.service';
import { BookingModel } from '../../model/booking.model';

@Component({
  selector: 'app-viewbooking',
  templateUrl: './viewbooking.component.html',
  styleUrl: './viewbooking.component.css'
})
export class ViewbookingComponent implements OnInit {


  locations: any;
  rooms: any;
  hotels: any;
  bookings: any;



  constructor(
    private roomService: RoomService,
    private hotelService: HotelService,
    private locationService: LocationService,
    private bookingService: BookingService,
    private router: Router,
  ) {

  }
  ngOnInit(): void {
    this.rooms = this.roomService.getAllBkingforRoom();
    this.hotels = this.hotelService.getAllHotelforRoom();
    this.bookings = this.bookingService.viewAllBooking();
    this.locations = this.locationService.getAllLocationforHotel();
  }

  loadBooking() {
    this.bookingService.viewAllBooking().subscribe({
      next: (data) => {
        this.bookings = data;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }





  
  deleteBooking(id: string): void {
    this.bookingService.deleteBooking(id).subscribe({
      next: () => {
        this.loadBooking(); 
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
  
  updateBooking(id: BookingModel): void {
    this.router.navigate(['/updateBooking',id]);
  }
  AddBooking(){
    this.router.navigateByUrl('/creat');

  }
}
