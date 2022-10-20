import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CooperativeView } from 'src/app/gest-coop/shared/models/coop.model';
import { EventView } from 'src/app/gest-coop/shared/models/event.model';
import { Category } from 'src/app/gest-coop/shared/models/types.model';
import { CoopService } from 'src/app/gest-coop/shared/services/coop.service';
import { EventService } from 'src/app/gest-coop/shared/services/event.service';
import { Address, GpsPosition } from 'src/app/openstreetmap/shared/models/types.model';
import { OsmService } from 'src/app/openstreetmap/shared/services/osm.service';

@Component({
  selector: 'app-testboard',
  templateUrl: './testboard.component.html',
  styleUrls: ['./testboard.component.scss']
})
export class TestboardComponent implements OnInit {
  coopTypes: Category[] = []
  eventTypes: Category[] = []


  cooperatives: CooperativeView[] = []
  //coopList: string[] = []
  selectedCoop!: CooperativeView    // TODO: warning, selectedCoop not initialized

  events: EventView[] = []
  selectedEvent!: EventView         // TODO: warning, selectedEvent not initialized

  testGps: any = {}


  startLon: number = 4.8723252
  startLat: number = 50.4589561
  endLon: number = 5.1101419
  endLat: number = 50.3084048
  resultOpenRoute: any

  constructor(
    private coopService: CoopService,
    private eventService: EventService,
    private osmService: OsmService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.coopService.getCoopTypes()
      .subscribe(coopTypes => this.coopTypes = coopTypes)

    this.eventService.getEventTypes()
      .subscribe(eventTypes => this.eventTypes = eventTypes)
  }
  // Fetch all Cooperatives
  getAllCoops() {
    this.coopService.getAllCoops()
      .subscribe(coops => this.cooperatives = coops)
  }

  getOneCoop(id: number) {
    this.coopService.getOneCoop(id)
      .subscribe(coop => this.selectedCoop = coop)
  }

  getAllEvents(){
    this.eventService.getAllEvents()
      .subscribe(events => this.events = events)
  }

  getAllEventFromCoop(coopId: number) {
    this.eventService.getAllEventsFromCoop(coopId)
      .subscribe(events => this.events = events)   
  }

  getOneEvent(eventId: number){
    this.eventService.getOneEvent(eventId)
      .subscribe(event => this.selectedEvent = event)
  }

  testNominatim(address: Address) {
    this.osmService.getAddressGpsLongLat(address)
      .subscribe(res => this.testGps = res[0])
  }

  toast1() {
    this.messageService.add({severity:'success', summary:'Service Message', detail:'Via MessageService'});
  }

  testOpenroute(){
    let start = <GpsPosition>{lon: this.startLon , lat: this.startLat}
    let end = <GpsPosition>{lon: this.endLon, lat: this.endLat}

    this.osmService.getIniterary(start, end)
      .subscribe((res: any) => {
        let resSlim = {
          distance: res.features[0].properties.summary.distance,
          duration: res.features[0].properties.summary.duration,
          coordinates: res.features[0].geometry.coordinates
        }
        this.resultOpenRoute = resSlim
      })
  }
}
