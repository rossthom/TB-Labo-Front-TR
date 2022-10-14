// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// PrimeNG Sakai
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';

// Application
import { GestCoopRoutingModule } from './gest-coop-routing.module';
import { GestCoopComponent } from './gest-coop.component';
import { CoopUpdComponent } from './coop-upd/coop-upd.component';


@NgModule({
  declarations: [
    GestCoopComponent,
    CoopUpdComponent,
  ],
  imports: [
    // Angular
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    
    // PrimeNG
    ButtonModule,
    DialogModule,
    DropdownModule,
    InputTextareaModule,
    InputTextModule,
    TagModule,

    // Application
    GestCoopRoutingModule,
  ]
})
export class GestCoopModule { }
