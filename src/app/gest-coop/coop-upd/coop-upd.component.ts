import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CooperativeDtoUpd, CooperativeView } from '../models/coop.model';
import { Address, Category, GpsPosition } from '../models/types.model';
import { GestcoopService } from '../services/gestcoop.service';
import { generateUpdCoopForm } from './forms/coop-upd.form';

@Component({
  selector: 'app-coop-upd',
  templateUrl: './coop-upd.component.html',
  styleUrls: ['./coop-upd.component.scss']
})
export class CoopUpdComponent implements OnInit, OnChanges {
  updCoopForm: FormGroup = generateUpdCoopForm(this.fb)
  coopTypes: Category[] = []

  @Input()
  cooperative!: CooperativeView

  @Output() 
  clickOnCoopUpdate: EventEmitter<number> = new EventEmitter<number>()

  @Output() 
  clickOnCancel: EventEmitter<number> = new EventEmitter<number>()


  constructor(
    private fb: FormBuilder,
    private gestCoopService: GestcoopService
  ) { }

  
  ngOnInit(): void {
    this.gestCoopService.getCoopTypes().subscribe({
      next : (res : Category[]) => {
        this.coopTypes = res
      }
    })
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    //console.log(this.cooperative)
    if (this.cooperative){
      this.formControls['name'].setValue(this.cooperative.name)
      this.formControls['coop_typeId'].setValue(this.cooperative.coop_typeId)
      this.formControls['description'].setValue(this.cooperative.description)
      this.formControls['addr_postal_code'].setValue(this.cooperative.address.postal_code)
      this.formControls['addr_city'].setValue(this.cooperative.address.city)
      this.formControls['addr_street_name'].setValue(this.cooperative.address.street_name)
      this.formControls['addr_street_nb'].setValue(this.cooperative.address.street_nb)
      this.formControls['logo'].setValue(this.cooperative.logo)
    }
  }

  get formControls() { 
    return this.updCoopForm.controls; 
  }

  saveModifications(){
    let coopUdt = <CooperativeDtoUpd>{
      id: this.cooperative.id,
      coop_typeId: parseInt(this.formControls['coop_typeId'].value),
      name: this.formControls['name'].value,
      description: this.formControls['description'].value,
      address: <Address> {
        postal_code: parseInt(this.formControls['addr_postal_code'].value),
        city: this.formControls['addr_city'].value,
        street_name: this.formControls['addr_street_name'].value,
        street_nb: this.formControls['addr_street_nb'].value
      },
      logo: this.formControls['logo'].value,
      gps: <GpsPosition>{lon: 0, lat: 0}
    }

    console.log(coopUdt)

    //TODO: call service for update


    this.clickOnCoopUpdate.emit(this.cooperative.id)
    console.log('child emits "clickOnCoopUpdate"')
  }

  cancelModifications(){
    this.clickOnCancel.emit(this.cooperative.id)
    console.log('child emits "clickOnCancel"')
  }
}
