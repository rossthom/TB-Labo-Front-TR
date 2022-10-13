// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// PrimeNG Sakai
import { ButtonModule } from 'primeng/button';

// Application
import { ProjetRoutingModule } from './projet-routing.module';
import { HomeComponent } from './compos/home/home.component';
import { TestboardComponent } from './compos/testboard/testboard.component';


@NgModule({
  declarations: [
    HomeComponent,
    TestboardComponent
  ],
  imports: [
    // Angular
    CommonModule,
    // PrimeNG
    ButtonModule,
    // Application
    ProjetRoutingModule,
  ]
})
export class ProjetModule { }
