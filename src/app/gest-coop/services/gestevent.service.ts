import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IEvent } from '../models/event.model';

@Injectable({
  providedIn: 'root'
})
export class GesteventService {
  private _apiUrl: string = environment.dataUrl


  constructor(
    private httpC : HttpClient,
  ) { }


  getAllEvents(): Observable<IEvent[]>{
    return this.httpC.get<IEvent[]>(this._apiUrl+"events?_expand=event_type")
  }

  getAllEventsFromCoop(coopId: number){
    return this.httpC.get<IEvent[]>(this._apiUrl+"events?_expand=event_type&coop_id=" + coopId)
  }

  getOneEvent(id: number){
    return this.httpC.get<IEvent>(this._apiUrl+"events/"+ id + "?_expand=event_type")
  }
}
