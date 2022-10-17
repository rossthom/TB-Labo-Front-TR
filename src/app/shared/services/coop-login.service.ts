import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { CooperativeView } from 'src/app/gest-coop/shared/models/coop.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoopLoginService {
  private _apiUrl: string = environment.dataUrl

  coopIsConnected: boolean = false

  constructor(
    private httpC : HttpClient
  ) { }

  login(remember: boolean){
    // TODO: check database if pwd is valid
    /*
    return this.httpC.get<CooperativeView[]>(this._apiUrl+"cooperatives")
      .pipe(
        tap(() => {
          // TODO: 
          //this.coopIsConnected = true;


          if (remember){
            localStorage.setItem("coopIsConnected", JSON.stringify(this.coopIsConnected))
          }
          else {
            sessionStorage.setItem("coopIsConnected", JSON.stringify(this.coopIsConnected))
          }
        })
      )
    }
    */
  }

  logout(){
    localStorage.removeItem('isConnect')
    sessionStorage.removeItem('isConnect')
    this.coopIsConnected = false;
  }
}
