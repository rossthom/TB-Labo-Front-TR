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
import { HomeComponent } from './home/home.component';
import { TestboardComponent } from './testboard/testboard.component';
import { CoopLoginComponent } from './coop-login/coop-login.component';
import { MessageService } from 'primeng/api';
import { UserLoginComponent } from './user-login/user-login.component';


@NgModule({
  declarations: [
    HomeComponent,
    CoopLoginComponent,
    TestboardComponent,
    UserLoginComponent,
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
