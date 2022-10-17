import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Address, GpsPosition } from 'src/app/gest-coop/shared/models/types.model';
import { NominatimService } from 'src/app/gest-coop/shared/services/nominatim.service';
import { UserDtoNew } from 'src/app/shared/models/user.model';
import { EmailCheckService, Entity } from 'src/app/shared/services/email-check.service';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';
import { generateNewUserForm } from './forms/user-new.form';

@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.scss']
})
export class UserNewComponent implements OnInit {
  newUserForm: FormGroup = generateNewUserForm(this.fb, this.nominatimService, this.emailCheckService, Entity.Participant)
  
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private nominatimService: NominatimService,
    private emailCheckService: EmailCheckService,
    private userAuthService: UserAuthService
  ) { }

  ngOnInit(): void {
  }

  
  get formControls() { 
    return this.newUserForm.controls; 
  }

  saveUser(){
    let userNew = <UserDtoNew>{
      first_name: this.formControls['first_name'].value,
      last_name: this.formControls['last_name'].value,
      email: this.formControls['email'].value,
      password: this.formControls['password'].value,
      birth_date: new Date(this.formControls['birth_date'].value),
      address: <Address> {
        postal_code: parseInt(this.formControls['addr_postal_code'].value),
        city: this.formControls['addr_city'].value,
        street_name: this.formControls['addr_street_name'].value,
        street_nb: this.formControls['addr_street_nb'].value
      },
      events_participation: [],
      gps: <GpsPosition>{lon: 0, lat: 0}
    }

    console.log(userNew)

    //this.userAuthService.createUser(userNew).subscribe({
    //  next : () => {
        //TODO: RouterLink to Home or UserProfile...
        this.router.navigate(['/'])
    //  }
    //})
  }
  
  cancelUserCreation(){
    this.router.navigate(['/'])
  }



  // 👷 DEBUG
  testForm(){
    console.log(this.newUserForm)
    console.log('New User Form is ' + (this.newUserForm.valid?'':'not ') + 'valid')
  }
}
