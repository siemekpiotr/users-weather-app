import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Forecast } from './home-weather/weather';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private weatherApiUrl = 'weather/data/2.5/forecast';

  constructor(
    private http: HttpClient,
  ) { }

  getWeatherForecast(city: string): Observable<Forecast> {
    return this.http.get<Forecast>(this.weatherApiUrl + `?q=${city}&units=metric&appid=${environment.WEATHER_API_KEY}`);
  }
}
