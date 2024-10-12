import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { HotelModel } from '../model/hotel.model';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  baseUrl: string = "http://localhost:3000/hotel";
  constructor(private http: HttpClient) { }


  viewAllHotel(): Observable<any> {
    return this.http.get(this.baseUrl);

  }

  createHotel(hotel: HotelModel): Observable<HotelModel> {
    return this.http.post<HotelModel>(`${this.baseUrl}`, hotel);
  }
  deleteHotel(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }


  updateHotel(hotel: HotelModel): Observable<HotelModel> {
    console.log(hotel);
    return this.http.put<HotelModel>(this.baseUrl + '/' + hotel.id, hotel);

  }

  getByHoteluId(hoteleId: string): Observable<HotelModel> {
    return this.http.get<HotelModel>(this.baseUrl + '/' + hoteleId);

  }

  getAllHotelforRoom(): Observable<HotelModel[]> {
    return this.http.get<HotelModel[]>(this.baseUrl)
      .pipe(
        catchError(this.handleError)
      )

  }



  searchHotelsByLocation(locationName: string): Observable<HotelModel[]> {
  
    const params = new HttpParams().set('location.locationname', locationName);  
    return this.http.get<HotelModel[]>(this.baseUrl, { params });
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(() => new Error('test'));
  }


}
