// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// PrimeNG Sakai
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { PasswordModule } from 'primeng/password';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';

// Application
import { GestCoopRoutingModule } from './gest-coop-routing.module';
import { GestCoopComponent } from './gest-coop.component';
import { CoopNewComponent } from './coop-new/coop-new.component';
import { CoopLoginComponent } from './coop-login/coop-login.component';
import { CoopUpdComponent } from './coop-upd/coop-upd.component';
import { EventCruComponent } from './event-cru/event-cru.component';
import { CoopLoginService } from './shared/services/coop-login.service';
import { CoopEmailCheckService } from './shared/services/coop-email-check.service';
import { GesteventService } from './shared/services/gestevent.service';


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
    DialogModule,
    DropdownModule,
    InputTextareaModule,
    InputTextModule,
    InputNumberModule,
    PasswordModule,
    TagModule,
    ToastModule,

    // Application
    GestCoopRoutingModule,
  ],
  providers: [
    CoopLoginService,
    CoopEmailCheckService,
    GestCoopComponent,
    GesteventService,
],
})
export class GestCoopModule { }
