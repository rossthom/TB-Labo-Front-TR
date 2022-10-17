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
  coopIsConnectedKey = "coopIsConnected"
  $coopIsConnected: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.verifyLogged())

  constructor(
    private httpC : HttpClient
  ) { }

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
        map(coops => coops.filter(coop => coop.email === email && coop.password === password))
      )
  }

  login(/*email: string, password: string, */remember: boolean) {
    this.coopIsConnected = true
    if (remember) {
      //localStorage.setItem(this.coopIsConnectedKey, "true")
      alert('Login (remember me) !!')
    }
    else{
      //sessionStorage.setItem(this.coopIsConnectedKey, "true")
      alert('Login !!')
    }
  }

  logout(){
    localStorage.removeItem('isConnect')
    sessionStorage.removeItem('isConnect')
    this.coopIsConnected = false;
  }


  //------ EMIT METHODS ---------------------------------------
  // Par convention, on met les methodes 'emit' à la fin
  emit_isConnect() {
    this.$coopIsConnected.next(this.coopIsConnected)
  }
}
