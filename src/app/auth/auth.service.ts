import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthToken } from './auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private registerUrl = 'http://localhost:8000/auth/register';
  private loginUrl = 'http://localhost:8000/auth/login';

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  registerUser(user): Observable<AuthToken> {
    return this.http.post<AuthToken>(this.registerUrl, user);
  }

  loginUser(user): Observable<AuthToken> {
    return this.http.post<AuthToken>(this.loginUrl, user);
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
