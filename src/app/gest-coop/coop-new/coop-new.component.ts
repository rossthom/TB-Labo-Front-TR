import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Address, GpsPosition } from 'src/app/openstreetmap/shared/models/types.model';
import { OsmService } from 'src/app/openstreetmap/shared/services/osm.service';
import { CooperativeDtoNew } from '../shared/models/coop.model';
import { Category } from '../shared/models/types.model';
import { CoopService } from '../shared/services/coop.service';
import { CoopAuthService } from '../shared/services/coop-auth.service';
import { generateNewCoopForm } from './forms/coop-new.form';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-coop-new',
  templateUrl: './coop-new.component.html',
  styleUrls: ['../shared/styles/my-form-group.style.scss']
})
export class CoopNewComponent implements OnInit {
  newCoopForm: FormGroup = generateNewCoopForm(this.fb, this.osmService, this.coopAuthService)
  coopTypes: Category[] = []


  constructor(
    private router: Router,
    private fb: FormBuilder,
    private coopService: CoopService,
    private coopAuthService: CoopAuthService,
    private osmService: OsmService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.coopService.getCoopTypes()
      .subscribe(coopTypes => this.coopTypes = coopTypes)
  }

  
  get formControls() { 
    return this.newCoopForm.controls; 
  }

  saveCooperative(){
    let coopNew = <CooperativeDtoNew>{
      coop_typeId: parseInt(this.formControls['coop_typeId'].value),
      name: this.formControls['name'].value,
      email: this.formControls['email'].value,
      password: this.formControls['password'].value,
      description: this.formControls['description'].value,
      address: <Address>{
        postal_code: parseInt(this.formControls['addr_postal_code'].value),
        city: this.formControls['addr_city'].value,
        street_name: this.formControls['addr_street_name'].value,
        street_nb: this.formControls['addr_street_nb'].value
      },
      logo: this.formControls['logo'].value,
      gps: <GpsPosition>{lon: 0, lat: 0}
    }

    this.coopService.insertCoop(coopNew)
      .subscribe(() => {
        this.messageService.add({
          severity:'success', 
          summary:'Création compte Coopérative réussie', 
          detail:"Votre coopérative est bien enregistrée dans notre base de données."
        })
        this.router.navigate(['/login/coop'])
      })
  }
  
  cancelCoopCreation(){
    this.router.navigate([''])
  }
}
