import { Component, OnInit } from '@angular/core';
import { Address, Category } from './models/types.model';
import { ICooperative } from './models/coop.model';
import { IEvent } from './models/event.model';
import { GestcoopService } from './services/gestcoop.service';
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
  selectedCoop!: ICooperative

  events: IEvent[] = []

  testGps: any = {}


  constructor(
    private gestCoopService: GestcoopService,
    private nominatimService: NominatimService  // TODO: for test purpose only, should not be directly called here.
  ) {
   }


  ngOnInit(): void {
    //console.log('GestCoopComponent ngOnInit()')
    //console.log(this.coopTypes)
    //console.log(this.eventTypes)
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
  /*
  getCoopNamesList(){
    this.coopList = this.gestCoopService.getCoopNamesList()
  }
  */
  getAllCoops() {
    this.gestCoopService.getAllCoops().subscribe({
      next : (res : ICooperative[]) => {
        //console.log(res)
        this.cooperatives = res
        //console.log(this.cooperatives)
      }
    })
  }

  getOneCoop(id: number) {
    this.gestCoopService.getOneCoop(id).subscribe({
      next : (res : ICooperative) => {
        //console.log(res)
        this.selectedCoop = res
        //console.log(this.selectedCoop)
      }
    })
  }

  getAllEvents(){
    this.gestCoopService.getAllEvents().subscribe({
      next : (res : IEvent[]) => {
        //console.log(res)
        this.events = res
        console.log(this.events)
      }
    })
  }

  
  // TODO: to delete, only for test
  testGetGpsPos(){
    let addr = <Address>{
      postal_code: 5002,
      city: "Namur",
      street_name: "Traverse des Muses",
      street_nb: "1"
    }

    this.nominatimService.getAddressGpsLongLat(addr).subscribe({
      next : (res : any) => {
        console.log(res)
        this.testGps = res
      }
    })
  } 
}
