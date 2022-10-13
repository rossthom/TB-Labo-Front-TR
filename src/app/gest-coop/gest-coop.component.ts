import { Component, OnInit } from '@angular/core';
import { IAddress } from './models/address.model';
import { Category } from './models/category.model';
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
  
  coopTypes: Category[] = [
    {id: 1, label:"dummy coop type 1"},
    {id: 2, label:"dummy coop type 2"}
  ]//this.gestCoopService.coopTypes
  eventTypes: Category[] = [
    {id: 1, label:"dummy coop event 1"},
    {id: 2, label:"dummy coop event 2"}
  ]//this.gestCoopService.eventTypes


  cooperatives: ICooperative[] = []
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
  }


  // Fetch all Cooperatives
  getAllCoops(){
    this.gestCoopService.getAllCoops().subscribe({
      next : (res : ICooperative[]) => {
        //console.log(res)
        this.cooperatives = res
        console.log(this.cooperatives)
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
    let addr = <IAddress>{
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
