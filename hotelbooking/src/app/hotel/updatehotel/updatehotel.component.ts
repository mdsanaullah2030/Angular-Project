import { Component, OnInit } from '@angular/core';
import { HotelModel } from '../../model/hotel.model';
import { LocationModel } from '../../model/location.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LocationService } from '../../service/location.service';
import { HotelService } from '../../service/hotel.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-updatehotel',
  templateUrl: './updatehotel.component.html',
  styleUrl: './updatehotel.component.css'
})
export class UpdatehotelComponent implements OnInit {
  hotel: HotelModel = new HotelModel();
  locations: LocationModel[] = [];
  hoteleId: string = "";
  hotelForm!: FormGroup;

  rating: { value: string, label: string }[] = [
    { value: '**', label: '**' },
    { value: '***', label: '***' },
    { value: '****', label: '****' },
    { value: '*****', label: '*****' },
  ];

  constructor(
    private locationService: LocationService,
    private hotelService: HotelService,
    private formBuilder: FormBuilder, 
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.hoteleId = this.route.snapshot.params['id'];
    this.hotelForm = this.formBuilder.group({
      image: [''],
      hotelname: [''],
      address : [''],
      rating: [''],
      location: this.formBuilder.group({
        id: [undefined],
        locationname: [undefined]
      })
    });

    this.loadLocation();
    this.loadHotelDetails();
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

  loadHotelDetails(): void {
    this.hotelService.getByHoteluId(this.hoteleId).subscribe({
      next: (hotel: HotelModel) => {
        this.hotel = hotel; 
        this.hotelForm.patchValue({
          image: hotel.image,
          hotelname: hotel.hotelname,
          address: hotel.address,
          rating: hotel.rating,
          location: hotel.location
        });
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  updateHotel(): void {
    const updatedHotel: HotelModel = {
      ...this.hotel,
      ...this.hotelForm.value
    };

    this.hotelService.updateHotel(updatedHotel).subscribe({
      next: () => {
        this.hotelForm.reset();
        this.router.navigate(['/hotelview']);
      },
      error: (err) => {
        console.error('Error updating hotel:', err);
      }
    });
  }
}