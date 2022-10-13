import { Component, OnInit } from '@angular/core';
import { Category } from './models/types.model';
import { ICooperative } from './models/coop.model';
import { IEvent } from './models/event.model';
import { GestcoopService } from './services/gestcoop.service';

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
  selectedCoop!: ICooperative // TODO: warning, selectedCoop not initialized

  events: IEvent[] = []

  testGps: any = {}


  constructor(
    private gestCoopService: GestcoopService,
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
    this.gestCoopService.getAllEvents().subscribe({
      next : (res : IEvent[]) => {
        this.events = res
        console.log(this.events)
      }
    })
  }
}
