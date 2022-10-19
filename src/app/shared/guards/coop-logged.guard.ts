import { Injectable } from '@angular/core';
import { CanActivate, CanDeactivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CoopAuthService } from '../../gest-coop/shared/services/coop-auth.service';

@Injectable({
  providedIn: 'root'
})
export class CoopLoggedGuard implements CanActivate, CanDeactivate<unknown> {
  isConnected: boolean = false

  constructor(
    private coopAuthService: CoopAuthService,
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
    this.coopAuthService.$coopIsConnected
      .subscribe(isConnected => this.isConnected = isConnected)
  }
}
