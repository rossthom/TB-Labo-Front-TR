import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserEmailCheckService {
  private _apiUrl: string = environment.dataUrl

  constructor(
    private httpC : HttpClient
  ) { }


  checkUserEmailUnicity(email: string/*, entity: Entity*/){
    let encodedEmail = email.split('@').join('%40')
    return this.httpC.get<any>(this._apiUrl + "participants/?email=" + encodedEmail)
  }
}

/*
export enum Entity {
  Participant = "participants",
  Cooperative = "cooperatives"
}
*/