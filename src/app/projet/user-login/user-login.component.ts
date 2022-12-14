import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UserLogin } from 'src/app/shared/models/user.model';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';
import { generateUserLoginForm } from './forms/user-login.form';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
})
export class UserLoginComponent implements OnInit {
  userLoginForm: FormGroup = generateUserLoginForm(this.fb)

  selectedValues: string[] = [];
  

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userAuthService: UserAuthService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
  }

  get formControls() { 
    return this.userLoginForm.controls; 
  }


  login(){
    this.userAuthService.checkLogin(this.formControls['email'].value, this.formControls['password'].value)
      .subscribe((users: UserLogin[]) => {
        if (users.length < 1){
          this.messageService.add({severity:'error', summary:'Echec Connexion', detail:"L'email ou le mot de passe fournis sont incorrects"});
        }
        else {
          let remember = this.selectedValues.find(element => element === 'remember') === "remember"
          this.userAuthService.login(users[0].id, remember)
          this.router.navigate(['/profile/user/' + users[0].id])
        }
      })
  }
  
  cancelLogin(){
    this.router.navigate([''])
  }
}
