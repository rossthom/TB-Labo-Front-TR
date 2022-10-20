// Angular
import { NgModule } from '@angular/core';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// PrimeNG Sakai
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

// Application
import { AppLayoutModule } from './layout/app.layout.module';
import { AppRoutingModule } from './app-routing.module';
import { GestCoopModule } from './gest-coop/gest-coop.module';
import { UserAuthService } from './shared/services/user-auth.service';
import { UserService } from './shared/services/user.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './projet/home/home.component';
import { UserNewComponent } from './projet/user-new/user-new.component';
import { UserLoginComponent } from './projet/user-login/user-login.component';
import { UserProfileComponent } from './projet/user-profile/user-profile.component';
import { EventsListComponent } from './projet/events-list/events-list.component';
import { EventDetailComponent } from './projet/event-detail/event-detail.component';
import { EventMapComponent } from './projet/event-detail/event-map/event-map.component';
import { NotfoundComponent } from './shared/compos/notfound/notfound.component';
import { TestboardComponent } from './projet/testboard/testboard.component';
import { SecondsToReadablePipe } from './shared/pipes/seconds-to-readable.pipe';
import { KmPipe } from './shared/pipes/km.pipe';
import { AllEventsMapComponent } from './projet/events-list/all-events-map/all-events-map.component';


@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        UserNewComponent,
        UserLoginComponent,
        UserProfileComponent,
        EventsListComponent,
        EventDetailComponent,
        EventMapComponent,
        NotfoundComponent,
        TestboardComponent,
        SecondsToReadablePipe,
        KmPipe,
        AllEventsMapComponent,
    ],
    imports: [
        // Angular
        CommonModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        // PrimeNG
        AppLayoutModule,
        ButtonModule,
        CalendarModule,
        CheckboxModule,
        DialogModule,
        DropdownModule,
        InputTextModule,
        PasswordModule,
        TableModule,
        TabViewModule,
        ToastModule,
        // Application
        AppRoutingModule,
        GestCoopModule,
    ],
    providers: [
        //{ provide: LocationStrategy, useClass: HashLocationStrategy },
        MessageService,
        UserAuthService,
        UserService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
