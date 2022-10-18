import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, mergeMap } from 'rxjs';
import { GpsPosition } from 'src/app/openstreetmap/shared/models/types.model';
import { NominatimService } from 'src/app/openstreetmap/shared/services/nominatim.service';
import { environment } from 'src/environments/environment';
import { UserDtoNew, UserLogin } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  private _apiUrl: string = environment.dataUrl
  private _userIsConnectedKey = environment.userIsConnectedKey
  private _userIdKey = environment.userIdKey

  userIsConnected: boolean = false
  $userIsConnected: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.verifyLogged())
  

  constructor(
    private httpC : HttpClient,
    private nominatimService: NominatimService
  ) {
    this.verifyLogged()
    this.emit_isConnect()
  }


  createUser(user: UserDtoNew){
    return this.nominatimService.getAddressGpsLongLat(user.address)
      .pipe(
        mergeMap(res => {
          return this.httpC.post(
            this._apiUrl + "participants",
            { ...user, gps: <GpsPosition>{lon: parseFloat(res[0].lon), lat: parseFloat(res[0].lat)}}
          )
        })
      )
  }

  verifyLogged(): boolean {
    let tmpIsConnect = localStorage.getItem(this._userIsConnectedKey)
    if (!tmpIsConnect) {
      tmpIsConnect = sessionStorage.getItem(this._userIsConnectedKey)
    }

    this.userIsConnected = tmpIsConnect == 'true'
    return this.userIsConnected
  }

  checkLogin(email: string, password: string){
    // Merci Dorian !
    return this.httpC.get<UserLogin[]>(this._apiUrl+"participants")
      .pipe(
        // 🤢 On reprend tous les users, je sais, mais c'est parce qu'on simule un backend
        map(users => users.filter(user => user.email === email && user.password === password))
      )
  }

  login(userId: number, remember: boolean) {
    this.userIsConnected = true
    this.emit_isConnect()
    if (remember) {
      localStorage.setItem(this._userIsConnectedKey, "true")
      localStorage.setItem(this._userIdKey, userId.toString())
      //alert('Login (remember me) !!')
    }
    else{
      sessionStorage.setItem(this._userIsConnectedKey, "true")
      sessionStorage.setItem(this._userIdKey, userId.toString())
      //alert('Login !!')
    }
  }

  logout(){
    localStorage.removeItem(this._userIsConnectedKey)
    localStorage.removeItem(this._userIdKey)
    sessionStorage.removeItem(this._userIsConnectedKey)
    sessionStorage.removeItem(this._userIdKey)
    this.userIsConnected = false;
    this.emit_isConnect()
  }
  

  //------ EMIT METHODS ---------------------------------------
  emit_isConnect() {
    this.$userIsConnected.next(this.userIsConnected)
  }
}
