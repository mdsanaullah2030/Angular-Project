import { Component, OnInit } from '@angular/core';
import { RoomModel } from '../../model/room.model';
import { HotelModel } from '../../model/hotel.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RoomService } from '../../service/room.service';
import { HotelService } from '../../service/hotel.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-updateroom',
  templateUrl: './updateroom.component.html',
  styleUrl: './updateroom.component.css'
})
export class UpdateroomComponent implements OnInit {
  room: RoomModel = new RoomModel();
  hotels: HotelModel[] = [];
  roomId: string = "";
  roomForm!: FormGroup;

  roomtyp: { value: string, label: string, price: number }[] = [
    { value: 'Single Room', label: 'Single Room', price: 5000 },
    { value: 'Double Room', label: 'Double Room', price: 7000 },
    { value: 'Triple Room', label: 'Triple Room', price: 9000 },
    { value: 'Family Room', label: 'Family Room', price: 12000 },
    { value: 'Superior Room', label: 'Superior Room', price: 15000 },
    { value: 'Executive Room', label: 'Executive Room', price: 20000 },
    { value: 'Presidential Suite', label: 'Presidential Suite', price: 30000 },
  ];

  constructor(
    private roomService: RoomService,
    private hotelService: HotelService,
    private formBuilder: FormBuilder, 
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.roomId = this.route.snapshot.params['id'];
    this.roomForm = this.formBuilder.group({
      roomtype: [''],
      adults: [''],
      children: [''],
      price: [{ value: '', disabled: true }], // Disabled input as price is auto-calculated
      hotel: this.formBuilder.group({
        id: [''],
        hotelname: ['']
      })
    });
    this.loadHotel();
    this.loadRoomDetails();
    this.roomForm.get('roomtype')?.valueChanges.subscribe(() => {
      this.updatePriceBasedOnRoomtype();
    });
  }

  updatePriceBasedOnRoomtype() {
    const selectedRoom = this.roomtyp.find(room => room.value === this.roomForm.get('roomtype')?.value);
    if (selectedRoom) {
      this.roomForm.patchValue({ price: selectedRoom.price });
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

  loadRoomDetails(): void {
    this.roomService.getByRoomId(this.roomId).subscribe({
      next: (room: RoomModel) => {
        this.room = room;
        this.roomForm.patchValue({
          roomtype: room.roomtype,
          adults: room.adults,
          children: room.children,
          price: room.price,
          hotel: room.hotel
        });
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  updateRoom(): void {
    const updatedRoom: RoomModel = {
      ...this.room,
      ...this.roomForm.getRawValue() 
    };

    this.roomService.updateRoom(updatedRoom).subscribe({
      next: () => {
        this.roomForm.reset();
        this.router.navigate(['/roomview']);
      },
      error: (err) => {
        console.error('Error updating room:', err);
      }
    });
  }
}