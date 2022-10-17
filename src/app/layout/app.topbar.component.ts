import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { CoopLoginService } from '../shared/services/coop-login.service';
import { LayoutService } from "./service/app.layout.service";

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent implements OnInit {
    items!: MenuItem[];

    coopIsConnected: boolean = false;

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(
        public layoutService: LayoutService,
        private coopLoginService: CoopLoginService
    ) { }

    ngOnInit(): void {
        this.coopLoginService.$coopIsConnected.subscribe({
          next: (isConnected: boolean) => {
            this.coopIsConnected = isConnected
          }
        })
      }
}
