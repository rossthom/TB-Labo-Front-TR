import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { switchMap, timer } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Address, GpsPosition } from '../models/types.model';

@Injectable({
  providedIn: 'root'
})
export class OsmService {
  private _nominatimUrl: string = environment.nominatimUrl
  private _openrouteUrl: string = environment.openrouteUrl


  constructor(
    private httpC : HttpClient
  ) { }


  // NOMINATIM
  private _generateNominatimQueryFrom(address: Address): string {
    let query: string = ""

    query += "postalcode=" + address.postal_code
    query += "&city=" + address.city
    if (address.street_name){
      query += "&street=" + (address.street_nb ? address.street_nb + "+" : '') + address.street_name.split(' ').join("+") + ","
    }
    query += "&format=json"
    query += "&countrycodes=be"

    //console.log(this._apiUrl + query)
    return query
  }

  getAddressGpsLongLat(address: Address){
    return this.httpC.get<any>(this._nominatimUrl + this._generateNominatimQueryFrom(address))
  }


  // OPENROUTE
  /* 🧠 Reminder
  lat (North): 50.708632 
  lon (East) : 5.6750872
  */
 /**
  * GENERATED GEOJSON DATA Recap:
  * features[0].properties.summary.distance : distance en m
  * features[0].properties.summary.duration : durée en s
  * features[0].geometry.coordinates : array of coordinates [lon, lat]
  */
  getIniterary(start: GpsPosition, end: GpsPosition){
    // lon, lat
    let url = this._openrouteUrl + `&start=${start.lon},${start.lat}&end=${end.lon},${end.lat}`
    console.log(url)
    return this.httpC.get<any>(url)
  }
}
