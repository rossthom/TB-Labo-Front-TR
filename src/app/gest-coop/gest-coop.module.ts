// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// PrimeNG Sakai
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';

// Application
import { GestCoopRoutingModule } from './gest-coop-routing.module';
import { GestCoopComponent } from './gest-coop.component';


@NgModule({
  declarations: [
    GestCoopComponent,
  ],
  imports: [
    // Angular
    CommonModule,
    FormsModule,
    // PrimeNG
    DropdownModule,
    TagModule,

    // Application
    GestCoopRoutingModule,
  ]
})
export class GestCoopModule { }
