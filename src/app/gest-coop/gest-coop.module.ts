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

// Application
import { GestCoopRoutingModule } from './gest-coop-routing.module';
import { GestCoopComponent } from './gest-coop.component';
import { CoopNewComponent } from './coop-new/coop-new.component';
import { CoopUpdComponent } from './coop-upd/coop-upd.component';
import { EventCruComponent } from './event-cru/event-cru.component';
import { CoopViewComponent } from './coop-view/coop-view.component';


@NgModule({
  declarations: [
    GestCoopComponent,
    CoopNewComponent,
    CoopUpdComponent,
    EventCruComponent,
    CoopViewComponent,
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

    // Application
    GestCoopRoutingModule,
  ]
})
export class GestCoopModule { }
