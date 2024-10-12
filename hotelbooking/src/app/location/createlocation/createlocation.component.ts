import { Component, OnInit } from '@angular/core';
import { LocationModel } from '../../model/location.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LocationService } from '../../service/location.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createlocation',
  templateUrl: './createlocation.component.html',
  styleUrl: './createlocation.component.css'
})
export class CreatelocationComponent implements OnInit{
  user: LocationModel = new LocationModel();
  formValue!: FormGroup;
  userData: any;


  constructor(
    private locationService: LocationService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {}
  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      locationname:['']
    });
  
}

createLocation() {
  this.user. locationname= this.formValue.value.locationname;


  this.locationService.createLocation(this.user).subscribe({
    next: res => {
      console.log(res);
      this.formValue.reset();
      this.router.navigate(['/view']);
    },
    error: error => {
      console.log(error);
    }
  });
}
}
