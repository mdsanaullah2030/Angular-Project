import { Component, OnInit } from '@angular/core';
import { LocationService } from '../../service/location.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-viewlocation',
  templateUrl: './viewlocation.component.html',
  styleUrl: './viewlocation.component.css'
})

  export class ViewlocationComponent implements OnInit {
    location: any;
  
    constructor(
      private locationService: LocationService,
      private router: Router
    ) {}
  
    ngOnInit(): void {
      this.loadLocations();
    }
  
    loadLocations() {
      this.locationService.getAllLocation().subscribe((data) => {
        this.location = data;
      });
    }
  
    deleteLocation(id: string) {
      this.locationService.deleteLocation(id)
        .subscribe({
          next: res => {
            this.loadLocations();
          },
          error: error => {
            console.log(error);
          }
        });
    }
    updateLocation(id: string) {
      this.router.navigate(['/updateLocation',id]);
  
    }
    createLocation(){
      this.router.navigateByUrl('/creat');
  
    }
  }