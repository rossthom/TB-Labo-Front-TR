import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EventDtoNew, EventDtoUpd, EventView } from '../shared/models/event.model';
import { Address, Category, GpsPosition } from '../shared/models/types.model';
import { GesteventService } from '../shared/services/gestevent.service';
import { NominatimService } from '../shared/services/nominatim.service';
import { generateCRUEventForm } from './forms/event-cru.form';

@Component({
  selector: 'app-event-cru',
  templateUrl: './event-cru.component.html',
  styleUrls: ['./event-cru.component.scss']
})
export class EventCruComponent implements OnInit, OnChanges {
  private _unknownEventType: Category = <Category>{id: 0, label:"Type d'évènement inconnu"}

  ruEventForm: FormGroup = generateCRUEventForm(this.fb, this.nominatimService)
  eventTypes: Category[] = []
  eventType: Category = this._unknownEventType

  @Input()
  event!: EventView
  
  @Input()
  coopId: number = 0
  
  @Input()
  formMode: FormMode = FormMode.Read
  
  @Output() 
  clickOnEventClose: EventEmitter<number> = new EventEmitter<number>()

  @Output() 
  clickOnEventUpdate: EventEmitter<number> = new EventEmitter<number>()
  
  @Output() 
  clickOnEventCancel: EventEmitter<number> = new EventEmitter<number>()
  
  @Output() 
  clickOnNewEventSave: EventEmitter<number> = new EventEmitter<number>()


  constructor(
    private fb: FormBuilder,
    private gestEventService: GesteventService,
    private nominatimService: NominatimService
  ) { }

  ngOnInit(): void {
    this.gestEventService.getEventTypes().subscribe({
      next : (res : Category[]) => {
        this.eventTypes = res
        this._updateEventType()
      }
    })
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    //console.log(changes)
    this._updateEventType()
    this._fillFormWithEvent()
  }

  get formControls() { 
    return this.ruEventForm.controls; 
  }

  private _fillFormWithEvent() {
    if (this.event){
      // 👷 to implement...
      this.formControls['name'].setValue(this.event.name)
      this.formControls['event_typeId'].setValue(this.event.event_typeId)
      this.formControls['description'].setValue(this.event.description)
      this.formControls['location'].setValue(this.event.location)
      this.formControls['addr_postal_code'].setValue(this.event.address.postal_code)
      this.formControls['addr_city'].setValue(this.event.address.city)
      this.formControls['addr_street_name'].setValue(this.event.address.street_name)
      this.formControls['addr_street_nb'].setValue(this.event.address.street_nb)
      this.formControls['datetime_start'].setValue(new Date(this.event.datetime_start))
      this.formControls['datetime_end'].setValue(new Date(this.event.datetime_end))
      this.formControls['nb_people_min'].setValue(this.event.nb_people_min)
      this.formControls['nb_people_max'].setValue(this.event.nb_people_max)
    }
  }

  private _updateEventType() {
    if (this.event){
      console.log('_updateEventType(): entering')
      console.log(this.event.event_typeId)
      let retType = this.eventTypes.find((type : Category) => {
        if(type.id == this.event.event_typeId) {
          return type
        }
        return null
      })
      console.log('_updateEventType(): outside find')
      console.log(retType)
      this.eventType = retType ? retType : this._unknownEventType
    }
    else {
      this.eventType = this._unknownEventType
    }
  }
  

  // 👁️‍🗨️ READ Mode
  closePopup(){
    this.clickOnEventClose.emit(this.event.id)
  }
  
  
  // ✍️ UPDATE Mode
  saveModifications() {
    let eventUpd = <EventDtoUpd>{
      id: this.event.id,
      coop_id: this.event.coop_id,
      event_typeId: this.formControls['event_typeId'].value,
      name: this.formControls['name'].value,
      description: this.formControls['description'].value,
      location: this.formControls['location'].value,
      address: <Address> {
        postal_code: parseInt(this.formControls['addr_postal_code'].value),
        city: this.formControls['addr_city'].value,
        street_name: this.formControls['addr_street_name'].value,
        street_nb: this.formControls['addr_street_nb'].value
      },
      datetime_start: new Date(this.formControls['datetime_start'].value),
      datetime_end: new Date(this.formControls['datetime_end'].value),
      nb_people_min: parseInt(this.formControls['nb_people_min'].value),
      nb_people_max: parseInt(this.formControls['nb_people_max'].value),
      gps: <GpsPosition>{lon: 0, lat: 0}
    }

    // 👷 TODO: call service
    //this.gestEventService.updateEvent(eventUpd).subscribe({
    //  next : () => {
        this.clickOnEventUpdate.emit(this.event.id)
    //  }
    //})
  }
  
  cancelModifications(){
    this._fillFormWithEvent()
    this.clickOnEventCancel.emit(this.event.id)
  }
  

  // ✨ INSERT Mode
  saveNewEvent() {
    let eventNew = <EventDtoNew>{
      coop_id: this.coopId,
      event_typeId: this.formControls['event_typeId'].value,
      name: this.formControls['name'].value,
      description: this.formControls['description'].value,
      location: this.formControls['location'].value,
      address: <Address> {
        postal_code: parseInt(this.formControls['addr_postal_code'].value),
        city: this.formControls['addr_city'].value,
        street_name: this.formControls['addr_street_name'].value,
        street_nb: this.formControls['addr_street_nb'].value
      },
      datetime_start: new Date(this.formControls['datetime_start'].value),
      datetime_end: new Date(this.formControls['datetime_end'].value),
      nb_people_min: parseInt(this.formControls['nb_people_min'].value),
      nb_people_max: parseInt(this.formControls['nb_people_max'].value),
      gps: <GpsPosition>{lon: 0, lat: 0}
    }

    // 👷 TODO: call service
    //this.gestEventService.insertEvent(eventNew).subscribe({
    //  next : () => {
        this.clickOnNewEventSave.emit(this.coopId)
    //  }
    //})
  }
}

export enum FormMode {
  Read = 1,
  Update,
  New
}