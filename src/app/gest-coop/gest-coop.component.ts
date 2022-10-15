import { Component, OnInit } from '@angular/core';
import { CooperativeDtoUpd, CooperativeView } from './models/coop.model';
import { EventView } from './models/event.model';
import { GestcoopService } from './services/gestcoop.service';
import { GesteventService } from './services/gestevent.service';


@Component({
  selector: 'app-gest-coop',
  templateUrl: './gest-coop.component.html',
  styleUrls: ['./gest-coop.component.scss']
})
export class GestCoopComponent implements OnInit {
  listCoops!: CooperativeView[]    // DEBUG: FOR DEBUG !

  coopId: number = 0
  selectedCoop!: CooperativeView   // TODO: attribut selectedCoop non initialisé !
  updatePopupVisible: boolean = false;
  
  coopEvents!: EventView[]         // TODO: attribut coopEvents non initialisé !
  selectedEvent!: EventView        // TODO: attribut selectedEvent non initialisé !
  ruEventPopupVisible: boolean = false;   // READ / UPDATE Event popup display status
  ruEventPopupEditMode: boolean = false;  // READ / UPDATE Event popup edit mode status
  cEventPopupVisible: boolean = false;    // CREATE Event popup display status

  constructor(
    private gestCoopService: GestcoopService,
    private gestEventService: GesteventService
  ) {
  }

  ngOnInit(): void {
    this.gestCoopService.getAllCoops().subscribe({
      next : (res : CooperativeView[]) => {
        this.listCoops = res
      }
    })
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


  showEvent(id: number, edit: boolean){
    if (id != 0) {
      this.gestEventService.getOneEvent(id).subscribe({
        next : (res : EventView) => {
          this.selectedEvent = res
          this.ruEventPopupVisible = true;
          this.ruEventPopupEditMode = edit;
        }
      })
    }
  }

  // ℹ️ Update Coop Child Compo emitted Outputs managment
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
  

  // ℹ️ View-Update Events Child Compo emitted Outputs managment
  updateEvent(eventId: number){
    this._getEventsFromCoop(this.coopId)
    console.log('GestCoopComponent (parent) caught clickOnEventUpdate')
    this.ruEventPopupVisible = false
  }

  cancelEventUpdate(eventId: number){
    console.log('GestCoopComponent (parent) caught clickOnEventCancel')
    this.ruEventPopupVisible = false
  }

  closeEventView(eventId: number){
    console.log('GestCoopComponent (parent) caught clickOnEventClose')
    this.ruEventPopupVisible = false
  }
}
