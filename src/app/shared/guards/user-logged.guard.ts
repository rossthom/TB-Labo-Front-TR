import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserAuthService } from '../services/user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserLoggedGuard implements CanActivate {
  isConnected: boolean = false

  constructor(
    private userAuthService: UserAuthService,
    private router: Router
  ){}

  canActivate(
    //route: ActivatedRouteSnapshot,
    //state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    let isConnected = this.userAuthService.userIsConnected
    if (!isConnected){
      this.router.navigate([""])
    }

    return isConnected 
  }
}
