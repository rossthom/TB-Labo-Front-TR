import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { CooperativeLogin } from 'src/app/gest-coop/shared/models/coop.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoopLoginService {
  private _apiUrl: string = environment.dataUrl
  private _coopIsConnectedKey = environment.coopIsConnectedKey //"coopIsConnected"
  private _coopIdKey = environment.coopIdKey //"coopId"

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
      //alert('Login (remember me) !!')
    }
    else{
      sessionStorage.setItem(this._coopIsConnectedKey, "true")
      sessionStorage.setItem(this._coopIdKey, coopId.toString())
      //alert('Login !!')
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
