import { Injectable } from '@angular/core';
import { CanActivateChild} from '@angular/router';
import { Observable } from 'rxjs';
import { UserAuthService } from '../services/user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class TestGuard implements CanActivateChild {

  constructor(private userAuthService : UserAuthService) {}

  canActivateChild(): Observable<boolean> | Promise<boolean> | boolean
  {

    return new Promise((resolve, reject) => {
      this.userAuthService.$userIsConnected.subscribe((isConnect : boolean) => {
        resolve(!isConnect)
      })
    })

  }
}
