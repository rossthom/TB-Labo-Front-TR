import { Injectable } from '@angular/core';
import { GpsPosition } from 'src/app/openstreetmap/shared/models/types.model';
import { environment } from 'src/environments/environment';
import { MarkerIcon } from '../models/marker-icon.model';

@Injectable({
  providedIn: 'root'
})
export class Co2Service {
  private _kmPerLatDegreeEquator = 111

  private _eventGreenIconUrl = 'assets/app/images/colored-marker-event.png';
  private _eventGreenIconRetinaUrl = 'assets/app/images/colored-marker-event-2x.png';
  private _eventOrangeIconUrl = 'assets/app/images/colored-marker-event-medium.png';
  private _eventOrangeIconRetinaUrl = 'assets/app/images/colored-marker-event-medium-2x.png';
  private _eventRedIconUrl = 'assets/app/images/colored-marker-event-far.png';
  private _eventRedIconRetinaUrl = 'assets/app/images/colored-marker-event-far-2x.png';

  constructor() { }


  calculateRoughDistanceInMeters(start: GpsPosition, end:GpsPosition): number {
    let averageLat = (start.lat + end.lat)/2
    let kmPerLatDegreeAtAvgLat = this._kmPerLatDegreeEquator * Math.cos(averageLat)
    let distInDegrees = Math.sqrt(
      Math.pow(start.lon - end.lon, 2)
      + Math.pow(start.lat - end.lat, 2)
    )

    return (distInDegrees * kmPerLatDegreeAtAvgLat * 1000)//.toFixed(2)
  }

  getEventMarkerIcon(distance: number): MarkerIcon {
    if (distance > environment.redDistance) {
      return <MarkerIcon>{
        retina: this._eventRedIconRetinaUrl,
        regular: this._eventRedIconUrl
      }
    }
    else if (distance > environment.orangeDistance) {
      return <MarkerIcon>{
        retina: this._eventOrangeIconRetinaUrl,
        regular: this._eventOrangeIconUrl
      }
    }
    else {
      return <MarkerIcon>{
        retina: this._eventGreenIconRetinaUrl,
        regular: this._eventGreenIconUrl
      }
    }
  }

  getMarkSign(distance: number): string {
    if (distance > environment.redDistance) {
      return "🔴"
    }
    else if (distance > environment.orangeDistance) {
      return "🟠"
    }
    else {
      return "🟢"
    }
  }

  /**
   * Calculates how much CO2 is emitted for the travel, depending on the car's performences
   * @param {number} distanceInM - distance to travel in meters.
   * @param {number} conso - how much liters of gas the car uses for 100 km.
   * @param {number} emission - the CO2 emissions of the car per liter consumed.
   * @returns {number} grams of CO2 emitted for the distance travelled
   */
   calculateCO2Emissions(distanceInM: number, conso: number, emission: number){
    let nbKm = distanceInM/1000
    let emitPerKm = conso / 100 * emission

    return emitPerKm * nbKm * 2     // = total emissions allez-retour
  }
}
