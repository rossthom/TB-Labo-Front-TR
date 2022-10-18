import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserAuthService } from '../services/user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserLoginGuard implements CanActivate {
  isConnected: boolean = false

  constructor(
    private userAuthService: UserAuthService,
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

  private _checkConnection() {
    this.userAuthService.$userIsConnected.subscribe((isConnected: boolean) => {
        this.isConnected = isConnected
    })
  }
}
