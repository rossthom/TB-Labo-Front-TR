import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { LayoutService } from './layout/service/app.layout.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent {

    constructor(
        private primengConfig: PrimeNGConfig,
        private layoutService: LayoutService
    ) { }

    ngOnInit() {
        this.primengConfig.ripple = true;

        //optional configuration with the default configuration

        this.layoutService.config = {
            ripple: false,                      //toggles ripple on and off
            inputStyle: 'outlined',             //default style for input elements
            menuMode: 'static',                 //layout mode of the menu, valid values are "static" and "overlay"
            colorScheme: 'light',               //color scheme of the template, valid values are "light" and "dark"
            theme: 'saga-green',                //default component theme for PrimeNG
            scale: 14                           //size of the body font size to scale the whole application
        };
    }
}
