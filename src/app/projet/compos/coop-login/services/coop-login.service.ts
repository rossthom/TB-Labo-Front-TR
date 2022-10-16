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

  isConnected: boolean = false

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
          //this.isConnected = true;


          if (remember){
            localStorage.setItem("isConnected", JSON.stringify(this.isConnected))
          }
          else {
            sessionStorage.setItem("isConnected", JSON.stringify(this.isConnected))
          }
        })
      )
    }
    */
  }

  logout(){
    localStorage.removeItem('isConnect')
    sessionStorage.removeItem('isConnect')
    this.isConnected = false;
  }
}
