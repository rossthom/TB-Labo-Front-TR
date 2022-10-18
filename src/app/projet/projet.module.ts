// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// PrimeNG Sakai
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';

// Application
import { ProjetRoutingModule } from './projet-routing.module';
import { HomeComponent } from './home/home.component';
import { CoopLoginComponent } from './coop-login/coop-login.component';
import { CoopViewComponent } from './coop-view/coop-view.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserNewComponent } from './user-new/user-new.component';
import { TestboardComponent } from './testboard/testboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { EventDetailComponent } from './coop-view/event-detail/event-detail.component';


@NgModule({
  declarations: [
    HomeComponent,
    CoopLoginComponent,
    CoopViewComponent,
    UserLoginComponent,
    UserNewComponent,
    TestboardComponent,
    UserProfileComponent,
    EventDetailComponent,
  ],
  imports: [
    // Angular
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // PrimeNG
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
    ProjetRoutingModule,
  ],
  providers: [
    MessageService,
  ]
})
export class ProjetModule { }
