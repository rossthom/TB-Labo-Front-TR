import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EventDtoUpd, EventView } from '../models/event.model';
import { Category, GpsPosition } from '../models/types.model';
import { NominatimService } from './nominatim.service';

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
    return this.httpC.patch(
      this._apiUrl + "events/" + event.id,
      event
      ).pipe(
        // TODO: not working, execute the patch before getting response from Nominatim...
        switchMap(_ => this.nominatimService.getAddressGpsLongLat(event.address)
        .pipe(
          map((res: any) => {
            event.gps = <GpsPosition>{lon: parseFloat(res[0].lon), lat: parseFloat(res[0].lat)}
            return event
          })
        )
      )
    )
  }
}
