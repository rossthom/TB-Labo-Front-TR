import { Component, Input, AfterViewInit  } from '@angular/core';
import * as L from 'leaflet';
import { GpsPosition } from 'src/app/openstreetmap/shared/models/types.model';


// Init Markers Icons
const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;


@Component({
  selector: 'app-event-map',
  templateUrl: './event-map.component.html',
  styleUrls: ['./event-map.component.scss']
})
export class EventMapComponent implements AfterViewInit  {
  /* 🧠 Reminder
    lat (North): 50.708632 
    lon (East) : 5.6750872
   */
  private map: any;
  private _defaultZoom: number = 13

  @Input()
  eventGpsPos!: GpsPosition
  
  @Input()
  userGpsPos!: GpsPosition
  

  constructor() { }

  ngAfterViewInit(): void {
    this._initMap()
  }

  private _initMap(): void {
    // Init Map
    this.map = L.map('map', {
      center: [ 
        (this.eventGpsPos.lat + this.userGpsPos.lat)/2, 
        (this.eventGpsPos.lon + this.userGpsPos.lon)/2,
      ],
      zoom: this._defaultZoom
    });

    // Add tiles
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 8,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);

    // Add Markers for User and Event GPS positions
    const eventMarker = L.marker([this.eventGpsPos.lat, this.eventGpsPos.lon]);
    eventMarker.addTo(this.map);
    
    const userMarker = L.marker([this.userGpsPos.lat, this.userGpsPos.lon]);
    userMarker.addTo(this.map);
  }
}
