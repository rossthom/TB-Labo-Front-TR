import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { generateLoginForm } from 'src/app/shared/forms/login.form';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {
  userLoginForm: FormGroup = generateLoginForm(this.fb)

  selectedValues: string[] = [];
  

  constructor(
    private router: Router,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
  }

  get formControls() { 
    return this.userLoginForm.controls; 
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
