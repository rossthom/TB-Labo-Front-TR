import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserDtoNew, UserView } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  private _apiUrl: string = environment.dataUrl

  userIsConnected: boolean = false


  constructor(
    private httpC : HttpClient
  ) { }


  createUser(user: UserDtoNew){
    // TODO: check database if pwd is valid
    /*
    return this.httpC.post(
      this._apiUrl + "participants",
      user
      ).pipe(
        // TODO: not working, execute the patch before getting response from Nominatim...
        switchMap(_ => this.nominatimService.getAddressGpsLongLat(user.address)
        .pipe(
          map((res: any) => {
            user.gps = <GpsPosition>{lon: parseFloat(res[0].lon), lat: parseFloat(res[0].lat)}
            return user
          })
        )
      )
    )
    */    
  }

  login(remember: boolean){
    // TODO: check database if pwd is valid
    /*
    return this.httpC.get<UserView>(this._apiUrl+"participants")
      .pipe(
        tap(() => {
          // TODO: 
          //this.userIsConnected = true;


          if (remember){
            localStorage.setItem("userIsConnected", JSON.stringify(this.userIsConnected))
          }
          else {
            sessionStorage.setItem("userIsConnected", JSON.stringify(this.userIsConnected))
          }
        })
      )
    }
    */
  }

  logout(){
    localStorage.removeItem('isConnect')
    sessionStorage.removeItem('isConnect')
    this.userIsConnected = false;
  }
}
