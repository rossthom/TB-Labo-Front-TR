import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoopLoginService } from '../shared/services/coop-login.service';
import { FormMode } from './event-cru/event-cru.component';
import { CooperativeView } from './shared/models/coop.model';
import { EventView } from './shared/models/event.model';
import { GestcoopService } from './shared/services/gestcoop.service';
import { GesteventService } from './shared/services/gestevent.service';


@Component({
  selector: 'app-gest-coop',
  templateUrl: './gest-coop.component.html',
  styleUrls: ['./gest-coop.component.scss']
})
export class GestCoopComponent implements OnInit {
  //listCoops!: CooperativeView[]    // DEBUG: FOR DEBUG !

  coopId: number = 0
  selectedCoop!: CooperativeView   // TODO: attribut selectedCoop non initialisé !
  updatePopupVisible: boolean = false;
  
  coopEvents!: EventView[]         // TODO: attribut coopEvents non initialisé !
  selectedEvent!: EventView        // TODO: attribut selectedEvent non initialisé !
  cruEventPopupVisible: boolean = false;          // Event popup display status
  cruEventPopupMode: FormMode = FormMode.Read;    // Event popup display mode
  //cEventPopupVisible: boolean = false;    // CREATE Event popup display status

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private gestCoopService: GestcoopService,
    private gestEventService: GesteventService,
    private coopLoginService: CoopLoginService
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
      this.gestCoopService.getOneCoop(id).subscribe({
        next : (res : CooperativeView) => {
          this.selectedCoop = res
        }
      })

      this._getEventsFromCoop(id)
    }
  }

  private _getEventsFromCoop(coopId: number){
    this.gestEventService.getAllEventsFromCoop(coopId).subscribe({
      next : (res : EventView[]) => {
        this.coopEvents = res
      }
    })
  }


  logout() {
    this.coopLoginService.logout()
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
        this.gestEventService.getOneEvent(eventId).subscribe({
          next : (res : EventView) => {
            this.selectedEvent = res
            this.cruEventPopupVisible = true;
            this.cruEventPopupMode = mode;
          }
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
