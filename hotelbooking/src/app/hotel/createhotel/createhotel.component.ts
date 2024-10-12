import { Component, OnInit } from '@angular/core';
import { LocationModel } from '../../model/location.model';
import { HotelModel } from '../../model/hotel.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HotelService } from '../../service/hotel.service';
import { LocationService } from '../../service/location.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createhotel',
  templateUrl: './createhotel.component.html',
  styleUrl: './createhotel.component.css'
})
export class CreatehotelComponent implements OnInit {

  locations: LocationModel[] = [];
  hotels: HotelModel[] = [];
  hotelForm!: FormGroup;
  hotel: HotelModel = new HotelModel();



   
  rating: { value: string, label: string }[] = [
    { value: '**', label: '**' },
    { value: '***', label: '***' },
    { value: '****', label: '****' },
    { value: '*****', label: '*****' },
  ];

  constructor(
    private hotelService: HotelService,
    private locationService: LocationService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}
 
  ngOnInit(): void {
    this.loadLocation();

    this.hotelForm = this.formBuilder.group({
      image:[''],
      hotelname: [''],
      address: [''],
      rating: [''],
      location: this.formBuilder.group({
        id:[''],
        locationname: [''],
      }),
    })

    this.hotelForm.get('location')?.get('locationname')?.valueChanges
    .subscribe(locationname => {
      const selectedLocation = this.locations.find(loc => loc.locationname === locationname);
      if (selectedLocation) {
        this.hotelForm.patchValue({location:selectedLocation});
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

  createHotel() {
    this.hotel.image = this.hotelForm.value.image;
    this.hotel.hotelname = this.hotelForm.value.hotelname;
    this.hotel.address = this.hotelForm.value.address;
    this.hotel.rating = this.hotelForm.value.rating;
    this.hotel.location = this.hotelForm.value.location;

    this.hotelService.createHotel(this.hotel).subscribe({
      next: res => {
        this.hotelForm.reset();
        this.router.navigate(['hotelview']);
      },
      error: error => {
        console.log(error);
      }
    });
  }
}