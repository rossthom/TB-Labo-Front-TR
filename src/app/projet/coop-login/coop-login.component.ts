import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CooperativeLogin } from 'src/app/gest-coop/shared/models/coop.model';
import { CoopLoginService } from 'src/app/shared/services/coop-login.service';
import { generateLoginForm } from '../../shared/forms/login.form';

@Component({
  selector: 'app-coop-login',
  templateUrl: './coop-login.component.html',
  styleUrls: ['./coop-login.component.scss']
})
export class CoopLoginComponent implements OnInit {
  coopLoginForm: FormGroup = generateLoginForm(this.fb)

  selectedValues: string[] = [];
  

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private coopLoginService: CoopLoginService
  ) { }

  ngOnInit(): void {
  }

  get formControls() { 
    return this.coopLoginForm.controls; 
  }


  checkLogin(){
    this.coopLoginService.checkLogin(this.formControls['email'].value, this.formControls['password'].value)
      .subscribe((coops: CooperativeLogin[]) => {
        console.log(coops)

        if (coops.length < 1){
          alert("Email or Password invalid")
        }
        else {
          let remember = this.selectedValues.find(element => element === 'remember') === "remember"
          this.coopLoginService.login(remember)
          this.router.navigate([''])
        }
      })
  }
  
  cancelLogin(){
    this.router.navigate(['/'])
  }
}
