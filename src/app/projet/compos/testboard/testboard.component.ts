import { Component, OnInit } from '@angular/core';
import { ICooperative } from 'src/app/gest-coop/models/coop.model';
import { IEvent } from 'src/app/gest-coop/models/event.model';
import { Address, Category } from 'src/app/gest-coop/models/types.model';
import { GestcoopService } from 'src/app/gest-coop/services/gestcoop.service';
import { GesteventService } from 'src/app/gest-coop/services/gestevent.service';
import { NominatimService } from 'src/app/gest-coop/services/nominatim.service';

@Component({
  selector: 'app-testboard',
  templateUrl: './testboard.component.html',
  styleUrls: ['./testboard.component.scss']
})
export class TestboardComponent implements OnInit {
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
  ) { }

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
