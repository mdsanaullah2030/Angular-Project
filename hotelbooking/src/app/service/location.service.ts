import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { LocationModel } from '../model/location.model';


@Injectable({
  providedIn: 'root'
})
export class LocationService {
 


  baseUrl: string ="http://localhost:3000/location"
  constructor(private httpClient: HttpClient) { }

  getAllLocation(): Observable<any> {
    return this.httpClient.get(this.baseUrl);
  }

  createLocation(user: LocationModel): Observable<any> {
    return this.httpClient.post(this.baseUrl, user);
  }

  deleteLocation(id: string): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/${id}`);
  }

  updateLocation(id: string, location: LocationModel): Observable<any> {

    return this.httpClient.put(this.baseUrl + "/" + id, location);

  }

  getById(id: string): Observable<any> {

    return this.httpClient.get(this.baseUrl + "/" + id);
  }


  getAllLocationforHotel():Observable<LocationModel[]>{
    return this.httpClient.get<LocationModel[]>(this.baseUrl)
      .pipe(
        catchError(this.handleError)
      )

  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(() => new Error('test'));
  }
}
