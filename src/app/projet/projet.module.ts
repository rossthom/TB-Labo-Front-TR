import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjetRoutingModule } from './projet-routing.module';
import { HomeComponent } from './compos/home/home.component';
import { TestboardComponent } from './compos/testboard/testboard.component';
import { ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [
    HomeComponent,
    TestboardComponent
  ],
  imports: [
    CommonModule,
    ProjetRoutingModule,
    ButtonModule,
  ]
})
export class ProjetModule { }
