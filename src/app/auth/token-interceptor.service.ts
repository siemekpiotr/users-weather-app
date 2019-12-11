import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthService } from './auth.service';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(
    private injector: Injector,
    private auth: AuthService
  ) { }

  intercept(req, next) {
    const authService = this.injector.get(AuthService);
    const tokenReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authService.getToken()}`
      }
    });
    return next.handle(tokenReq)
      .pipe(catchError(err => { // if unautorised request
        if (err.status === 401) {
          this.auth.logout();
        }
        return Observable.throw(err);
      }));
  }
}
