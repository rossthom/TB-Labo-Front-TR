import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, mergeMap } from 'rxjs';
import { GpsPosition } from 'src/app/openstreetmap/shared/models/types.model';
import { OsmService } from 'src/app/openstreetmap/shared/services/osm.service';
import { environment } from 'src/environments/environment';
import { UserDtoNew, UserLogin } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  private _apiUrl: string = environment.dataUrl
  //private _userIsConnectedKey = environment.userIsConnectedKey
  private _userIdKey = environment.userIdKey

  connectedUserId: number = 0
  $connectedUserId: BehaviorSubject<number> = new BehaviorSubject<number>(this.connectedUserId)
  
  userIsConnected: boolean = false
  $userIsConnected: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.userIsConnected)
  

  constructor(
    private httpC : HttpClient,
    private osmService: OsmService
  ) {
    this.verifyLogged()
  }


  createUser(user: UserDtoNew){
    return this.osmService.getAddressGpsLongLat(user.address)
      .pipe(
        mergeMap(res => {
          return this.httpC.post(
            this._apiUrl + "participants",
            { ...user, gps: <GpsPosition>{lon: parseFloat(res[0].lon), lat: parseFloat(res[0].lat)}}
          )
        })
      )
  }

  _updateConnectionStatus(userId: number){
    this.connectedUserId = userId
    this.userIsConnected = this.connectedUserId != 0

    this.emit_isConnect()
  }

  verifyLogged() {
    let tmpConnectedUserId = localStorage.getItem(this._userIdKey)
    if (!tmpConnectedUserId) {
      tmpConnectedUserId = sessionStorage.getItem(this._userIdKey)
    }

    //this.connectedUserId = tmpConnectedIserId ? parseInt(tmpConnectedIserId) : 0
    //this.userIsConnected = this.connectedUserId != 0
    this._updateConnectionStatus(tmpConnectedUserId ? parseInt(tmpConnectedUserId) : 0)
  }

  checkUserEmailUnicity(email: string){
    let encodedEmail = email.split('@').join('%40')
    return this.httpC.get<any>(this._apiUrl + "participants/?email=" + encodedEmail)
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
    if (remember) {
      //localStorage.setItem(this._userIsConnectedKey, "true")
      localStorage.setItem(this._userIdKey, userId.toString())
    }
    else{
      //sessionStorage.setItem(this._userIsConnectedKey, "true")
      sessionStorage.setItem(this._userIdKey, userId.toString())
    }
    // this.connectedUserId = userId
    // this.userIsConnected = true
    // this.emit_isConnect()
    this._updateConnectionStatus(userId)
  }

  logout(){
    //localStorage.removeItem(this._userIsConnectedKey)
    localStorage.removeItem(this._userIdKey)
    //sessionStorage.removeItem(this._userIsConnectedKey)
    sessionStorage.removeItem(this._userIdKey)
    // this.connectedUserId = 0;
    // this.userIsConnected = false;
    // this.emit_isConnect()
    this._updateConnectionStatus(0)
  }
  

  //------ EMIT METHODS ---------------------------------------
  emit_isConnect() {
    this.$connectedUserId.next(this.connectedUserId)
    this.$userIsConnected.next(this.userIsConnected)
  }
}
