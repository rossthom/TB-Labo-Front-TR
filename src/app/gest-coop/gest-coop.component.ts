import { Component, OnInit } from '@angular/core';
import { ICooperative } from './models/coop.model';
import { IEvent } from './models/event.model';
import { GestcoopService } from './services/gestcoop.service';
import { GesteventService } from './services/gestevent.service';


@Component({
  selector: 'app-gest-coop',
  templateUrl: './gest-coop.component.html',
  styleUrls: ['./gest-coop.component.scss']
})
export class GestCoopComponent implements OnInit {
  coopId: number = 0
  listCoops!: ICooperative[]    // TODO: attribut listCoops non initialisé !
  selectedCoop!: ICooperative   // TODO: attribut selectedCoop non initialisé !
  coopEvents!: IEvent[]         // TODO: attribut coopEvents non initialisé !
  selectedEvent!: IEvent        // TODO: attribut selectedEvent non initialisé !

  constructor(
    private gestCoopService: GestcoopService,
    private gestEventService: GesteventService
  ) {
  }

  ngOnInit(): void {
    this.gestCoopService.getAllCoops().subscribe({
      next : (res : ICooperative[]) => {
        this.listCoops = res
      }
    })
  }

  getOneCoop(id: number) {
    if (id != 0) {
      this.gestCoopService.getOneCoop(id).subscribe({
        next : (res : ICooperative) => {
          this.selectedCoop = res
        }
      })

      this.gestEventService.getAllEventsFromCoop(id).subscribe({
        next : (res : IEvent[]) => {
          this.coopEvents = res
        }
      })
    }
  }

  getOneEvent(eventId: number){
    console.log('coucou')
    this.gestEventService.getOneEvent(eventId).subscribe({
      next : (res : IEvent) => {
        this.selectedEvent = res
        //console.log(this.selectedEvent)
      }
    })
  }
}
