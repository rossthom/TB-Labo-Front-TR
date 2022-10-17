import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailCheckService {
  private _apiUrl: string = environment.dataUrl

  constructor(
    private httpC : HttpClient
  ) { }


  checkEmailUnicity(email: string, entity: Entity){
    let encodedEmail = encodeURI(email)
    console.log(encodedEmail)
    return this.httpC.get<any>(this._apiUrl + entity + "/?email=" + encodedEmail)
  }
}

export enum Entity {
  Participant = "participants",
  Cooperative = "cooperatives"
}