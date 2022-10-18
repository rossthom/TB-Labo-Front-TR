import { Injectable } from '@angular/core';
import { CanActivate, CanDeactivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CoopLoginService } from '../services/coop-login.service';

@Injectable({
  providedIn: 'root'
})
export class CoopLoginGuard implements CanActivate, CanDeactivate<unknown> {
  isConnected: boolean = false

  constructor(
    private coopLoginService: CoopLoginService,
    private router: Router
  ){}

  canActivate(
    //route: ActivatedRouteSnapshot,
    //state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    this._checkConnection()
    if (!this.isConnected){
      this.router.navigate([""])
    }
    return this.isConnected
  }
  
  canDeactivate(
    //component: unknown,
    //currentRoute: ActivatedRouteSnapshot,
    //currentState: RouterStateSnapshot,
    //nextState?: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    this._checkConnection()
    if (this.isConnected){
      this.router.navigate([""])
    }
    return this.isConnected
  }
  
  private _checkConnection() {
    this.coopLoginService.$coopIsConnected.subscribe({
      next: (isConnected: boolean) => {
        this.isConnected = isConnected
      }
    })
  }
}
