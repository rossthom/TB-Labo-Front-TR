import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
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
    private coopLoginService: CoopLoginService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
  }

  get formControls() { 
    return this.coopLoginForm.controls; 
  }


  checkLogin(){
    this.coopLoginService.checkLogin(this.formControls['email'].value, this.formControls['password'].value)
      .subscribe((coops: CooperativeLogin[]) => {
        if (coops.length < 1){
          //alert("Email or Password invalid")
          this.messageService.add({severity:'error', summary:'Echec Connection', detail:"L'email ou le mot de passe fournis sont incorrects"});
        }
        else {
          let remember = this.selectedValues.find(element => element === 'remember') === "remember"
          this.coopLoginService.login(coops[0].id, remember)
          this.router.navigate(['/coop-admin/view/' + coops[0].id])
        }
      })
  }
  
  cancelLogin(){
    this.router.navigate(['/'])
  }
}
