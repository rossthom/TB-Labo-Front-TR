import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CooperativeView } from './shared/models/coop.model';
import { EventView } from './shared/models/event.model';
import { CoopAuthService } from './shared/services/coop-auth.service';
import { CoopService } from './shared/services/coop.service';
import { EventService } from './shared/services/event.service';
import { FormMode } from './event-cru/event-cru.component';
import { map } from 'rxjs';
import { MessageService } from 'primeng/api';


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
    private coopAuthService: CoopAuthService,
    private messageService: MessageService
  ) {
  }

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.params["id"]){
      this.coopId = this.activatedRoute.snapshot.params["id"]
      this.getOneCoop(this.coopId)
    }
  }


  private _getEventsFromCoop(coopId: number){
    this.eventService.getAllEventsFromCoop(coopId)
    .pipe(
      map((events) => {
        events.sort(
          (e1, e2) => {
            let firstDate = e1.datetime_start;
            let secondDate = e2.datetime_start;
          
            if (firstDate < secondDate) return -1;
            if (firstDate > secondDate) return 1;
            return 0;
          }
        );
        return events;
        })
    )
    .subscribe(events => this.coopEvents = events)
  }


  getOneCoop(id: number) {
    if (id != 0) {
      this.coopService.getOneCoop(id)
        .subscribe(coop => this.selectedCoop = coop)

      this._getEventsFromCoop(id)
    }
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
    this.messageService.add({
      severity:'success', 
      summary:'Mise à jour réussie', 
      detail:"Les modifications concernant votre coopératives sont bien enregistrées dans notre base de données."
    })
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
    this.messageService.add({
      severity:'success', 
      summary:'Mise à jour réussie', 
      detail:"Les modifications concernant votre événement sont bien enregistrées dans notre base de données."
    })
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
    this.messageService.add({
      severity:'success', 
      summary:'Création réussie', 
      detail:"Votre nouvel événement est bien enregistré dans notre base de données."
    })
  }
}
