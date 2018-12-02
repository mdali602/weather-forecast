import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay, catchError } from 'rxjs/operators';
import * as env from '../environments/environment';

const BASE_URL = env.environment.apiUrl;
const API_KEY = env.environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getWeatherByCityName(cityName) {
    let params = new HttpParams()
    .set('q', cityName)
    .set('units', 'metric')
    .set('cnt', '5')
    .set('APPID', API_KEY)
    return this.http.get(BASE_URL + 'forecast', {params: params})
      .pipe(
        delay(100),
        catchError(this.handleError)
      );
  }

  getWeatherByLatLon(lat, lng) {
    let params = new HttpParams()
    .set('lat', lat)
    .set('lon', lng)
    .set('cnt', '5')
    .set('APPID', API_KEY)
    return this.http.get(BASE_URL + 'forecast', {params: params})
      .pipe(
        delay(100),
        catchError(this.handleError)
      );
  }
  private handleError(error: any) {
    let errorMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';

    return Observable.throw(errorMsg);
  }
}
