import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

    return query
  }

  getAddressGpsLongLat(address: Address){
    return this.httpC.get<any>(this._nominatimUrl + this._generateNominatimQueryFrom(address))
  }


  // OPENROUTE
  /*  ℹ️ Reminder
  lat (North): 50.708632 
  lon (East) : 5.6750872
  */
  getIniterary(start: GpsPosition, end: GpsPosition){
    // ℹ️ URI: lon, lat
    let url = this._openrouteUrl + `&start=${start.lon},${start.lat}&end=${end.lon},${end.lat}`
    return this.httpC.get<any>(url)
  }
}
