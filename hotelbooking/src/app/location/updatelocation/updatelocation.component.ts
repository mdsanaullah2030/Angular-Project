import { Component, OnInit } from '@angular/core';
import { LocationService } from '../../service/location.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationModel } from '../../model/location.model';

@Component({
  selector: 'app-updatelocation',
  templateUrl: './updatelocation.component.html',
  styleUrl: './updatelocation.component.css'
})
export class UpdatelocationComponent implements OnInit {

  location: LocationModel = new LocationModel();
  id: string = "";

  constructor(
    private locationService: LocationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.locationService.getById(this.id).subscribe({
      next: (res) => {
        console.log(res);
        this.location = res;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  updateLocation() {
    this.locationService.updateLocation(this.id, this.location).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/view']);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}