import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { catchError } from 'rxjs/operators';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.authService.currentUser) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.authService.firebaseToken}`
        }
      });
    }

    return next
      .handle(request)
      .pipe(catchError(err => {
        if (err.status === 401) {
          this.authService.logout();
          location.reload();
        } else {
          this.router.navigate(['auth/login']);
          const error = err.error.message || err.statusText;
          return throwError(error);
        }
      }));
  }
}
