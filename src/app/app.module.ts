// Angular
import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// PrimeNG Sakai
import { AppLayoutModule } from './layout/app.layout.module';
import { ButtonModule } from 'primeng/button';

// Project
import { AppRoutingModule } from './app-routing.module';
import { GestCoopModule } from './gest-coop/gest-coop.module';
import { AppComponent } from './app.component';
import { NotfoundComponent } from './shared/compos/notfound/notfound.component';


@NgModule({
    declarations: [
        AppComponent,
        NotfoundComponent,
    ],
    imports: [
        // Angular
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        // PrimeNG
        AppLayoutModule,
        ButtonModule,
        // Application
        GestCoopModule,
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
