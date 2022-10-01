import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
  HttpClientXsrfModule,
  HttpXsrfTokenExtractor
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { Injectable } from "@angular/core";
import { AuthService } from "src/app/shared/service/auth.service";
import { filter, pairwise } from 'rxjs/operators';


@Injectable()
export class HeadersInterceptor implements HttpInterceptor {
  previousUrl: string;


  constructor(
    private router: Router,
    private tokenExtractor: HttpXsrfTokenExtractor
    ) {

router.events
  .pipe(
    filter((event): event is NavigationEnd => event instanceof NavigationEnd)
  )
  .subscribe(event => {
    this.previousUrl = event.url;
  });
   }




  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    if (!request.headers.has("Content-Type")) {
      request = request.clone({
        setHeaders: {
          "content-type": "application/json",
        },
      });
    }

    request = request.clone({
      headers: request.headers.set("Accept", "application/json"),
    });

    request = request.clone({
      withCredentials: true,
    });



    const headerName = "X-XSRF-TOKEN";
    const CookieName = "XSRF-TOKEN";
    let token = this.tokenExtractor.getToken() as string;
    if (token !== null && !request.headers.has(headerName)) {
      request = request.clone({ headers: request.headers.set(headerName, token) });
    }
    if (token !== null && !request.headers.has(CookieName)) {
      request = request.clone({ headers: request.headers.set(CookieName, token) });
    }

    return next.handle(request).pipe(

      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          localStorage.clear();
          this.router.navigate(["auth/login"]);
        }
        return throwError(error);
      })
    );
  }
}
