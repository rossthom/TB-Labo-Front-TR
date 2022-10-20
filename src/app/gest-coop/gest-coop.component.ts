import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoopAuthService } from './shared/services/coop-auth.service';
import { FormMode } from './event-cru/event-cru.component';
import { CooperativeView } from './shared/models/coop.model';
import { EventView } from './shared/models/event.model';
import { CoopService } from './shared/services/coop.service';
import { EventService } from './shared/services/event.service';


@Component({
  selector: 'app-gest-coop',
  templateUrl: './gest-coop.component.html',
  styleUrls: ['./shared/styles/table-transposed.style.scss']
})
export class GestCoopComponent implements OnInit {

  coopId: number = 0
  selectedCoop!: CooperativeView   // TODO: attribut selectedCoop non initialisé !
  updatePopupVisible: boolean = false;
  
  coopEvents!: EventView[]         // TODO: attribut coopEvents non initialisé !
  selectedEvent!: EventView        // TODO: attribut selectedEvent non initialisé !
  cruEventPopupVisible: boolean = false;          // Event popup display status
  cruEventPopupMode: FormMode = FormMode.Read;    // Event popup display mode

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private coopService: CoopService,
    private eventService: EventService,
    private coopAuthService: CoopAuthService
  ) {
  }

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.params["id"]){
      this.coopId = this.activatedRoute.snapshot.params["id"]
      this.getOneCoop(this.coopId)
    }
  }

  getOneCoop(id: number) {
    if (id != 0) {
      this.coopService.getOneCoop(id)
        .subscribe(coop => this.selectedCoop = coop)

      this._getEventsFromCoop(id)
    }
  }

  private _getEventsFromCoop(coopId: number){
    this.eventService.getAllEventsFromCoop(coopId)
      .subscribe(events => this.coopEvents = events)
  }


  logout() {
    this.coopAuthService.logout()
    this.router.navigate([""])
  }

  // ℹ️ Update Coop Popup
  showCoopUpdatePopup(){
    this.updatePopupVisible = true;
  }

  updateCooperative(coopId: number) {
    this.getOneCoop(coopId)
    this.updatePopupVisible = false
  }
  
  cancelCoopUpdate(coopId: number) {
    this.updatePopupVisible = false
  }
  

  // ℹ️ Event Popup
  showEventPopup(eventId: number, mode: FormMode){
    if (mode == FormMode.New) {
      this.cruEventPopupVisible = true;
      this.cruEventPopupMode = mode;
    }
    else {
      if (eventId != 0) {
        this.eventService.getOneEvent(eventId)
          .subscribe((event : EventView) => {
            this.selectedEvent = event
            this.cruEventPopupVisible = true;
            this.cruEventPopupMode = mode;
          })
      }
    }
  }
  
  eventViewClosed(eventId: number){
    this.cruEventPopupVisible = false
    this.cruEventPopupMode = FormMode.Read
  }
  
  eventUpdated(eventId: number){
    this._getEventsFromCoop(this.coopId)
    this.cruEventPopupVisible = false
    this.cruEventPopupMode = FormMode.Read
  }

  eventUpdateNewCanceled(eventId: number){
    this.cruEventPopupVisible = false
    this.cruEventPopupMode = FormMode.Read
  }
  
  // ℹ️ New Event Popup
  newEventSaved(eventId: number){
    this._getEventsFromCoop(this.coopId)
    this.cruEventPopupVisible = false
    this.cruEventPopupMode = FormMode.Read
  }
}
