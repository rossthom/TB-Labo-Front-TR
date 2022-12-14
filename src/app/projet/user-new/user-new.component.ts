import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Address, GpsPosition } from 'src/app/openstreetmap/shared/models/types.model';
import { OsmService } from 'src/app/openstreetmap/shared/services/osm.service';
import { UserDtoNew } from 'src/app/shared/models/user.model';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';
import { generateNewUserForm } from './forms/user-new.form';

@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['../../shared/styles/my-form-group.style.scss']
})
export class UserNewComponent implements OnInit {
  newUserForm: FormGroup = generateNewUserForm(this.fb, this.osmService, this.userAuthService)
  
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private osmService: OsmService,
    private userAuthService: UserAuthService,
    private messageService: MessageService
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

    this.messageService.add({
      severity:'success', 
      summary:'Création compte Participant réussie', 
      detail:"Votre profil Participant est bien enregistré dans notre base de données."
    })

    this.userAuthService.createUser(userNew)
      .subscribe(_ => this.router.navigate(['/login/user']))
  }
  
  cancelUserCreation(){
    this.router.navigate([''])
  }
}
