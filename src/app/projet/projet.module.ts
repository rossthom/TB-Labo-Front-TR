// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// PrimeNG Sakai
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';

// Application
import { ProjetRoutingModule } from './projet-routing.module';
import { HomeComponent } from './compos/home/home.component';
import { TestboardComponent } from './compos/testboard/testboard.component';
import { CoopLoginComponent } from './compos/coop-login/coop-login.component';
import { MessageService } from 'primeng/api';


@NgModule({
  declarations: [
    HomeComponent,
    CoopLoginComponent,
    TestboardComponent,
  ],
  imports: [
    // Angular
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // PrimeNG
    ButtonModule,
    CheckboxModule,
    DialogModule,
    InputTextModule,
    PasswordModule,
    ToastModule,
    // Application
    ProjetRoutingModule,
  ],
  providers: [
    MessageService,
  ]
})
export class ProjetModule { }
