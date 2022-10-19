// Angular
import { NgModule } from '@angular/core';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// PrimeNG Sakai
import { AppLayoutModule } from './layout/app.layout.module';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

// Application
import { GestCoopModule } from './gest-coop/gest-coop.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotfoundComponent } from './shared/compos/notfound/notfound.component';
import { HomeComponent } from './projet/home/home.component';
import { CoopViewComponent } from './projet/coop-view/coop-view.component';
import { EventDetailComponent } from './projet/coop-view/event-detail/event-detail.component';
import { UserLoginComponent } from './projet/user-login/user-login.component';
import { UserNewComponent } from './projet/user-new/user-new.component';
import { UserProfileComponent } from './projet/user-profile/user-profile.component';
import { TestboardComponent } from './projet/testboard/testboard.component';
import { UserAuthService } from './shared/services/user-auth.service';
import { UserService } from './shared/services/user.service';


@NgModule({
    declarations: [
        AppComponent,
        NotfoundComponent,
        HomeComponent,
        CoopViewComponent,
        EventDetailComponent,
        UserLoginComponent,
        UserNewComponent,
        UserProfileComponent,
        TestboardComponent,
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
