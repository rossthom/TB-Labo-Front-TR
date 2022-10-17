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

  coopIsConnected: boolean = false
  $coopIsConnected: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.verifyLogged())
  
  coopIsConnectedKey = environment.coopIsConnectedKey //"coopIsConnected"
  coopIdKey = environment.coopIdKey //"coopId"

  constructor(
    private httpC : HttpClient
  ) {
    this.verifyLogged()
    this.emit_isConnect()
  }

  verifyLogged(): boolean {
    let tmpIsConnect = localStorage.getItem(this.coopIsConnectedKey)
    if (!tmpIsConnect) {
      tmpIsConnect = sessionStorage.getItem(this.coopIsConnectedKey)
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
      localStorage.setItem(this.coopIsConnectedKey, "true")
      localStorage.setItem(this.coopIdKey, coopId.toString())
      //alert('Login (remember me) !!')
    }
    else{
      sessionStorage.setItem(this.coopIsConnectedKey, "true")
      sessionStorage.setItem(this.coopIdKey, coopId.toString())
      //alert('Login !!')
    }
  }

  logout(){
    localStorage.removeItem(this.coopIsConnectedKey)
    localStorage.removeItem(this.coopIdKey)
    sessionStorage.removeItem(this.coopIsConnectedKey)
    sessionStorage.removeItem(this.coopIdKey)
    this.coopIsConnected = false;
    this.emit_isConnect()
  }


  //------ EMIT METHODS ---------------------------------------
  emit_isConnect() {
    this.$coopIsConnected.next(this.coopIsConnected)
  }
}
