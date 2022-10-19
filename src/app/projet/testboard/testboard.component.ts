import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CooperativeView } from 'src/app/gest-coop/shared/models/coop.model';
import { EventView } from 'src/app/gest-coop/shared/models/event.model';
import { Category } from 'src/app/gest-coop/shared/models/types.model';
import { GestCoopService } from 'src/app/gest-coop/shared/services/gest-coop.service';
import { GestEventService } from 'src/app/gest-coop/shared/services/gest-event.service';
import { Address } from 'src/app/openstreetmap/shared/models/types.model';
import { NominatimService } from 'src/app/openstreetmap/shared/services/nominatim.service';

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
  testAddresses: Address[] = [
    {
      postal_code: 5002,
      city: 'Namur',
      street_name: 'Traverse des Muses',
      street_nb: '1'
    },
    {
      postal_code: 5002,
      city: 'Namur',
      street_name: 'Traverse des Muses',
      street_nb: ''
    },
    {
      postal_code: 5002,
      city: 'Namur',
      street_name: '',
      street_nb: ''
    },
    {
      postal_code: 5000,
      city: '',
      street_name: '',
      street_nb: ''
    },
    {
      postal_code: 1234,
      city: 'Namur',
      street_name: '',
      street_nb: ''
    },
    {
      postal_code: 1234,
      city: 'gmlkjd',
      street_name: '',
      street_nb: ''
    },
  ]

  constructor(
    private gestCoopService: GestCoopService,
    private gestEventService: GestEventService,
    private nominatimService: NominatimService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.gestCoopService.getCoopTypes()
      .subscribe(coopTypes => this.coopTypes = coopTypes)

    this.gestEventService.getEventTypes()
      .subscribe(eventTypes => this.eventTypes = eventTypes)
  }
  // Fetch all Cooperatives
  getAllCoops() {
    this.gestCoopService.getAllCoops()
      .subscribe(coops => this.cooperatives = coops)
  }

  getOneCoop(id: number) {
    this.gestCoopService.getOneCoop(id)
      .subscribe(coop => this.selectedCoop = coop)
  }

  getAllEvents(){
    this.gestEventService.getAllEvents()
      .subscribe(events => this.events = events)
  }

  getAllEventFromCoop(coopId: number) {
    this.gestEventService.getAllEventsFromCoop(coopId)
      .subscribe(events => this.events = events)   
  }

  getOneEvent(eventId: number){
    this.gestEventService.getOneEvent(eventId)
      .subscribe(event => this.selectedEvent = event)
  }

  testNominatim(address: Address) {
    this.nominatimService.getAddressGpsLongLat(address)
      .subscribe(res => this.testGps = res[0])
  }

  toast1() {
    this.messageService.add({severity:'success', summary:'Service Message', detail:'Via MessageService'});
  }
}
