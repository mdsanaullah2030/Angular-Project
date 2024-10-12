import { Component, OnInit } from '@angular/core';
import { RoomModel } from '../../model/room.model';
import { HotelModel } from '../../model/hotel.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RoomService } from '../../service/room.service';
import { HotelService } from '../../service/hotel.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createroom',
  templateUrl: './createroom.component.html',
  styleUrl: './createroom.component.css'
})
export class CreateroomComponent implements OnInit{
 
    rooms: RoomModel[] = [];
    hotels: HotelModel[] = [];
    roomForm!: FormGroup;
    room: RoomModel = new RoomModel();
  
    roomtyp: { value: string, label: string, price: number }[] = [
      { value: 'Single Room', label: 'Single Room', price: 5000 },
      { value: 'Double Room', label: 'Double Room', price: 7000 },
      { value: 'Triple Room', label: 'Triple Room', price: 9000 },
      { value: 'Family Room', label: 'Family Room', price: 12000 },
      { value: 'Superior Room', label: 'Superior Room', price: 15000 },
      { value: 'Executive Room', label: 'Executive Room', price: 170000 },
      { value: 'Presidential Suite', label: 'Presidential Suite', price: 20000 },
    ];
  
    constructor(
      private roomService: RoomService,
      private hotelService: HotelService,
      private formBuilder: FormBuilder,
      private router: Router
    ) { }
  
    ngOnInit(): void {
      this.loadHotel();
      this.roomForm = this.formBuilder.group({
        roomtype: [''],
        adults: [''],
        children: [''],
        price: [''],
        image:[''],
  
        hotel: this.formBuilder.group({
          id: [''],
          hotelname: [''],
        })
      });
  
      this.roomForm.get('hotel')?.get('hotelname')?.valueChanges.subscribe(hotelname => {
        const selectedHotel = this.hotels.find(loc => loc.hotelname === hotelname);
        if (selectedHotel) {
          this.roomForm.patchValue({ hotel: selectedHotel });
        }
      });
  
      this.roomForm.get('roomtype')?.valueChanges.subscribe(roomtype => {
        const selectedRoomType = this.roomtyp.find(rt => rt.value === roomtype);
        if (selectedRoomType) {
          this.roomForm.patchValue({ price: selectedRoomType.price });
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
  
    createRoom() {
      this.room.roomtype = this.roomForm.value.roomtype;
      this.room.adults = this.roomForm.value.adults;
      this.room.children = this.roomForm.value.children;
      this.room.price = this.roomForm.value.price;
      this.room.hotel = this.roomForm.value.hotel;
      this.room.image = this.roomForm.value.image;
  
      this.roomService.createRoom(this.room).subscribe({
        next: res => {
          this.roomForm.reset();
          this.router.navigate(['roomview']);
        },
        error: error => {
          console.log(error);
        }
      });
    }
  }