import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CooperativeDtoUpd, CooperativeView } from '../models/coop.model';
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

  getAllCoops(): Observable<CooperativeView[]>{
    return this.httpC.get<CooperativeView[]>(this._apiUrl+"cooperatives?_expand=coop_type")
  }

  getOneCoop(id: number): Observable<CooperativeView>{
    /* The Jawad touch, use _expand to link directly coop_types to cooperatives.
     * for it to work, 'cooperatives' must have its FK named 'coop_typeId' (so the targetted file name: 'coop_types', minus the 's', plus 'Id')
     * that's the naming convension for it to work.
     * _expand is for many-to-one
     * _embed is for one-to-many
    */
    return this.httpC.get<CooperativeView>(this._apiUrl+"cooperatives/" + id + "?_expand=coop_type")
    
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

  updateCoop(coop: CooperativeDtoUpd){
    //console.log(this._apiUrl + "cooperatives/" + coop.id)
    //console.log(coop)
    return this.httpC.patch(
      this._apiUrl + "cooperatives/" + coop.id,
      coop
      ).pipe(
        // TODO: not working, execute the patch before getting response from Nominatim...
        switchMap(_ => this.nominatimService.getAddressGpsLongLat(coop.address)
        .pipe(
          map((res: any) => {
            //console.log(res)
            coop.gps = <GpsPosition>{lon: parseFloat(res[0].lon), lat: parseFloat(res[0].lat)}
            //console.log(coop)
            return coop
          })
        )
      )
    )
  }
}
