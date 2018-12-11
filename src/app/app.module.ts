import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
// import { Ng4GeoautocompleteModule } from 'ng4-geoautocomplete';

import { AgmCoreModule } from '@agm/core';//MapsAPILoader
import { NgxSpinnerModule } from 'ngx-spinner';
import { AppComponent } from './app.component';
import { WeatherService } from './weatherService';
// import { SearchWeatherComponent } from './search-weather/search-weather.component';

@NgModule({
  declarations: [
    AppComponent,
    // SearchWeatherComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDpLinSwELhfBinHNdvDshxofmr9nF_Ank',
      libraries: ['places']
    }),
    NgxSpinnerModule
    // Ng4GeoautocompleteModule.forRoot()
  ],
  providers: [
    // {provide: MapsAPILoader, useValue: null},
    WeatherService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
