import { Component, OnInit } from '@angular/core';
import { CooperativeView } from '../../gest-coop/shared/models/coop.model';
import { EventView } from '../../gest-coop/shared/models/event.model';
import { GestcoopService } from '../../gest-coop/shared/services/gestcoop.service';
import { GesteventService } from '../../gest-coop/shared/services/gestevent.service';

@Component({
  selector: 'app-coop-view',
  templateUrl: './coop-view.component.html',
  styleUrls: ['./coop-view.component.scss']
})
export class CoopViewComponent implements OnInit {
  listCoops!: CooperativeView[]    

  coopId: number = 0
  selectedCoop!: CooperativeView   // TODO: attribut selectedCoop non initialisé !
  
  coopEvents!: EventView[]         // TODO: attribut coopEvents non initialisé !
  selectedEvent!: EventView        // TODO: attribut selectedEvent non initialisé !

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
