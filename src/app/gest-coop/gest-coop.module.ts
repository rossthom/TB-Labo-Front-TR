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
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';

// Application
import { CoopAuthService } from './shared/services/coop-auth.service';
import { CoopService } from './shared/services/coop.service';
import { EventService } from './shared/services/event.service';
import { GestCoopComponent } from './gest-coop.component';
import { CoopNewComponent } from './coop-new/coop-new.component';
import { CoopLoginComponent } from './coop-login/coop-login.component';
import { CoopUpdComponent } from './coop-upd/coop-upd.component';
import { EventCruComponent } from './event-cru/event-cru.component';


@NgModule({
  declarations: [
    GestCoopComponent,
    CoopNewComponent,
    CoopLoginComponent,
    CoopUpdComponent,
    EventCruComponent,
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
    InputNumberModule,
    InputTextareaModule,
    InputTextModule,
    PasswordModule,
    TagModule,
    ToastModule,

    // Application
  ],
  providers: [
    CoopAuthService,
    CoopService,
    EventService,
],
})
export class GestCoopModule { }
