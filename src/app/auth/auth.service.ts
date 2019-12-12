import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthToken } from './auth';
import { User } from '../users/users';
import { GlobalService } from '../global.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private registerUrl = 'http://localhost:8000/auth/register';
  private loginUrl = 'http://localhost:8000/auth/login';

  constructor(
    private http: HttpClient,
    private router: Router,
    private globalService: GlobalService
  ) { }

  registerUser(user: User): Observable<AuthToken> {
    return this.http.post<AuthToken>(this.registerUrl, user);
  }

  loginUser(user: User): Observable<AuthToken> {
    return this.http.post<AuthToken>(this.loginUrl, user);
  }

  loggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  logout(): void {
    this.globalService.actualUser = new User();
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
