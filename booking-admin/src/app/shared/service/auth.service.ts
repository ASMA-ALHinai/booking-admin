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
export class AuthService {
  constructor(public http: HttpClient,public handler: HttpBackend) { }

 login(params: any) {
    return this.http
      .post(`${environment.bookingBaseUrl}admin/login` ,  params)
      .pipe(
        map((data) => data),
        catchError((error) => {
          throw error;
        })
      );
  }
}
