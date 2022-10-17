import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { CoopLoginService } from '../shared/services/coop-login.service';
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
    userIsConnected: boolean = false;

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(
        public layoutService: LayoutService,
        private coopLoginService: CoopLoginService,
        private userAuthService: UserAuthService
    ) { }

    ngOnInit(): void {
      this.coopLoginService.$coopIsConnected.subscribe({
        next: (isConnected: boolean) => {
          this.coopIsConnected = isConnected
        }
      })

      this.userAuthService.$userIsConnected.subscribe({
        next: (isConnected: boolean) => {
          this.userIsConnected = isConnected
        }
      })
    }
}
