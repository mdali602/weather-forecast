import { Component, ViewChild, ElementRef, NgZone, OnInit } from '@angular/core';
import {} from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import { NgxSpinnerService } from 'ngx-spinner';

import { WeatherService} from './weatherService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('search') public searchElement: ElementRef;
  title = 'openWeatherMap';
  weatherForecasts: any[] = [];
  constructor(
    private mapsAPILoader: MapsAPILoader,
    private spinner: NgxSpinnerService,
    private ngZone: NgZone,
    private weatherService: WeatherService) {
  }

  ngOnInit() {
    this.searchElement.nativeElement.focus();
    this.mapsAPILoader.load().then(() => {
      let autoComplete = new google.maps.places.Autocomplete(this.searchElement.nativeElement, { types: ['address'] });
      autoComplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autoComplete.getPlace();
          if(place.geometry === undefined || place.geometry === null) {
            // called when user select suggested location.
            this.getWeatherByCityName(place.name);
            return;
          }
          // called when user type his own location and press Enter.
          this.getWeatherByLatLng(place.geometry.location.lat(), place.geometry.location.lng());
        })
      })
    });
  }

  getWeathers(arr) {
    arr.map((obj, index) => {
      let today = new Date();
      obj.date = new Date();
      obj.date.setDate(today.getDate() + index);
      obj.weather.map(w => {
        if(w.description.toLowerCase().indexOf('cloud') !== -1) {
          obj.imgUrl = 'cloud';
        } else if(w.description.toLowerCase().indexOf('rain') !== -1) {
          obj.imgUrl = 'rain';
        } else if(w.description.toLowerCase().indexOf('clear') !== -1) {
          obj.imgUrl = 'clear_sky';
        } else {
          obj.imgUrl = 'clear_sky';//use default 
        }
      });
    });
    return arr;
  }
  //get weatherForcast using latitude and longitude
  getWeatherByLatLng(lat, lng) {
    this.spinner.show();
    this.weatherService.getWeatherByLatLon(lat, lng).subscribe((res) => {
      this.weatherForecasts.length = 0;
      let list = res && res['list'];
      this.weatherForecasts = this.getWeathers(list);
      this.spinner.hide();
  }, (err) => {
      console.log(err, 'Error');
      this.weatherForecasts.length = 0;
      this.spinner.hide();
    });
  }


  //get weatherForcast using cityName
  getWeatherByCityName(cityName) {
    this.spinner.show();
    this.weatherService.getWeatherByCityName(cityName).subscribe((res) => {
      this.weatherForecasts.length = 0;
      let list = res && res['list'];      
      this.weatherForecasts = this.getWeathers(list);
      this.spinner.hide();
  }, (err) => {
      console.log(err, 'Error');
      this.weatherForecasts.length = 0;
      this.spinner.hide();
    });
  }

}
