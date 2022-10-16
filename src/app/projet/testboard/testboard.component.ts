import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CooperativeView } from 'src/app/gest-coop/shared/models/coop.model';
import { EventView } from 'src/app/gest-coop/shared/models/event.model';
import { Address, Category } from 'src/app/gest-coop/shared/models/types.model';
import { GestcoopService } from 'src/app/gest-coop/shared/services/gestcoop.service';
import { GesteventService } from 'src/app/gest-coop/shared/services/gestevent.service';
import { NominatimService } from 'src/app/gest-coop/shared/services/nominatim.service';

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
    private gestCoopService: GestcoopService,
    private gestEventService: GesteventService,
    private nominatimService: NominatimService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.gestCoopService.getCoopTypes().subscribe({
      next : (res : Category[]) => {
        this.coopTypes = res
      }
    })

    this.gestEventService.getEventTypes().subscribe({
      next : (res : Category[]) => {
        this.eventTypes = res
      }
    })
  }
  // Fetch all Cooperatives
  getAllCoops() {
    this.gestCoopService.getAllCoops().subscribe({
      next : (res : CooperativeView[]) => {
        this.cooperatives = res
      }
    })
  }

  getOneCoop(id: number) {
    this.gestCoopService.getOneCoop(id).subscribe({
      next : (res : CooperativeView) => {
        this.selectedCoop = res
      }
    })
  }

  getAllEvents(){
    this.gestEventService.getAllEvents().subscribe({
      next : (res : EventView[]) => {
        this.events = res
      }
    })
  }

  getAllEventFromCoop(coopId: number) {
    this.gestEventService.getAllEventsFromCoop(coopId).subscribe({
      next : (res : EventView[]) => {
        this.events = res
      }
    })   
  }

  getOneEvent(eventId: number){
    this.gestEventService.getOneEvent(eventId).subscribe({
      next : (res : EventView) => {
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


  toast1() {
    this.messageService.add({severity:'success', summary:'Service Message', detail:'Via MessageService'});
  }
}
