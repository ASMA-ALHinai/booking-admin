import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';
import { BookingTable } from '../models/booking-model';

import { HttpBackend, HttpClient , HttpClientModule , HTTP_INTERCEPTORS ,HttpClientXsrfModule} from '@angular/common/http';
import { environment } from "../../../environments/environment";
import { catchError, map } from "rxjs/operators";

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  constructor(public http: HttpClient,public handler: HttpBackend) { }

  /**
   * @method { getAllBusiness API call }
   * @param params
   */


  getAllappointments(params:any) {
    return this.http
      .get(`${environment.bookingBaseUrl}admin/appointments` , {params :params})
      .pipe(
        map((data) => data),
        catchError((error) => {
          throw error;
        })
      );
  }

  getWorkingDays(params:any) {
    return this.http
      .get(`${environment.bookingBaseUrl}admin/working_days` , {params :params})
      .pipe(
        map((data) => data),
        catchError((error) => {
          throw error;
        })
      );
  }


  ChangeAppointmentStatus(params: any) {
    return this.http
      .put(`${environment.bookingBaseUrl}admin/appointments/change-status` ,  params)
      .pipe(
        map((data) => data),
        catchError((error) => {
          throw error;
        })
      );
  }

  addDateTime(params: any) {
    return this.http
      .post(`${environment.bookingBaseUrl}admin/working_days/time` ,  params)
      .pipe(
        map((data) => data),
        catchError((error) => {
          throw error;
        })
      );
  }


  addTimeToDay(params: any) {
    return this.http
      .post(`${environment.bookingBaseUrl}working_times` ,  params)
      .pipe(
        map((data) => data),
        catchError((error) => {
          throw error;
        })
      );
  }


  changePaymentStatus(params: any) {
    return this.http
      .put(`${environment.bookingBaseUrl}admin/appointments/change-payment-status` ,  params)
      .pipe(
        map((data) => data),
        catchError((error) => {
          throw error;
        })
      );
  }

  DeleteAppointments(id:any) {
    return this.http
      .delete(`${environment.bookingBaseUrl}admin/appointments/${id}`)
      .pipe(
        map((data) => data),
        catchError((error) => {
          throw error;
        })
      );
  }

  DeleteWorkingDays(id:any) {
    return this.http
      .delete(`${environment.bookingBaseUrl}admin/working_days/${id}`)
      .pipe(
        map((data) => data),
        catchError((error) => {
          throw error;
        })
      );
  }
 
}
