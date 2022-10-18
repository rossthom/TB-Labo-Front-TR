import { Injectable } from '@angular/core';
import { CanActivateChild, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { CoopLoginService } from 'src/app/gest-coop/shared/services/coop-login.service';
import { UserAuthService } from '../services/user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class CoopLoggedOutGuard implements CanActivateChild {

  constructor(
    private coopLoginService: CoopLoginService,
    private router: Router
  ) {}

  canActivateChild(): Observable<boolean> | Promise<boolean> | boolean
  {
    // !! This guard is used to block routes when a user OR a coop is connected
    let coopIsConnected = this.coopLoginService.coopIsConnected

    if (coopIsConnected){
      this.router.navigate([""])
    }

    return !coopIsConnected
  }
}
