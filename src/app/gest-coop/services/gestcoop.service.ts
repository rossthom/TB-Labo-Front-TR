import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, switchMap, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICooperative } from '../models/coop.model';
import { IEvent } from '../models/event.model';
import { Category, GpsPosition } from '../models/types.model';
import { NominatimService } from './nominatim.service';

@Injectable({
  providedIn: 'root'
})
export class GestcoopService {
  private _apiUrl: string = environment.dataUrl

  constructor(
    private httpC : HttpClient,
    private nominatimService: NominatimService
  ) { }
 

  getCoopTypes(): Observable<Category[]>{
    return this.httpC.get<Category[]>(this._apiUrl+"coop_types")
  }

  getEventTypes(): Observable<Category[]>{
    return this.httpC.get<Category[]>(this._apiUrl+"event_types")
  }


  /* Ca non plus, ça ne fonctionne pas...
  getCoopNamesList(): string[]{
    let res = this.httpC.get<ICooperative[]>(this._apiUrl+"cooperatives")
    let list: string[] = []

    res.pipe(
      map((coops: ICooperative[]) => {
        coops.map((coop: ICooperative) => {
          list.push(coop.name)
        })
        return list
      }))

    return list
  } 
  */

  getAllCoops(): Observable<ICooperative[]>{
    /*
    return this.httpC.get<ICooperative[]>(this._apiUrl+"cooperatives")
      .pipe(
        switchMap((coop: ICooperative) => this.httpC.get<Category>(this._apiUrl+"coop_types/" + coop.coop_type_id)
          .pipe(
            map((c: Category) => {
              //tontraitement pour insérer le label dans ton object
              //Ici tu as accès au label et à cooperative
              coop.coop_type_label = c.label
              return coop
            }
            )
          )
        )
      );
    */
    
    return this.httpC.get<ICooperative[]>(this._apiUrl+"cooperatives")
    /*
    .pipe(
      map((coops: ICooperative[]) => {
        coops.map((coop: ICooperative) => {
          //  - ... the CoopType label,
          //coop.coop_type_label = "" + this._coopTypes.find((coopType: Category) => coopType.id == coop.coop_type_id)?.label
          this.httpC.get<Category>(this._apiUrl+"coop_types/" + coop.coop_type_id)
            .pipe(
              map((c: Category) => {
                console.log("coucou")
                coop.coop_type_label = c.label
                return coop
              })
            )

          //  - the GPS position of its address
          // ...
        })
        return coops
      })
    )
    */
  }

  getOneCoop(id: number): Observable<ICooperative>{
    /* The Jawad touch, use _expand to link directly coop_types to cooperatives.
     * for it to work, 'cooperatives' must have its FK named 'coop_typeId' (so the targetted file name: 'coop_types', minus the 's', plus 'Id')
     * that's the naming convension for it to work.
     * _expand is for many-to-one
     * _embed is for one-to-many
    */
    return this.httpC.get<ICooperative>(this._apiUrl+"cooperatives/" + id + "?_expand=coop_type")
    
    /* Old code. It worked, but it's pointless now.
    return this.httpC.get<ICooperative>(this._apiUrl+"cooperatives/" + id).pipe(
      // TODO: peut-on l'optimiser avec un forkJoin ?,
      switchMap((coop: ICooperative) => this.httpC.get<Category>(this._apiUrl+"coop_types/" + coop.coop_type_id)
        .pipe(
          map((c: Category) => {
            coop.coop_type_label = c.label
            return coop
          }
          )
        )
      ),
      
      //No need for GPS data, it's on the DB already. We'll fetch them at CREATE and PUT
      // switchMap((coop: ICooperative) => this.nominatimService.getAddressGpsLongLat(coop.address)
      //   .pipe(
      //     map((res: any) => {
      //       console.log('res from nominatimService')
      //       //console.log(res.lon + " ; " + res.lat)
      //       console.log(res[0])
      //       coop.gps = <GpsPosition>{lon: parseFloat(res[0].lon), lat: parseFloat(res[0].lat)}
      //       return coop
      //     }
      //     )
      //   )
      // ),
      )
      */
  }
  
  getAllEvents(): Observable<IEvent[]>{
    return this.httpC.get<IEvent[]>(this._apiUrl+"events").pipe(
      // For each Event, I want to get: ...
      map((events: IEvent[]) => {
        //console.log(coops)
        events.map((event: IEvent) => {
          //  - ... the EventType label,
          //event.event_type_label = "" + this._eventTypes.find((eventType: Category) => eventType.id == event.event_type_id)?.label
          
          //  - ... the GPS position of its address
          // ...
        })
        return events
      })
    )
  }
}
