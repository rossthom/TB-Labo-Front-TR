import { Component, OnInit } from '@angular/core';
import { Address, Category } from './models/types.model';
import { ICooperative } from './models/coop.model';
import { IEvent } from './models/event.model';
import { GestcoopService } from './services/gestcoop.service';
import { GesteventService } from './services/gestevent.service';
import { NominatimService } from './services/nominatim.service';

@Component({
  selector: 'app-gest-coop',
  templateUrl: './gest-coop.component.html',
  styleUrls: ['./gest-coop.component.scss']
})
export class GestCoopComponent implements OnInit {
  
  coopTypes: Category[] = []
  eventTypes: Category[] = []


  cooperatives: ICooperative[] = []
  //coopList: string[] = []
  selectedCoop!: ICooperative    // TODO: warning, selectedCoop not initialized

  events: IEvent[] = []
  selectedEvent!: IEvent         // TODO: warning, selectedEvent not initialized

  testGps: any = {}


  constructor(
    private gestCoopService: GestcoopService,
    private gestEventService: GesteventService,
    private nominatimService: NominatimService
  ) {
   }


  ngOnInit(): void {
    this.gestCoopService.getCoopTypes().subscribe({
      next : (res : Category[]) => {
        this.coopTypes = res
      }
    })

    this.gestCoopService.getEventTypes().subscribe({
      next : (res : Category[]) => {
        this.eventTypes = res
      }
    })
  }


  // Fetch all Cooperatives
  getAllCoops() {
    this.gestCoopService.getAllCoops().subscribe({
      next : (res : ICooperative[]) => {
        this.cooperatives = res
      }
    })
  }

  getOneCoop(id: number) {
    this.gestCoopService.getOneCoop(id).subscribe({
      next : (res : ICooperative) => {
        this.selectedCoop = res
      }
    })
  }

  getAllEvents(){
    this.gestEventService.getAllEvents().subscribe({
      next : (res : IEvent[]) => {
        this.events = res
      }
    })
  }

  getAllEventFromCoop(coopId: number) {
    this.gestEventService.getAllEventsFromCoop(coopId).subscribe({
      next : (res : IEvent[]) => {
        this.events = res
      }
    })   
  }

  getOneEvent(eventId: number){
    this.gestEventService.getOneEvent(eventId).subscribe({
      next : (res : IEvent) => {
        this.selectedEvent = res
        console.log(this.selectedEvent)
      }
    })
  }

  testNominatim(address: Address) {
    this.nominatimService.getAddressGpsLongLat(address).subscribe({
      next : (res : any) => {
        this.testGps = res[0]
        console.log(this.testGps)
      }
    })
  }
}
