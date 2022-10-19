import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CooperativeLogin } from '../models/coop.model';

@Injectable({
  providedIn: 'root'
})
export class CoopAuthService {
  private _apiUrl: string = environment.dataUrl
  //private _coopIsConnectedKey = environment.coopIsConnectedKey 
  private _coopIdKey = environment.coopIdKey

  connectedCoopId: number = 0
  $connectedCoopId: BehaviorSubject<number> = new BehaviorSubject<number>(this.connectedCoopId)
  
  coopIsConnected: boolean = false
  $coopIsConnected: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.coopIsConnected)
  

  constructor(
    private httpC : HttpClient
  ) {
    this.verifyLogged()
  }

  _updateConnectionStatus(coopId: number){
    this.connectedCoopId = coopId
    this.coopIsConnected = this.connectedCoopId != 0

    this.emit_isConnect()
  }

  verifyLogged() {
    let tmpConnectedCoopId = localStorage.getItem(this._coopIdKey)
    if (!tmpConnectedCoopId) {
      tmpConnectedCoopId = sessionStorage.getItem(this._coopIdKey)
    }

    this._updateConnectionStatus(tmpConnectedCoopId ? parseInt(tmpConnectedCoopId) : 0)
  }

  checkCoopEmailUnicity(email: string){
    let encodedEmail = email.split('@').join('%40')
    return this.httpC.get<any>(this._apiUrl + "cooperatives/?email=" + encodedEmail)
  }

  checkLogin(email: string, password: string){
    // Merci Dorian !
    return this.httpC.get<CooperativeLogin[]>(this._apiUrl+"cooperatives")
      .pipe(
        // 🤢 On reprend tous les users, je sais, mais c'est parce qu'on simule un backend
        map(coops => coops.filter(coop => coop.email === email && coop.password === password))
      )
  }

  login(coopId: number, remember: boolean) {
    if (remember) {
      //localStorage.setItem(this._coopIsConnectedKey, "true")
      localStorage.setItem(this._coopIdKey, coopId.toString())
    }
    else{
      //sessionStorage.setItem(this._coopIsConnectedKey, "true")
      sessionStorage.setItem(this._coopIdKey, coopId.toString())
    }

    this._updateConnectionStatus(coopId)
  }

  logout(){
    //localStorage.removeItem(this._coopIsConnectedKey)
    localStorage.removeItem(this._coopIdKey)
    //sessionStorage.removeItem(this._coopIsConnectedKey)
    sessionStorage.removeItem(this._coopIdKey)
    
    this._updateConnectionStatus(0)
  }


  //------ EMIT METHODS ---------------------------------------
  emit_isConnect() {
    this.$connectedCoopId.next(this.connectedCoopId)
    this.$coopIsConnected.next(this.coopIsConnected)
  }
}
