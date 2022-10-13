import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICooperative } from '../models/coop.model';
import { IEvent } from '../models/event.model';
import { Category } from '../models/types.model';

@Injectable({
  providedIn: 'root'
})
export class GestcoopService {
  private _apiUrl: string = environment.dataUrl
  
  // TODO: Preload CoopTypes data from backend
  private _coopTypes: Category[] = [
    {id: 1, label: "Réseau Transition"},
    {id: 2, label: "Contrat de Rivière"},
    {id: 3, label: "GASAP"},
    {id: 4, label: "ASBL"}
  ]
  
  // TODO: Preload EventTypes data from backend
  private _eventTypes: Category[] = [
    {id: 1, label: "Ramassage Déchets"},
    {id: 2, label: "Atelier"},
    {id: 3, label: "Aide Récolte"},
    {id: 4, label: "Ciné-Débat"},
    {id: 5, label: "Sortie Nature"}
  ]


  constructor(
    private httpC : HttpClient
  ) { }
  
  // TODO: Not working properly due to async behavior
  loadCategories() {
    return forkJoin({
      // GET Coop Types list
      coopTypes: this.httpC.get<Category[]>(this._apiUrl+"coop_types"),
      // GET Events Types list
      eventTypes: this.httpC.get<Category[]>(this._apiUrl+"event_types"),
    }).subscribe((res) => {
      this._coopTypes = res.coopTypes
      this._eventTypes = res.eventTypes
    });
    /*
    // GET Coop Types list
    this.httpC.get<Category[]>(this._apiUrl+"coop_types").subscribe({
      next : (res : Category[]) => {
        this._coopTypes = res
        console.log(this._coopTypes)
      }
    })
    
    // GET Events Types list
    this.httpC.get<Category[]>(this._apiUrl+"event_types").subscribe({
      next : (res : Category[]) => {
        this._eventTypes = res
        console.log(this._eventTypes)
      }
    })
    */
  }

  //get coopTypes() {return this._coopTypes}
  //get eventTypes() {return this._eventTypes}
  
  getCoopTypes(): Observable<Category[]>{
    return this.httpC.get<Category[]>(this._apiUrl+"coop_types")
  }

  getEventTypes(): Observable<Category[]>{
    return this.httpC.get<Category[]>(this._apiUrl+"event_types")
  }


  getAllCoops(): Observable<ICooperative[]>{
    return this.httpC.get<ICooperative[]>(this._apiUrl+"cooperatives").pipe(
      // For each Cooperative, I want to get: ...
      //  - ... the CoopType label,
      map((coops: ICooperative[]) => {
        coops.map((coop: ICooperative) => {
          coop.coop_type_label = "" + this._coopTypes.find((coopType: Category) => coopType.id == coop.coop_type_id)?.label
        })
        return coops
      })

      //  - the GPS position of its address
      // ...
    )
  }

  getAllEvents(): Observable<IEvent[]>{
    return this.httpC.get<IEvent[]>(this._apiUrl+"events").pipe(
      // For each Event, I want to get: ...
      //  - ... the EventType label,
      map((events: IEvent[]) => {
        //console.log(coops)
        events.map((event: IEvent) => {
          event.event_type_label = "" + this._eventTypes.find((eventType: Category) => eventType.id == event.event_type_id)?.label
        })
        return events
      })

      //  - ... the GPS position of its address
      // ...
    )
  }
}
