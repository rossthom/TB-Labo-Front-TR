import { Component, OnInit } from '@angular/core';
import { FormMode } from '../event-cru/event-cru.component';
import { CooperativeView } from '../shared/models/coop.model';
import { EventView } from '../shared/models/event.model';
import { GestcoopService } from '../shared/services/gestcoop.service';
import { GesteventService } from '../shared/services/gestevent.service';

@Component({
  selector: 'app-coop-view',
  templateUrl: './coop-view.component.html',
  styleUrls: ['./coop-view.component.scss']
})
export class CoopViewComponent implements OnInit {
  listCoops!: CooperativeView[]    // DEBUG: FOR DEBUG !

  coopId: number = 0
  selectedCoop!: CooperativeView   // TODO: attribut selectedCoop non initialisé !
  //updatePopupVisible: boolean = false;
  
  coopEvents!: EventView[]         // TODO: attribut coopEvents non initialisé !
  selectedEvent!: EventView        // TODO: attribut selectedEvent non initialisé !
  //cruEventPopupVisible: boolean = false;          // Event popup display status
  //cruEventPopupMode: FormMode = FormMode.Read;    // Event popup display mode

  constructor(
    private gestCoopService: GestcoopService,
    private gestEventService: GesteventService
  ) { }

  ngOnInit(): void {
    this.gestCoopService.getAllCoops().subscribe({
      next : (res : CooperativeView[]) => {
        this.listCoops = res
      }
    })
  }


  private _getEventsFromCoop(coopId: number){
    this.gestEventService.getAllEventsFromCoop(coopId).subscribe({
      next : (res : EventView[]) => {
        this.coopEvents = res
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


  showEvent(event: EventView){
    this.selectedEvent = event
  }

  register() {
    // TODO: Register the connected user to this event...
    alert('not yet implemented')
  }
}
