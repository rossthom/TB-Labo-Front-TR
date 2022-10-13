import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestCoopRoutingModule } from './gest-coop-routing.module';
import { GestCoopComponent } from './gest-coop.component';


@NgModule({
  declarations: [
    GestCoopComponent,
  ],
  imports: [
    CommonModule,
    GestCoopRoutingModule
  ]
})
export class GestCoopModule { }
