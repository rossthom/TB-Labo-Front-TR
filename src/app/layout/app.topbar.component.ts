import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { CoopAuthService } from '../gest-coop/shared/services/coop-auth.service';
import { UserAuthService } from '../shared/services/user-auth.service';
import { LayoutService } from "./service/app.layout.service";

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
    styleUrls: ['app.topbar.component.scss']
})
export class AppTopBarComponent implements OnInit {
    items!: MenuItem[];

    coopIsConnected: boolean = false;
    connectedCoopId: number = 0
    userIsConnected: boolean = false;
    connectedUserId: number = 0;

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(
        public layoutService: LayoutService,
        private router: Router,
        private coopAuthService: CoopAuthService,
        private userAuthService: UserAuthService
    ) { }

    ngOnInit(): void {
      this.coopAuthService.$coopIsConnected.subscribe({
        next: (isConnected: boolean) => {
          this.coopIsConnected = isConnected
          this.connectedCoopId = this.coopAuthService.connectedCoopId
        }
      })
  
      this.userAuthService.$userIsConnected.subscribe({
        next: (isConnected: boolean) => {
          this.userIsConnected = isConnected
          this.connectedUserId = this.userAuthService.connectedUserId
        }
      })
      /* this.coopAuthService.$coopIsConnected.subscribe({
        next: (isConnected: boolean) => {
          this.coopIsConnected = isConnected
        }
      })

      this.userAuthService.$userIsConnected.subscribe({
        next: (isConnected: boolean) => {
          this.userIsConnected = isConnected
        }
      }) */

    }

    coopLogout(){
      this.coopAuthService.logout()
      this.router.navigate([""])
    }

    userLogout(){
      this.userAuthService.logout()
      this.router.navigate([""])
    }
}
