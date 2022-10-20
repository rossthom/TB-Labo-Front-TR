import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, mergeMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CooperativeDtoNew, CooperativeDtoUpd, CooperativeView } from '../models/coop.model';
import { Category } from '../models/types.model';
import { GpsPosition } from 'src/app/openstreetmap/shared/models/types.model';
import { OsmService } from 'src/app/openstreetmap/shared/services/osm.service';

@Injectable({
  providedIn: 'root'
})
export class CoopService {
  private _apiUrl: string = environment.dataUrl


  constructor(
    private httpC : HttpClient,
    private osmService: OsmService
  ) { }


  getCoopTypes(): Observable<Category[]>{
    return this.httpC.get<Category[]>(this._apiUrl+"coop_types")
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
  }

  updateCoop(coop: CooperativeDtoUpd){
    return this.osmService.getAddressGpsLongLat(coop.address)
      .pipe(
        mergeMap(res => {
          return this.httpC.patch(
            this._apiUrl + "cooperatives/" + coop.id,
            { ...coop, gps: <GpsPosition>{lon: parseFloat(res[0].lon), lat: parseFloat(res[0].lat)}}
          )
        })
      )
  }

  insertCoop(coop: CooperativeDtoNew){
    return this.osmService.getAddressGpsLongLat(coop.address)
      .pipe(
        mergeMap(res => {
          return this.httpC.post(
            this._apiUrl + "cooperatives",
            { ...coop, gps: <GpsPosition>{lon: parseFloat(res[0].lon), lat: parseFloat(res[0].lat)}}
          )
        })
      )
  }
}
