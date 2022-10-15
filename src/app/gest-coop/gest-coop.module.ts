// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// PrimeNG Sakai
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';

// Application
import { GestCoopRoutingModule } from './gest-coop-routing.module';
import { GestCoopComponent } from './gest-coop.component';
import { CoopUpdComponent } from './coop-upd/coop-upd.component';
import { EventRUpdComponent } from './event-rupd/event-rupd.component';


@NgModule({
  declarations: [
    GestCoopComponent,
    CoopUpdComponent,
    EventRUpdComponent,
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
    TagModule,

    // Application
    GestCoopRoutingModule,
  ]
})
export class GestCoopModule { }
