import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { generateNewCoopForm } from './forms/coop-new.form';
import { CooperativeDtoNew } from '../shared/models/coop.model';
import { Address, Category, GpsPosition } from '../shared/models/types.model';
import { GestcoopService } from '../shared/services/gestcoop.service';
import { NominatimService } from '../shared/services/nominatim.service';

@Component({
  selector: 'app-coop-new',
  templateUrl: './coop-new.component.html',
  styleUrls: ['./coop-new.component.scss']
})
export class CoopNewComponent implements OnInit {
  newCoopForm: FormGroup = generateNewCoopForm(this.fb, this.nominatimService)
  coopTypes: Category[] = []


  constructor(
    private router: Router,
    private fb: FormBuilder,
    private gestCoopService: GestcoopService,
    private nominatimService: NominatimService
  ) { }

  ngOnInit(): void {
    this.gestCoopService.getCoopTypes().subscribe({
      next : (res : Category[]) => {
        this.coopTypes = res
      }
    })
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

    console.log(coopNew)

    //this.gestCoopService.insertCoop(coopNew).subscribe({
    //  next : () => {
        //TODO: RouterLink to Home or CoopLogin...
        this.router.navigate(['/'])
    //  }
    //})
  }
  
  cancelCoopCreation(){
    this.router.navigate(['/'])
  }



  // 👷 DEBUG
  testForm(){
    console.log(this.newCoopForm)
    console.log('New Coop Form is ' + (this.newCoopForm.valid?'':'not ') + 'valid')
  }
}
