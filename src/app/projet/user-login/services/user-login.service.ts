import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserLoginService {
  private _apiUrl: string = environment.dataUrl

  userIsConnected: boolean = false


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
