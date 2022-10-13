import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IAddress } from '../models/address.model';

@Injectable({
  providedIn: 'root'
})
export class NominatimService {
  private _apiUrl: string = environment.nominatimUrl

  constructor(
    private httpC : HttpClient
  ) { }

  private _generateNominatimQueryFrom(address: IAddress): string {
    let query: string = ""

    query += "postalcode=" + address.postal_code
    query += "&city=" + address.city
    query += "&street=" + address.street_nb + "+" + address.street_name.split(' ').join("+") + ","
    query += "&format=json"

    console.log(this._apiUrl + query)
    return query
  }

  getAddressGpsLongLat(address: IAddress){
    return this.httpC.get<any>(this._apiUrl + this._generateNominatimQueryFrom(address))
  }
}
