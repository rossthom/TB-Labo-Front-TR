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
  private _coopIsConnectedKey = environment.coopIsConnectedKey 
  private _coopIdKey = environment.coopIdKey

  coopIsConnected: boolean = false
  $coopIsConnected: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.verifyLogged())
  

  constructor(
    private httpC : HttpClient
  ) {
    this.verifyLogged()
    this.emit_isConnect()
  }

 
  verifyLogged(): boolean {
    let tmpIsConnect = localStorage.getItem(this._coopIsConnectedKey)
    if (!tmpIsConnect) {
      tmpIsConnect = sessionStorage.getItem(this._coopIsConnectedKey)
    }

    this.coopIsConnected = tmpIsConnect == 'true'
    return this.coopIsConnected
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
    this.coopIsConnected = true
    this.emit_isConnect()
    if (remember) {
      localStorage.setItem(this._coopIsConnectedKey, "true")
      localStorage.setItem(this._coopIdKey, coopId.toString())
    }
    else{
      sessionStorage.setItem(this._coopIsConnectedKey, "true")
      sessionStorage.setItem(this._coopIdKey, coopId.toString())
    }
  }

  logout(){
    localStorage.removeItem(this._coopIsConnectedKey)
    localStorage.removeItem(this._coopIdKey)
    sessionStorage.removeItem(this._coopIsConnectedKey)
    sessionStorage.removeItem(this._coopIdKey)
    this.coopIsConnected = false;
    this.emit_isConnect()
  }


  //------ EMIT METHODS ---------------------------------------
  emit_isConnect() {
    this.$coopIsConnected.next(this.coopIsConnected)
  }
}
