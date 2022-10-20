import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CooperativeDtoUpd, CooperativeView } from '../shared/models/coop.model';
import { Category } from '../shared/models/types.model';
import { GestCoopService } from '../shared/services/gest-coop.service';
import { OsmService } from '../../openstreetmap/shared/services/osm.service';
import { generateUpdCoopForm } from './forms/coop-upd.form';
import { Address, GpsPosition } from 'src/app/openstreetmap/shared/models/types.model';

@Component({
  selector: 'app-coop-upd',
  templateUrl: './coop-upd.component.html',
  styleUrls: ['./coop-upd.component.scss']
})
export class CoopUpdComponent implements OnInit, OnChanges {
  updCoopForm: FormGroup = generateUpdCoopForm(this.fb, this.osmService)
  coopTypes: Category[] = []

  @Input()
  cooperative!: CooperativeView

  @Output() 
  clickOnCoopUpdate: EventEmitter<number> = new EventEmitter<number>()

  @Output() 
  clickOnCoopCancel: EventEmitter<number> = new EventEmitter<number>()


  constructor(
    private fb: FormBuilder,
    private gestCoopService: GestCoopService,
    private osmService: OsmService
  ) { }

  
  ngOnInit(): void {
    this.gestCoopService.getCoopTypes()
    .subscribe(coopTypes => this.coopTypes = coopTypes)
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    //console.log(changes)
    this._fillFormWithCoop()
  }

  get formControls() { 
    return this.updCoopForm.controls; 
  }

  private _fillFormWithCoop() {
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

  saveModifications(){
    let coopUpd = <CooperativeDtoUpd>{
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

    console.log(coopUpd)

    this.gestCoopService.updateCoop(coopUpd)
      .subscribe(_ => this.clickOnCoopUpdate.emit(this.cooperative.id))
  }

  cancelModifications(){
    this._fillFormWithCoop()
    this.clickOnCoopCancel.emit(this.cooperative.id)
  }
}
