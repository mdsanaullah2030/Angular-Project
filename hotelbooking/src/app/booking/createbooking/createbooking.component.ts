import { Component } from '@angular/core';
import { LocationModel } from '../../model/location.model';
import { HotelModel } from '../../model/hotel.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RoomModel } from '../../model/room.model';
import { BookingModel } from '../../model/booking.model';
import { HotelService } from '../../service/hotel.service';
import { LocationService } from '../../service/location.service';
import { Router } from '@angular/router';
import { RoomService } from '../../service/room.service';
import { BookingService } from '../../service/booking.service';

@Component({
  selector: 'app-createbooking',
  templateUrl: './createbooking.component.html',
  styleUrl: './createbooking.component.css'
})
export class CreatebookingComponent {
  bookingSuccess: boolean = false;
  locations: LocationModel[] = [];
  hotels: HotelModel[] = [];
  rooms: RoomModel[] = [];
  BookingForm!: FormGroup;
  booking: BookingModel = new BookingModel();

  roomtyp: { value: string, label: string, price: number }[] = [
    { value: 'Single Room', label: 'Single Room', price: 5000 },
    { value: 'Double Room', label: 'Double Room', price: 7000 },
    { value: 'Triple Room', label: 'Triple Room', price: 9000 },
    { value: 'Family Room', label: 'Family Room', price: 12000 },
    { value: 'Superior Room', label: 'Superior Room', price: 15000 },
    { value: 'Executive Room', label: 'Executive Room', price: 17000 },
    { value: 'Presidential Suite', label: 'Presidential Suite', price: 20000 },
  ];

  constructor(
    private hotelService: HotelService,
    private locationService: LocationService,
    private roomService: RoomService,
    private bookingService: BookingService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.BookingForm = this.formBuilder.group({
      username: [''],
      checkindate: [''],
      checkoutdate: [''],
      totalprice: [{ value: '' }],
      room: this.formBuilder.group({
        roomtype: [''],
      }),
      hotel: this.formBuilder.group({
        hotelname: [''],
      }),
      location: this.formBuilder.group({
        locationname: [''],
      }),
    });

    this.loadLocation();
    this.loadHotel();
    this.loadRoom();

    this.BookingForm.get('room')?.get('roomtype')?.valueChanges.subscribe(() => {
      this.updatePrice();
      this.calculateNightsAndCost();
    });

    this.BookingForm.get('checkindate')?.valueChanges.subscribe(() => {
      this.calculateNightsAndCost();
    });

    this.BookingForm.get('checkoutdate')?.valueChanges.subscribe(() => {
      this.calculateNightsAndCost();
    });
  }

  updatePrice() {
    const roomType = this.BookingForm.get('room')?.get('roomtype')?.value;
    const selectedRoom = this.roomtyp.find(r => r.value === roomType);
    if (selectedRoom) {
      this.BookingForm.patchValue({ totalprice: selectedRoom.price });
    }
  }

  calculateNightsAndCost() {
    const checkinDate = new Date(this.BookingForm.get('checkindate')?.value);
    const checkoutDate = new Date(this.BookingForm.get('checkoutdate')?.value);

    if (checkinDate && checkoutDate && checkinDate < checkoutDate) {
      const timeDifference = checkoutDate.getTime() - checkinDate.getTime();
      const totalNights = timeDifference / (1000 * 3600 * 24);
//The expression timeDifference / (1000 * 3600 * 24); is used to convert a time difference (typically in milliseconds) into days.//
      const roomType = this.BookingForm.get('room')?.get('roomtype')?.value;
      const selectedRoom = this.roomtyp.find(r => r.value === roomType);

      if (selectedRoom) {
        const totalPrice = totalNights * selectedRoom.price;
        this.BookingForm.patchValue({ totalprice: totalPrice });
      }
    } else {
      this.BookingForm.patchValue({ totalprice: 0 });
    }
  }

  loadRoom() {
    this.roomService.getAllBkingforRoom().subscribe({
      next: res => {
        this.rooms = res;
      },
      error: error => {
        console.log(error);
      }
    });
  }

  loadHotel() {
    this.hotelService.getAllHotelforRoom().subscribe({
      next: res => {
        this.hotels = res;
      },
      error: error => {
        console.log(error);
      }
    });
  }

  loadLocation() {
    this.locationService.getAllLocationforHotel().subscribe({
      next: res => {
        this.locations = res;
      },
      error: error => {
        console.log(error);
      }
    });
  }

  createBooking() {
    this.booking.username = this.BookingForm.value.username;
    this.booking.checkindate = this.BookingForm.value.checkindate;
    this.booking.checkoutdate = this.BookingForm.value.checkoutdate;
    this.booking.totalprice = this.BookingForm.value.totalprice;
    this.booking.room = this.BookingForm.value.room;
    this.booking.hotel = this.BookingForm.value.hotel;
    this.booking.location = this.BookingForm.value.location;

    this.bookingService.createBooking(this.booking).subscribe({
      next: res => {
        this.bookingSuccess = true;
        this.BookingForm.reset();

        
        setTimeout(() => {
          this.bookingSuccess = false;
          this.router.navigate(['booking']);
        }, 5000); // Redirect after 3 seconds
      },
      error: error => {
        console.log(error);
      }
    });
  }
}