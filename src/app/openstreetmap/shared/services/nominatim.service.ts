import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Address } from '../models/types.model';

@Injectable({
  providedIn: 'root'
})
export class NominatimService {
  private _apiUrl: string = environment.nominatimUrl

  constructor(
    private httpC : HttpClient
  ) { }


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
    return this.httpC.get<any>(this._apiUrl + this._generateNominatimQueryFrom(address))
  }
}
