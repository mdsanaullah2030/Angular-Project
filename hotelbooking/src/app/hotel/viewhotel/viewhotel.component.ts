import { Component, OnInit } from '@angular/core';
import { LocationService } from '../../service/location.service';
import { HotelService } from '../../service/hotel.service';
import { Router } from '@angular/router';
import { HotelModel } from '../../model/hotel.model';

@Component({
  selector: 'app-viewhotel',
  templateUrl: './viewhotel.component.html',
  styleUrl: './viewhotel.component.css'
})
export class ViewhotelComponent implements OnInit{

    hotels: HotelModel[] = [];
    locations: any;
    locationName: string = '';
    errorMessage: string = '';
  
    constructor(
      private locationService: LocationService,
      private hotelService: HotelService,
      private router: Router
    ) {}
  
    ngOnInit(): void {
       this.loadHotels();
       this.locations = this.locationService.getAllLocationforHotel();
    }


    searchHotels(): void {
      if (this.locationName.trim()) {
        this.hotelService.searchHotelsByLocation(this.locationName).subscribe({
          next: (hotels) => {
            this.hotels = hotels;
            this.errorMessage = '';
          },
          error: (error) => {
            this.errorMessage = 'Error fetching hotels. Please try again later.';
            console.error(error);
          }
        });
      } else {
        this.errorMessage = 'Please enter a location to search.';
      }
    }



  
    loadHotels() {
      this.hotelService.viewAllHotel().subscribe({
        next: (data) => {
          this.hotels = data;
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
  
    deleteHotel(id: string) {
      this.hotelService.deleteHotel(id).subscribe({
        next: (res) => {
          
          this.loadHotels();
        },
        error: (er) => {
          console.error(er);
        }
      });
    }
  
    editHotel(hotel: HotelModel): void {
      this.router.navigate(['/updateHotel', hotel.id]);

  
    }
  

  }



