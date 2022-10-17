import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EmailCheckService, Entity } from 'src/app/shared/services/email-check.service';
import { generateLoginForm } from '../../shared/forms/login.form';

@Component({
  selector: 'app-coop-login',
  templateUrl: './coop-login.component.html',
  styleUrls: ['./coop-login.component.scss']
})
export class CoopLoginComponent implements OnInit {
  coopLoginForm: FormGroup = generateLoginForm(this.fb, this.emailCheckService, Entity.Cooperative)

  selectedValues: string[] = [];
  

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private emailCheckService: EmailCheckService
  ) { }

  ngOnInit(): void {
  }

  get formControls() { 
    return this.coopLoginForm.controls; 
  }


  login(){
    if (this.selectedValues.find(element => element === 'remember')){
      alert('Login (remember me) !!')
    }
    else {
      alert('Login !!')
    }

    //TODO: RouterLink to Home or Coop Page ?
    //this.router.navigate(['/'])
  }
  
  cancelLogin(){
    this.router.navigate(['/'])
  }
}
