import { Component } from '@angular/core';
import { BookingModel } from '../../model/booking.model';
import { RoomModel } from '../../model/room.model';
import { HotelModel } from '../../model/hotel.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LocationModel } from '../../model/location.model';
import { RoomService } from '../../service/room.service';
import { HotelService } from '../../service/hotel.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationService } from '../../service/location.service';
import { BookingService } from '../../service/booking.service';

@Component({
  selector: 'app-updatebooking',
  templateUrl: './updatebooking.component.html',
  styleUrl: './updatebooking.component.css'
})
export class UpdatebookingComponent {
  booking: BookingModel = new BookingModel();
  rooms: RoomModel[] = [];
  hotels: HotelModel[] = [];
  locations: LocationModel[] = [];
  bookingId: string = "";
  bookingForm!: FormGroup;

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
    private roomService: RoomService,
    private bookingService: BookingService,
    private hotelService: HotelService,
    private formBuilder: FormBuilder,
    private locationService: LocationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.bookingId = this.route.snapshot.params['id'];
    this.bookingForm = this.formBuilder.group({
      username: [''],
      checkindate: [''],
      checkoutdate: [''],
      totalprice: [{ value: '', disabled: true }],
      room: this.formBuilder.group({
        id: [''],
        roomtype: [''],
      }),
      hotel: this.formBuilder.group({
        id: [''],
        hotelname: [''],
      }),
      location: this.formBuilder.group({
        id: [''],
        locationname: [''],
      }),
    });

    this.loadLocation();
    this.loadHotel();
    this.loadRoom();
    this.loadBooking();

    this.bookingForm.get('room')?.get('roomtype')?.valueChanges.subscribe(() => {
      this.calculateNightsAndCost();
    });

    this.bookingForm.get('checkindate')?.valueChanges.subscribe(() => {
      this.calculateNightsAndCost();
    });

    this.bookingForm.get('checkoutdate')?.valueChanges.subscribe(() => {
      this.calculateNightsAndCost();
    });
  }

  calculateNightsAndCost(): void {
    const checkinDate = new Date(this.bookingForm.get('checkindate')?.value);
    const checkoutDate = new Date(this.bookingForm.get('checkoutdate')?.value);

    if (checkinDate && checkoutDate && checkinDate < checkoutDate) {
      const timeDifference = checkoutDate.getTime() - checkinDate.getTime();
      const totalNights = timeDifference / (1000 * 3600 * 24);

      const roomType = this.bookingForm.get('room')?.get('roomtype')?.value;
      const selectedRoom = this.roomtyp.find(r => r.value === roomType);

      if (selectedRoom) {
        const totalPrice = totalNights * selectedRoom.price;
        this.bookingForm.patchValue({ totalprice: totalPrice });
      }
    } else {
      this.bookingForm.patchValue({ totalprice: 0 });
    }
  }

  loadHotel(): void {
    this.hotelService.getAllHotelforRoom().subscribe({
      next: (res: HotelModel[]) => {
        this.hotels = res;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  loadRoom(): void {
    this.roomService.getAllBkingforRoom().subscribe({
      next: (res: RoomModel[]) => {
        this.rooms = res;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  loadLocation(): void {
    this.locationService.getAllLocationforHotel().subscribe({
      next: (res: LocationModel[]) => {
        this.locations = res;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  loadBooking(): void {
    this.bookingService.getByBookingId(this.bookingId).subscribe({
      next: (booking: BookingModel) => {
        this.booking = booking;
        this.bookingForm.patchValue({
          username: booking.username,
          checkindate: booking.checkindate,
          checkoutdate: booking.checkoutdate,
          totalprice: booking.totalprice,
          room: booking.room,
          hotel: booking.hotel,
          location: booking.location,
        });
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  updateBooking(): void {
    const updateBooking: BookingModel = {
      ...this.booking,
      ...this.bookingForm.getRawValue()
    };

    this.bookingService.updateBooking(updateBooking).subscribe({
      next: () => {
        this.bookingForm.reset();
        this.router.navigate(['/booking']);
      },
      error: (err) => {
        console.error('Error updating booking:', err);
      }
    });
  }
}