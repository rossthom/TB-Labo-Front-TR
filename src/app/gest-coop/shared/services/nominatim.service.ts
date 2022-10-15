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

  /* TODO:
  Before starting that, I need to know how and where I can check whether the result is OK or not to re-execute the query with another deepness.
   * Add a notion of deepness:
   * by default, deepness = 4, meaning we use postal_code, city, street_name and street_nb.
   * if such request fails, we decrease deepness and re-execute the query.
   */
  private _generateNominatimQueryFrom(address: Address /* TODO: add deepness: number */): string {
    let query: string = ""
    //console.log(address)

    query += "postalcode=" + address.postal_code
    // TODO: if deepness = 2: use city
    query += "&city=" + address.city
    // TODO: if deepness = 3: use street name
    // TODO: if deepness = 4: use street number
    if (address.street_name){
      query += "&street=" + (address.street_nb ? address.street_nb + "+" : '') + address.street_name.split(' ').join("+") + ","
    }
    query += "&format=json"
    query += "&countrycodes=be"

    console.log(this._apiUrl + query)
    return query
  }

  getAddressGpsLongLat(address: Address /* TODO:add deepness=4 */){
    return this.httpC.get<any>(this._apiUrl + this._generateNominatimQueryFrom(address /* TODO: , deepness */))
  }
}
