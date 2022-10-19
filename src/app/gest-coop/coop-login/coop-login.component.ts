import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CooperativeLogin } from '../shared/models/coop.model';
import { CoopAuthService } from '../shared/services/coop-auth.service';
import { generateCoopLoginForm } from './forms/coop-login.form';

@Component({
  selector: 'app-coop-login',
  templateUrl: './coop-login.component.html',
  styleUrls: ['./coop-login.component.scss']
})
export class CoopLoginComponent implements OnInit {
  coopLoginForm: FormGroup = generateCoopLoginForm(this.fb)

  selectedValues: string[] = [];
  

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private coopAuthService: CoopAuthService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
  }

  get formControls() { 
    return this.coopLoginForm.controls; 
  }


  checkLogin(){
    this.coopAuthService.checkLogin(this.formControls['email'].value, this.formControls['password'].value)
      .subscribe((coops: CooperativeLogin[]) => {
        if (coops.length < 1){
          //alert("Email or Password invalid")
          this.messageService.add({severity:'error', summary:'Echec Connection', detail:"L'email ou le mot de passe fournis sont incorrects"});
        }
        else {
          let remember = this.selectedValues.find(element => element === 'remember') === "remember"
          this.coopAuthService.login(coops[0].id, remember)
          this.router.navigate(['/profile/coop/' + coops[0].id])
        }
      })
  }
  
  cancelLogin(){
    this.router.navigate([''])
  }
}
