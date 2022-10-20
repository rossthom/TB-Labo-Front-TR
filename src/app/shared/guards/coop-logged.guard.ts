import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CoopAuthService } from '../../gest-coop/shared/services/coop-auth.service';

@Injectable({
  providedIn: 'root'
})
export class CoopLoggedGuard implements CanActivate {
  isConnected: boolean = false

  constructor(
    private coopAuthService: CoopAuthService,
    private router: Router
  ){}

  canActivate(
    //route: ActivatedRouteSnapshot,
    //state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    let isConnected = this.coopAuthService.coopIsConnected
    if (!isConnected){
      this.router.navigate([""])
    }

    return isConnected 
  }
}
