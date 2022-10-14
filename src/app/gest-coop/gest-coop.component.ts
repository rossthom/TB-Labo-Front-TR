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
  coopId: number = 0
  listCoops!: CooperativeView[]    // TODO: attribut listCoops non initialisé !
  selectedCoop!: CooperativeView   // TODO: attribut selectedCoop non initialisé !
  coopEvents!: EventView[]         // TODO: attribut coopEvents non initialisé !
  selectedEvent!: EventView        // TODO: attribut selectedEvent non initialisé !

  updatePopupVisible: boolean = false;

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

      this.gestEventService.getAllEventsFromCoop(id).subscribe({
        next : (res : EventView[]) => {
          this.coopEvents = res
        }
      })
    }
  }

  getOneEvent(eventId: number){
    this.gestEventService.getOneEvent(eventId).subscribe({
      next : (res : EventView) => {
        this.selectedEvent = res
      }
    })
  }

  showUpdatePopup(){
    this.updatePopupVisible = true;
  }

  updateCooperative(coopId: number) {
    this.getOneCoop(coopId)
    this.updatePopupVisible = false
  }
  
  cancelUpdate(coopId: number) {
    this.updatePopupVisible = false
  }
}
