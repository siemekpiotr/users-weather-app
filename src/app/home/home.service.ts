import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserInfo } from './home';
import { Forecast } from './home-weather/weather';
import { User } from '../users/users';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  // private getUserInfoUrl = 'api/userinfo';

  constructor(
    private http: HttpClient,
  ) { }

  // getUserInfo(): Observable<User> {
  //   return this.http.get<User>(this.getUserInfoUrl);
  // }

  getWeatherForecast(city: string): Observable<Forecast> {
    return this.http.get<Forecast>(`weather/data/2.5/forecast?q=${city}&units=metric&appid=${environment.WEATHER_API_KEY}`);
  }
}
