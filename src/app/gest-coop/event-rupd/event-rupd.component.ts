import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EventView } from '../models/event.model';
import { Category } from '../models/types.model';
import { GesteventService } from '../services/gestevent.service';
import { NominatimService } from '../services/nominatim.service';
import { generateRUpdEventForm } from './forms/event-ru.form';

@Component({
  selector: 'app-event-rupd',
  templateUrl: './event-rupd.component.html',
  styleUrls: ['./event-rupd.component.scss']
})
export class EventRUpdComponent implements OnInit, OnChanges {
  private _unknownEventType: Category = <Category>{id: 0, label:"Type d'évènement inconnu"}

  ruEventForm: FormGroup = generateRUpdEventForm(this.fb, this.nominatimService)
  eventTypes: Category[] = []
  eventType: Category = this._unknownEventType

  @Input()
  event!: EventView
  
  @Input()
  editMode: boolean = false

  @Output() 
  clickOnEventUpdate: EventEmitter<number> = new EventEmitter<number>()

  @Output() 
  clickOnEventCancel: EventEmitter<number> = new EventEmitter<number>()
  
  @Output() 
  clickOnEventClose: EventEmitter<number> = new EventEmitter<number>()


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
  

  saveModifications() {
    // 👷 build UptDTO object

    // 👷 call service
    // 👷 this goes to service's call's next:
    console.log('EventRUpdComponent (child) emits clickOnEventUpdate')
    this.clickOnEventUpdate.emit(this.event.id)
  }
  
  cancelModifications(){
    this._fillFormWithEvent()
    console.log('EventRUpdComponent (child) emits clickOnEventCancel')
    this.clickOnEventCancel.emit(this.event.id)
  }
  
  closePopup(){
    console.log('EventRUpdComponent (child) emits clickOnEventClose')
    this.clickOnEventClose.emit(this.event.id)
  }

  
  
  
  // 👷 DEBUG
  testLogForm(){
    console.log(this.ruEventForm)
  }
}
