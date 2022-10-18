import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, mergeMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EventDtoNew, EventDtoUpd, EventView } from '../models/event.model';
import { Category } from '../models/types.model';
import { NominatimService } from '../../../openstreetmap/shared/services/nominatim.service';
import { GpsPosition } from 'src/app/openstreetmap/shared/models/types.model';

@Injectable({
  providedIn: 'root'
})
export class GesteventService {
  private _apiUrl: string = environment.dataUrl


  constructor(
    private httpC : HttpClient,
    private nominatimService: NominatimService
  ) { }


  getEventTypes(): Observable<Category[]>{
    return this.httpC.get<Category[]>(this._apiUrl+"event_types")
  }

  getAllEvents(): Observable<EventView[]>{
    return this.httpC.get<EventView[]>(this._apiUrl+"events?_expand=event_type")
  }

  getAllEventsFromCoop(coopId: number){
    return this.httpC.get<EventView[]>(this._apiUrl+"events?_expand=event_type&coop_id=" + coopId)
  }

  getOneEvent(id: number){
    return this.httpC.get<EventView>(this._apiUrl+"events/"+ id + "?_expand=event_type")
  }

  updateEvent(event: EventDtoUpd){
    return this.nominatimService.getAddressGpsLongLat(event.address)
      .pipe(
        mergeMap(res => {
          return this.httpC.patch(
            this._apiUrl + "events/" + event.id,
            { ...event, gps: <GpsPosition>{lon: parseFloat(res[0].lon), lat: parseFloat(res[0].lat)}}
          )
        })
      )
  }

  insertEvent(event: EventDtoNew){
    return this.nominatimService.getAddressGpsLongLat(event.address)
      .pipe(
        mergeMap(res => {
          return this.httpC.post(
            this._apiUrl + "events",
            { ...event, gps: <GpsPosition>{lon: parseFloat(res[0].lon), lat: parseFloat(res[0].lat)}}
          )
        })
      )
  }
}
